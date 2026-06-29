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

        </div>
    </nav>
  );
}