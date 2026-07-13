"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { StudiosLogo } from "@/assets";
import { Button } from "@/components/ui";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/service" },
  { label: "Work", href: "/experience" },
  { label: "Team", href: "/team" },
  { label: "Careers", href: "/job" },
  { label: "Download", href: "/download" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The overlay covers the page, so the page behind it must not scroll.
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // A route change while the menu is open should close it.
  useEffect(() => setIsOpen(false), [pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || isOpen
            ? "border-b border-cream/10 bg-ink-950/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
          <Link
            href="/"
            className="group relative z-10 flex items-center gap-3"
            aria-label="iBEST Studios — home"
          >
            <Image
              src={StudiosLogo}
              alt=""
              width={48}
              height={48}
              priority
              className="h-10 w-10 transition-transform duration-500 group-hover:rotate-10 sm:h-12 sm:w-12"
            />
            <span className="font-raleway text-base font-extrabold uppercase tracking-[0.15em] text-cream sm:text-lg">
              iBEST<span className="text-gold-500">.</span>
            </span>
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                    isActive(link.href)
                      ? "text-cream"
                      : "text-mist hover:text-cream"
                  }`}
                >
                  {isActive(link.href) && (
                    // layoutId lets the pill glide between links on navigation
                    // instead of popping out of one and into the next.
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-cream/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <Button href="/contact" size="sm" magnetic>
                Start a project
              </Button>
            </div>

            {/* Burger */}
            <button
              type="button"
              onClick={() => setIsOpen((v) => !v)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-cream/15 text-cream transition-colors hover:border-gold-500/60 hover:text-gold-500 lg:hidden"
            >
              <span className="relative block h-3.5 w-5">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-current"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-3 h-0.5 w-5 rounded-full bg-current"
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center overflow-y-auto bg-ink-950 px-6 py-24 lg:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 top-1/4 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
            />

            <ul className="relative space-y-1">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.06,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="group flex items-baseline gap-4 py-1.5"
                  >
                    <span className="w-6 font-mono text-xs text-faint">
                      0{i + 1}
                    </span>
                    <span
                      className={`display text-4xl transition-colors duration-300 xs:text-5xl ${
                        isActive(link.href)
                          ? "text-gold-500"
                          : "text-cream group-hover:text-gold-500"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="relative mt-10 border-t border-cream/10 pt-8"
            >
              <Button href="/contact" size="lg" className="w-full">
                Start a project
              </Button>
              <a
                href="mailto:infoibeststudios@gmail.com"
                className="mt-6 block break-all text-sm text-mist transition-colors hover:text-gold-500"
              >
                infoibeststudios@gmail.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
