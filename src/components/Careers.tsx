"use client";

import { motion } from "motion/react";
import { site } from "@/data/site";
import { Container, Reveal, SplitText, h2Class } from "./motion";

const NOTES = [
  "Open to Bhutanese and individuals residing in Bhutan.",
  "Send your CV and a sample of your work by email.",
  "Applications are accepted online only — no need to travel.",
  "Selected interns are offered a role after three months, based on performance.",
];

export default function Careers() {
  return (
    <section id="careers" className="relative overflow-hidden bg-red py-20 text-white sm:py-28">
      <motion.img
        src="/img/emblem.png"
        alt=""
        className="pointer-events-none absolute -right-10 -top-10 h-[120%] w-auto opacity-10"
        initial={{ rotate: -10 }}
        whileInView={{ rotate: 0 }}
        transition={{ duration: 1.5 }}
      />
      <Container className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-white/80">05 — Careers & internships</p>
          <h2 className={h2Class}>
            <SplitText text="Give wings to" className="block" />
            <SplitText text="your imagination." className="block text-sun" delay={0.1} />
          </h2>
          <Reveal i={1} className="mt-6 max-w-xl space-y-4 text-base leading-relaxed text-white/90 sm:text-lg">
            <p>
              Our people make the company. We&apos;re looking for creative mavericks and raw talent — animators, illustrators, designers,
              artists and more — with an &ldquo;I can do and will do&rdquo; attitude.
            </p>
            <p>Join us and learn directly from senior colleagues with a massive pool of expertise and experience.</p>
          </Reveal>
        </div>
        <Reveal i={2} className="rounded-[2rem] bg-white p-6 text-navy shadow-2xl shadow-black/20 sm:p-8">
          <h3 className="font-display text-2xl font-extrabold">How to apply</h3>
          <ul className="mt-5 space-y-3">
            {NOTES.map((n, i) => (
              <li key={n} className="flex gap-3 text-navy/80">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sun text-xs font-bold text-navy">{i + 1}</span>
                {n}
              </li>
            ))}
          </ul>
          <a
            href={`mailto:${site.email}?subject=Application%20%E2%80%94%20iBEST%20Studios`}
            className="mt-7 flex w-full flex-wrap items-center justify-between gap-2 rounded-2xl bg-navy px-5 py-4 font-semibold text-white transition hover:bg-deep"
          >
            <span className="break-all">{site.email}</span>
            <span aria-hidden>→</span>
          </a>
        </Reveal>
      </Container>
    </section>
  );
}
