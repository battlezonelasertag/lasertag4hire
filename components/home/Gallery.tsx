"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
  { src: "/images/lt4h-popup-image.jpg",          aspect: "tall",   alt: "Girl smiling with laser tagger" },
  { src: "/images/why-choose-us-setup.jpg",        aspect: "wide",   alt: "Group of adults with inflatable bunkers" },
  { src: "/images/packages_bolter_no_scope.jpg",   aspect: "square", alt: "Girl holding blue Bolter tagger in bush" },
  { src: "/images/packages_predator.jpg",          aspect: "tall",   alt: "Man aiming Predator tagger around tree" },
  { src: "/images/inflatable-packages-image.jpg",  aspect: "square", alt: "Kid peeking around inflatable bunker" },
  { src: "/images/why-choose-us-teams.jpg",        aspect: "wide",   alt: "Laser taggers laid out on camo table" },
  { src: "/images/why-choose-us-support.jpg",      aspect: "square", alt: "LT4H staff member with tagger" },
  { src: "/images/DSC03423.jpg",                   aspect: "square", alt: "Young player aiming Bolter tagger" },
];

const ASPECT_CLASSES: Record<string, string> = {
  tall:   "row-span-2",
  wide:   "col-span-2",
  square: "",
};

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = gridRef.current?.querySelectorAll(".gallery-item");
    if (!items) return;
    items.forEach((item, i) => {
      gsap.from(item, {
        scale: 0.95,
        opacity: 0,
        duration: 0.7,
        delay: i * 0.06,
        ease: "power3.out",
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} className="section-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6" style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div className="mb-10">
          <h2
            className="section-heading text-[var(--ink)]"
            style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)" }}
          >
            From recent events
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          style={{ gridAutoRows: "200px" }}
        >
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.src}
              className={`gallery-item rounded-2xl overflow-hidden relative ${ASPECT_CLASSES[item.aspect]}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
