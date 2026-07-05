"use client";

import React, { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { GeoJsonObject, FeatureCollection, Feature, Geometry } from "geojson";

/* ── default view ────────────────────────────────────── */
const ZONE_CENTER: [number, number] = [-32.5, 151.5];
const ZONE_ZOOM = 6;

/* ── custom SVG pins ─────────────────────────────── */
function makePin(fill: string) {
  return L.divIcon({
    className: "",
    iconSize: [28, 40],
    iconAnchor: [14, 40],
    popupAnchor: [0, -42],
    html: `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
      <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 26 14 26S28 24.5 28 14C28 6.268 21.732 0 14 0z" fill="${fill}"/>
      <circle cx="14" cy="14" r="6" fill="white"/>
    </svg>`,
  });
}

const PIN_COVERED = makePin("#1a5fb4");
const PIN_QUOTE   = makePin("#f59e0b");

type ZoneFeature = Feature<Geometry, { postcode: string }>;

/* ── zoom tracker: syncs map zoom back to parent ─────── */
function ZoomTracker({
  onZoom,
  onReady,
}: {
  onZoom: (z: number) => void;
  onReady: (m: L.Map) => void;
}) {
  const map = useMap();
  useEffect(() => {
    onReady(map);
    onZoom(map.getZoom());
    const handler = () => onZoom(map.getZoom());
    map.on("zoomend", handler);
    return () => { map.off("zoomend", handler); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return null;
}

/* ── fit map to zone data on first load ──────────── */
function FitToZone({ zoneData }: { zoneData: FeatureCollection | null }) {
  const map = useMap();
  useEffect(() => {
    if (!zoneData) return;
    try {
      const layer = L.geoJSON(zoneData as GeoJsonObject);
      const bounds = layer.getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!zoneData]);
  return null;
}

/* ── fly-to controller ───────────────────────────── */
function FlyTo({
  coords,
  postcode,
  zoneData,
}: {
  coords: [number, number] | null;
  postcode: string;
  zoneData: FeatureCollection | null;
}) {
  const map = useMap();
  useEffect(() => {
    if (!coords) return;
    if (zoneData && postcode) {
      const feature = (zoneData.features as ZoneFeature[]).find(
        (f) => f.properties?.postcode === postcode
      );
      if (feature) {
        try {
          const layer = L.geoJSON(feature as GeoJsonObject);
          const bounds = layer.getBounds();
          if (bounds.isValid()) {
            map.flyToBounds(bounds, { padding: [40, 40], duration: 1.4, easeLinearity: 0.2 });
            return;
          }
        } catch { /* fall through */ }
      }
    }
    map.flyTo(coords, 13, { duration: 1.4, easeLinearity: 0.2 });
  }, [coords, postcode, zoneData, map]);
  return null;
}

/* ── zone polygon style ──────────────────────────── */
function zoneStyle(highlightPostcode: string) {
  return (feature?: Feature<Geometry, { postcode: string }>) => {
    const isHighlighted = feature?.properties?.postcode === highlightPostcode;
    return {
      color: "#1a5fb4",
      weight: isHighlighted ? 2 : 0.8,
      fillColor: "#1a5fb4",
      fillOpacity: isHighlighted ? 0.25 : 0.12,
      opacity: isHighlighted ? 1 : 0.5,
    };
  };
}

/* ── map inner ───────────────────────────────────── */
export interface ServiceAreaMapProps {
  pinCoords: [number, number] | null;
  pinType: "covered" | "quote" | null;
  pinPostcode: string;
}

export default function ServiceAreaMapInner({ pinCoords, pinType, pinPostcode }: ServiceAreaMapProps) {
  const [zoneData, setZoneData] = useState<FeatureCollection | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [zoom, setZoom] = useState(ZONE_ZOOM);

  useEffect(() => {
    fetch("/free-delivery-zones.json")
      .then((r) => r.json())
      .then(setZoneData)
      .catch(() => {});
  }, []);

  const geoJsonKey = useMemo(() => `zone-${pinPostcode}`, [pinPostcode]);
  const onReady = useCallback((m: L.Map) => { mapRef.current = m; }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "inherit" }}>
      <MapContainer
        center={ZONE_CENTER}
        zoom={ZONE_ZOOM}
        zoomControl={false}
        scrollWheelZoom={false}
        style={{ width: "100%", height: "100%", borderRadius: "inherit" }}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        {zoneData && (
          <>
            <FitToZone zoneData={zoneData} />
            <GeoJSON
              key={geoJsonKey}
              data={zoneData as GeoJsonObject}
              style={zoneStyle(pinPostcode) as L.StyleFunction}
            />
          </>
        )}

        <FlyTo coords={pinCoords} postcode={pinPostcode} zoneData={zoneData} />
        <ZoomTracker onZoom={setZoom} onReady={onReady} />

        {pinCoords && pinType && (
          <Marker
            position={pinCoords}
            icon={pinType === "covered" ? PIN_COVERED : PIN_QUOTE}
          />
        )}
      </MapContainer>

      {/* Zoom slider overlay */}
      <div
        ref={(el) => { if (el) L.DomEvent.disableClickPropagation(el); }}
        style={{
          position: "absolute",
          right: 12,
          bottom: 28,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          background: "white",
          borderRadius: 10,
          padding: "6px 5px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.13)",
          border: "1px solid rgba(0,0,0,0.08)",
          userSelect: "none",
        }}
      >
        <ZoomBtn label="+" onClick={() => mapRef.current?.zoomIn()} />
        <input
          type="range"
          min={4}
          max={15}
          step={1}
          value={Math.round(zoom)}
          onChange={(e) => mapRef.current?.setZoom(Number(e.target.value))}
          style={{
            writingMode: "vertical-lr" as React.CSSProperties["writingMode"],
            direction: "rtl",
            height: 80,
            width: 22,
            cursor: "pointer",
            accentColor: "var(--blue)",
            margin: "2px 0",
          }}
        />
        <ZoomBtn label="−" onClick={() => mapRef.current?.zoomOut()} />
      </div>
    </div>
  );
}

function ZoomBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 26, height: 26,
        background: "none", border: "none",
        cursor: "pointer",
        fontFamily: "var(--font-dm-sans)",
        fontSize: 18, fontWeight: 400,
        color: "var(--ink)",
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 6,
        lineHeight: 1, padding: 0,
        flexShrink: 0,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.07)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
    >
      {label}
    </button>
  );
}
