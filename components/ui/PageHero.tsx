/* Dark photo header used by sub-pages: title bottom-left over a faded background image. */
export default function PageHero({
  image,
  title,
  children,
}: {
  image: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="relative overflow-hidden flex items-end"
      style={{ background: "#09090B", minHeight: "clamp(340px, 50vw, 520px)", paddingTop: "calc(var(--nav-h-top, 116px) + 40px)" }}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", opacity: 0.35, zIndex: 0 }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0.4) 60%, rgba(9,9,11,0.2) 100%)", zIndex: 1 }} />
      <div className="max-w-7xl mx-auto px-6 pb-16 w-full" style={{ position: "relative", zIndex: 2 }}>
        <h1 className="display-heading text-white mb-4" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
          {title}
        </h1>
        {children && (
          <div className="text-white/70 leading-relaxed max-w-[60ch]" style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.0625rem" }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
