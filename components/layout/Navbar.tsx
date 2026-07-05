"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const NAV_LINKS = [
  { label: "Packages", href: "/packages" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const menuVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { y: 16, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  }),
  exit: { y: 8, opacity: 0, transition: { duration: 0.15 } },
};

export const NAV_HEIGHT = 68;

export default function Navbar({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 40,
          height: NAV_HEIGHT,
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: `1px solid ${scrolled ? "rgba(0,0,0,0.09)" : "rgba(0,0,0,0.05)"}`,
          boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
          transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        <div style={{
          height: "100%",
          padding: "0 clamp(24px, 6vw, 80px)",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}>
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0, marginRight: "auto" }}>
            <LogoMark />
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 700, fontSize: 16, color: "var(--ink)", letterSpacing: "-0.02em" }}>
              LT4H
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden md:contents">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:bg-black/6 hover:text-[var(--ink)]"
                style={{
                  fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 500,
                  color: "#374151", textDecoration: "none",
                  padding: "6px 14px", borderRadius: 100,
                  transition: "background 0.18s, color 0.18s",
                  whiteSpace: "nowrap",
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop divider + CTAs */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 8, marginLeft: 8, flexShrink: 0 }}>
            <div style={{ width: 1, height: 20, background: "rgba(0,0,0,0.10)", marginRight: 4 }} />
            <button
              onClick={onQuoteClick}
              className="hover:bg-black/6"
              style={{
                fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600,
                color: "var(--blue)", background: "transparent", border: "none",
                padding: "6px 14px", borderRadius: 100, cursor: "pointer",
                transition: "background 0.18s", whiteSpace: "nowrap",
              }}
            >
              Get a quote
            </button>
            <Link
              href="https://fareharbor.com/embeds/book/lasertag4hire/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-crimson"
              style={{ fontSize: 13, padding: "8px 18px" }}
            >
              Book now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden items-center justify-center"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              width: 36, height: 36, borderRadius: 8, marginLeft: 8,
              background: "transparent", border: "none", cursor: "pointer",
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: "fixed", inset: 0, zIndex: 30,
              background: "rgba(250,250,245,0.97)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
            className="md:hidden"
          >
            <div style={{
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              height: "100%", gap: 4, padding: "0 32px",
            }}>
              {NAV_LINKS.map((link, i) => (
                <motion.div key={link.href} custom={i} variants={itemVariants} initial="hidden" animate="visible" exit="exit">
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-syne)", fontWeight: 700,
                      fontSize: "clamp(32px,8vw,44px)", letterSpacing: "-0.025em",
                      color: "var(--ink)", textDecoration: "none",
                      padding: "10px 0",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                custom={NAV_LINKS.length}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 28, width: "100%", maxWidth: 320 }}
              >
                <button
                  onClick={() => { setMenuOpen(false); onQuoteClick?.(); }}
                  className="btn-outline"
                  style={{ width: "100%", padding: "14px", fontSize: 15, justifyContent: "center" }}
                >
                  Get a quote
                </button>
                <Link
                  href="https://fareharbor.com/embeds/book/lasertag4hire/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-crimson"
                  style={{ width: "100%", padding: "14px", fontSize: 15, justifyContent: "center", textAlign: "center" }}
                >
                  Book now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="28" height="28" rx="8" fill="var(--crimson)" />
      <path d="M7 14L11 10L15 14L19 9" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="18" r="2.5" fill="white" opacity="0.9" />
      <path d="M8 19h8" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <motion.line x1="3" y1="6" x2="17" y2="6" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} />
      <motion.line x1="3" y1="14" x2="17" y2="14" stroke="var(--ink)" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }} />
    </svg>
  );
}
