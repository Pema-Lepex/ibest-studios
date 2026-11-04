"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { services } from "@/data/site";
import { Container, Eyebrow, SplitText, h2Class } from "./motion";

// Landing-page summary: every craft at a glance, each one a door into the services page.
export default function ServicesTeaser() {
  return (
    <section className="relative bg-cream py-20 text-navy sm:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <Eyebrow no="02" light>
              What we do
            </Eyebrow>
            <h2 className={h2Class}>
              <SplitText text="One studio." className="block" />
              <SplitText text="Every craft." className="block text-red" delay={0.1} />
            </h2>
          </div>
          <Link
            href="/services"
            className="group flex w-fit items-center gap-3 rounded-full bg-navy py-2 pl-6 pr-2 font-semibold text-cream transition hover:bg-deep"
          >
            Explore our services
            <span className="flex size-10 items-center justify-center rounded-full bg-sun text-navy transition group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-2.5 sm:mt-16 sm:gap-3 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.li
              key={s.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-5%" }}
              transition={{ delay: (i % 4) * 0.06, duration: 0.6 }}
              className={i === services.length - 1 ? "col-span-2" : ""}
            >
              <Link
                href={`/services#service-${s.key}`}
                className="group relative flex h-full min-h-[7rem] flex-col justify-between gap-3 overflow-hidden rounded-2xl border border-navy/10 bg-white p-4 transition duration-300 hover:-translate-y-1 hover:border-navy hover:bg-navy hover:text-cream sm:min-h-[8.5rem] sm:rounded-3xl sm:p-6"
              >
                <span className="flex items-center justify-between font-mono text-[11px] text-navy/45 transition group-hover:text-sun">
                  {String(i + 1).padStart(2, "0")}
                  <span className="text-lg transition group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </span>
                <span>
                  <span className="block font-display text-base font-extrabold leading-tight sm:text-2xl">{s.title}</span>
                  <span className="mt-1 hidden text-sm text-navy/60 transition group-hover:text-cream/70 sm:block">{s.tags.join(" · ")}</span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
