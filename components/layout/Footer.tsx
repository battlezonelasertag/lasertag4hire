import Link from "next/link";

const QUICK_LINKS = [
  { label: "Packages", href: "/packages" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "FAQ", href: "/faq" },
  { label: "About us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const LEGAL_LINKS = [
  { label: "Hire agreement", href: "/hire-agreement" },
  { label: "Privacy policy", href: "/privacy" },
  { label: "Terms & conditions", href: "/terms" },
];

export default function Footer() {
  return (
    <footer style={{ fontFamily: "var(--font-dm-sans)", background: "transparent", padding: "0 clamp(12px,1.8vw,24px)" }}>
      <div
        className="text-white"
        style={{ background: "var(--ink)", borderRadius: "2rem 2rem 0 0", overflow: "hidden" }}
      >
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <FooterLogoMark />
              <span
                className="text-lg font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-syne)" }}
              >
                Laser Tag 4 Hire
              </span>
            </div>
            <p className="text-[var(--muted)] leading-relaxed max-w-xs text-sm mb-6">
              Laser tag equipment delivered to your door across NSW. Birthday parties, school events, corporate days and more. Operating since 2007.
            </p>
            <div className="flex flex-col gap-2 text-sm text-[var(--muted)]">
              <a
                href="tel:1300661565"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <PhoneIcon />
                1300 661 565
              </a>
              <a
                href="mailto:info@lasertag4hire.com.au"
                className="hover:text-white transition-colors duration-200 flex items-center gap-2"
              >
                <MailIcon />
                info@lasertag4hire.com.au
              </a>
              <span className="flex items-center gap-2">
                <LocationIcon />
                PO Box 417, Salamander Bay NSW 2317
              </span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-xs uppercase tracking-widest text-[var(--muted)] mb-4 font-semibold"
            >
              Quick links
            </h4>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--muted)] hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Book */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-4 font-semibold">
              Ready to play?
            </h4>
            <p className="text-sm text-[var(--muted)] mb-4 leading-relaxed">
              Book online in minutes or send us a quote request and we&apos;ll be in touch within 24 hours.
            </p>
            <Link
              href="https://fareharbor.com/embeds/book/lasertag4hire/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-crimson inline-flex text-sm"
            >
              Book now
              <span className="btn-icon-wrap ml-2">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted)]">
            © {new Date().getFullYear()} Laser Tag 4 Hire. All rights reserved. ABN available on request.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs text-[var(--muted)] hover:text-white transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
}

function FooterLogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <rect width="28" height="28" rx="8" fill="var(--crimson)" />
      <path
        d="M7 14L11 10L15 14L19 9"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="18" r="2.5" fill="white" opacity="0.9" />
      <path d="M8 19h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.68A2 2 0 012 .99h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}
