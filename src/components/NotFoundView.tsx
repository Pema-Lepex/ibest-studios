"use client";

import { motion } from "motion/react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { educare, site } from "@/data/site";

const LostScene = dynamic(() => import("./three/LostScene"), { ssr: false });

const STARS = Array.from({ length: 36 }, (_, i) => ({
  left: `${(i * 41.3) % 100}%`,
  top: `${(i * 27.7) % 85}%`,
  size: 1 + (i % 3),
  delay: `${(i % 6) * 0.5}s`,
}));

const LINKS = [
  { href: "/#work", label: "Our work" },
  { href: "/about", label: "Our story" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function NotFoundView() {
  return (
    <main className="relative flex min-h-[100svh] flex-col overflow-hidden bg-gradient-to-b from-abyss via-deep to-navy">
      <div className="pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span key={i} className="star" style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }} />
        ))}
        <div className="absolute right-[10%] top-[12%] size-48 rounded-full bg-sun/20 blur-3xl sm:size-72" />
        <div className="cloud-pattern absolute inset-0" />
      </div>

      <header className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" className="flex items-center gap-2.5" aria-label="iBEST Studios home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/logo-original.webp" alt="" width={512} height={512} className="h-12 w-12 lg:h-16 lg:w-16" />
        </Link>
        <a
          href={`mailto:${site.email}`}
          className="hidden rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ember sm:block"
        >
          Let&apos;s talk
        </a>
      </header>

      <div className="relative mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 items-center gap-4 px-5 pb-16 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
          className="relative h-[38svh] min-h-[240px] lg:order-2 lg:h-[64vh]"
        >
          <LostScene />
        </motion.div>

        <div className="lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, ease }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-cream/15 bg-cream/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.25em] text-cream/75"
          >
            <span className="size-2 animate-blink rounded-full bg-red" /> Error 404 · Page not found
          </motion.p>

          <h1 className="font-display font-extrabold leading-[0.9] tracking-tight">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease }}
              className="flex items-baseline gap-[0.04em] text-[clamp(5rem,22vw,11rem)] text-sun lg:text-[clamp(7rem,13vw,12rem)]"
              aria-label="404"
            >
              {["4", "0", "4"].map((d, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  className="inline-block"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2.4, delay: i * 0.25, ease: "easeInOut" }}
                >
                  {d}
                </motion.span>
              ))}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8, ease }}
              className="mt-2 block text-[clamp(2rem,6vw,3.5rem)] text-cream"
            >
              This scene got cut.
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease }}
            className="mt-5 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg"
          >
            Even Druk got lost looking for it. The page you&apos;re after has moved, been renamed, or never made it out of the edit
            room.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link
              href="/"
              className="flex items-center gap-2 rounded-full bg-red px-6 py-3 font-semibold text-white shadow-xl shadow-red/30 transition hover:-translate-y-0.5 hover:bg-ember"
            >
              ← Back to home
            </Link>
            <a
              href={educare.url}
              className="rounded-full border border-cream/30 px-6 py-3 font-semibold transition hover:border-orange hover:text-orange"
            >
              Visit Educare Skill ↗
            </a>
          </motion.div>

          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            className="mt-10 border-t border-cream/10 pt-6"
            aria-label="Helpful links"
          >
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-cream/50">Or jump to</p>
            <div className="flex flex-wrap gap-2">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="rounded-full bg-cream/10 px-4 py-2 text-sm font-medium text-cream/90 transition hover:bg-sun hover:text-navy">
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        </div>
      </div>

      <svg className="relative -mb-px h-12 w-full text-cream sm:h-16" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path
          fill="currentColor"
          d="M0 120V70c40-20 90-24 130-6 30-30 90-34 120-4 40-26 100-22 130 8 40-34 110-30 140 6 30-22 80-24 110 0 40-30 110-28 140 8 30-24 90-26 120 2 40-32 100-30 140 4 30-20 80-22 110 0 50-30 110-24 140 10 30-14 50-14 70-8H1440V120z"
        />
      </svg>
      <p className="bg-cream pb-4 text-center font-mono text-[10px] uppercase tracking-widest text-navy/60">
        © {new Date().getFullYear()} {site.name} · {site.location}
      </p>
    </main>
  );
}
