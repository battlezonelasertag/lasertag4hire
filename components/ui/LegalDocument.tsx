/* Long-form legal page body: sticky section index on desktop, readable article column. */

export type LegalBlock = { heading?: string; paragraphs?: React.ReactNode[]; bullets?: React.ReactNode[] };
export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export default function LegalDocument({ sections, version }: { sections: LegalSection[]; version: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-10 lg:gap-16">
      <nav aria-label="Sections" className="hidden lg:block">
        <div className="sticky" style={{ top: "calc(var(--nav-h, 72px) + 32px)" }}>
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--muted)] mb-4" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Sections
          </p>
          <ol className="flex flex-col gap-2.5">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[14px] text-[var(--muted)] hover:text-[var(--ink)] transition-colors duration-150"
                  style={{ fontFamily: "var(--font-dm-sans)", textDecoration: "none" }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>
      </nav>

      <article className="max-w-[68ch]" style={{ fontFamily: "var(--font-dm-sans)" }}>
        <p className="text-[14px] text-[var(--muted)] mb-10">{version}</p>
        {sections.map((s) => (
          <section key={s.id} id={s.id} className="mb-12" style={{ scrollMarginTop: "calc(var(--nav-h, 72px) + 24px)" }}>
            <h2 className="section-heading text-[var(--ink)] mb-4" style={{ fontSize: "clamp(1.35rem, 2vw, 1.6rem)" }}>
              {s.title}
            </h2>
            {s.blocks.map((b, i) => (
              <div key={i} className={i > 0 ? "mt-6" : ""}>
                {b.heading && <h3 className="card-heading text-[var(--ink)] text-lg mb-2">{b.heading}</h3>}
                {b.paragraphs?.map((p, j) => (
                  <p key={j} className="text-[var(--ink)]/80 text-base leading-relaxed mb-4">{p}</p>
                ))}
                {b.bullets && (
                  <ul className="flex flex-col gap-3 mb-4">
                    {b.bullets.map((item, j) => (
                      <li key={j} className="flex gap-3 text-base leading-relaxed text-[var(--ink)]/80">
                        <span aria-hidden="true" className="mt-[0.6em] w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--crimson)" }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}
