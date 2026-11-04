"use client";

import Link from "next/link";
import { Container, SplitText } from "./motion";

// Compact navy header for inner pages, with a breadcrumb back to the home page.
export default function PageHeader({ eyebrow, title, accent, children }: { eyebrow: string; title: string; accent: string; children?: React.ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-abyss via-deep to-navy pb-16 pt-28 sm:pb-20 sm:pt-36">
      <div className="cloud-pattern pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute right-[6%] top-[20%] size-56 rounded-full bg-sun/15 blur-3xl" />
      <Container className="relative">
        <nav
          className="mb-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-cream/60"
          aria-label="Breadcrumb"
        >
          <Link href="/" className="hover:text-sun">
            Home
          </Link>
          <span>/</span>
          <span className="text-sun">{eyebrow}</span>
        </nav>
        <h1 className="font-display text-[clamp(2.75rem,9vw,6.5rem)] font-extrabold leading-[0.92] tracking-tight">
          <SplitText text={title} className="block" play />
          <SplitText text={accent} className="block text-sun" delay={0.12} play />
        </h1>
        {children && (
          <div
            style={{ animationDelay: "0.15s" }}
            className="rise mt-6 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg"
          >
            {children}
          </div>
        )}
      </Container>
    </section>
  );
}
