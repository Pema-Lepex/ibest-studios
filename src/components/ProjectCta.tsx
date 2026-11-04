"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";
import { Container, SplitText, h2Class } from "./motion";

export default function ProjectCta() {
  return (
    <section className="relative overflow-hidden bg-red py-16 text-white sm:py-20">
      <motion.img
        src="/img/emblem.png"
        alt=""
        className="pointer-events-none absolute -right-8 -top-16 h-[160%] w-auto opacity-10"
        initial={{ rotate: -12 }}
        whileInView={{ rotate: 0 }}
        transition={{ duration: 1.4 }}
      />
      <Container className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-white/80">Start a project</p>
          <h2 className={h2Class}>
            <SplitText text="Have a story" className="block" />
            <SplitText text="worth telling?" className="block text-sun" delay={0.1} />
          </h2>
          <p className="mt-4 max-w-lg text-white/85">
            Films, series, campaigns, music videos or a single illustration — tell us what you have in mind and we&apos;ll plan it with you.
          </p>
        </div>
        <a
          href={`mailto:${site.email}?subject=New%20project%20%E2%80%94%20iBEST%20Studios`}
          className="group flex w-fit max-w-full items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 font-semibold text-navy shadow-xl shadow-black/20 transition hover:-translate-y-0.5"
        >
          <span className="truncate">Email {site.email}</span>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-navy text-sun transition group-hover:rotate-45">↗</span>
        </a>
      </Container>
    </section>
  );
}
