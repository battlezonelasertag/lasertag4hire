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

export default function Navbar({ onQuoteClick }: { onQuoteClick?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Floating island navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-40 flex justify-center pt-5 px-4 pointer-events-none"
      >
        <nav
          className="pointer-events-auto flex items-center gap-2 px-3 py-2 rounded-full transition-all duration-300"
          style={{
            background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.82)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            boxShadow: scrolled
              ? "0 0 0 1px rgba(0,0,0,0.08), 0 4px 24px rgba(0,0,0,0.1)"
              : "0 0 0 1px rgba(0,0,0,0.06), 0 2px 12px rgba(0,0,0,0.06)",
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 px-2 py-1 rounded-full hover:bg-black/5 transition-colors duration-200"
          >
            <LogoMark />
            <span
              className="text-[15px] font-bold tracking-tight hidden sm:block"
              style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
            >
              LT4H
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-5 bg-black/10 hidden md:block" />

          {/* Nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-full text-[14px] font-medium text-[#374151] hover:bg-black/6 hover:text-[var(--ink)] transition-all duration-200"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px h-5 bg-black/10 hidden md:block" />

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={onQuoteClick}
              className="px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all duration-200 hover:bg-black/6"
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--blue)" }}
            >
              Get a quote
            </button>
            <Link
              href="https://fareharbor.com/embeds/book/lasertag4hire/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange text-[14px] px-4 py-1.5"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Book now
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-black/6 transition-colors duration-200 ml-1"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-30 md:hidden"
            style={{
              background: "rgba(250,250,245,0.96)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-4xl font-bold tracking-tight py-3 hover:text-[var(--blue)] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-syne)", color: "var(--ink)" }}
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
                className="flex flex-col gap-3 mt-8 w-full max-w-xs"
              >
                <button
                  onClick={() => { setMenuOpen(false); onQuoteClick?.(); }}
                  className="btn-outline w-full py-3 text-base"
                >
                  Get a quote
                </button>
                <Link
                  href="https://fareharbor.com/embeds/book/lasertag4hire/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="btn-orange w-full py-3 text-base text-center"
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
      <path
        d="M7 14L11 10L15 14L19 9"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="18" r="2.5" fill="white" opacity="0.9" />
      <path
        d="M8 19h8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <motion.line
        x1="3" y1="6" x2="17" y2="6"
        stroke="var(--ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={open ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.line
        x1="3" y1="14" x2="17" y2="14"
        stroke="var(--ink)"
        strokeWidth="1.8"
        strokeLinecap="round"
        animate={open ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
        style={{ originX: "50%", originY: "50%" }}
        transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
      />
    </svg>
  );
}
