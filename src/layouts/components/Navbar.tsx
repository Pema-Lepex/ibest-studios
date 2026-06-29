"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl  rounded-b-lg
        ${scrolled
          ? "bg-black/75 border-b border-white/[0.08] shadow-[0_4px_32px_rgba(0,0,0,0.25)]"
          : "bg-black/35 border-b border-transparent"
        }`}
    >
      <div className=" px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white font-bold text-xl tracking-tight no-underline"
        >
          <span className="inline-block w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500" />
          iBEST Studios
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-white/70
                  hover:text-white hover:bg-white/[0.08] transition-all duration-200 no-underline"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/signup"
            className="text-sm font-semibold text-white px-5 py-2.5 rounded-xl
              bg-gradient-to-r from-indigo-500 to-purple-500
              shadow-[0_0_20px_rgba(99,102,241,0.35)]
              hover:shadow-[0_0_28px_rgba(99,102,241,0.55)]
              hover:opacity-90 transition-all duration-200 no-underline"
          >
            Contact
          </Link>
        </div>

        {/* Hamburger (mobile) */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex items-center justify-center p-2 text-white
            rounded-lg hover:bg-white/10 transition-colors duration-200"
        >
          {menuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="7" x2="21" y2="7" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="17" x2="21" y2="17" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-5 pt-3 border-t border-white/[0.07]
          flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-3.5 py-2.5 rounded-lg text-[15px] font-medium
                text-white/80 hover:bg-white/[0.07] transition-colors duration-150 no-underline"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2.5 mt-2">
            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl
                bg-gradient-to-r from-indigo-500 to-purple-500
                text-sm font-semibold text-white no-underline"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}