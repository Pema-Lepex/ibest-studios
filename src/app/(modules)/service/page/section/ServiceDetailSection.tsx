"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { ServiceContent } from "@/assets/content/service/ServiceContent";
import { Reveal, Parallax } from "@/components/motion";
import { Button } from "@/components/ui";

const SECTIONS = ServiceContent.sections;

export default function ServiceDetailSection() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  // Highlight whichever discipline is crossing the middle band of the viewport,
  // so the sticky index always reflects what you're actually reading.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-ink-950 py-20 sm:py-28">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-16 xl:grid-cols-[280px_1fr]">
          {/* Sticky index — desktop only; on mobile you just scroll the blocks. */}
          <aside className="hidden lg:block">
            <nav
              aria-label="Services"
              className="sticky top-32 border-l border-cream/10"
            >
              {SECTIONS.map((service) => {
                const isActive = service.id === activeId;
                return (
                  <a
                    key={service.id}
                    href={`#${service.id}`}
                    className="group relative block py-3.5 pl-6"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="service-index-marker"
                        className="absolute -left-px top-0 h-full w-0.5 bg-gold-500"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="mb-1 block font-mono text-[0.65rem] text-faint">
                      {service.number}
                    </span>
                    <span
                      className={`block text-sm font-medium transition-colors duration-300 ${
                        isActive
                          ? "text-gold-500"
                          : "text-mist group-hover:text-cream"
                      }`}
                    >
                      {service.title}
                    </span>
                  </a>
                );
              })}
            </nav>
          </aside>

          {/* Detail blocks */}
          <div className="space-y-24 sm:space-y-32">
            {SECTIONS.map((service, i) => {
              const Icon = service.icon;
              // Alternate which column the image lands in, so six stacked blocks
              // don't read as one repeating stripe.
              const imageFirst = i % 2 === 1;

              return (
                <article
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-28 border-t border-cream/10 pt-12 first:border-t-0 first:pt-0"
                >
                  <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
                    {/* Image */}
                    <div className={imageFirst ? "lg:order-1" : "lg:order-2"}>
                      <Parallax distance={30}>
                        <Reveal direction={imageFirst ? "right" : "left"}>
                          <div className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-cream/10">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              sizes="(max-width: 1024px) 100vw, 45vw"
                              className="object-cover transition-transform duration-1200 ease-out-expo group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-transparent" />
                            <span className="absolute left-5 top-5 flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-ink-950/70 text-gold-500 backdrop-blur-sm">
                              <Icon className="h-5 w-5" />
                            </span>
                          </div>
                        </Reveal>
                      </Parallax>
                    </div>

                    {/* Copy */}
                    <div className={imageFirst ? "lg:order-2" : "lg:order-1"}>
                      <Reveal>
                        <span className="font-mono text-sm text-gold-500">
                          {service.number}
                        </span>
                      </Reveal>

                      <Reveal delay={0.05}>
                        <h2 className="display mt-3 text-3xl text-cream sm:text-4xl 3xl:text-5xl">
                          {service.title}
                        </h2>
                        <p className="mt-2 text-xs uppercase tracking-widest text-faint">
                          {service.tagline}
                        </p>
                      </Reveal>

                      <Reveal delay={0.12}>
                        <p className="mt-6 text-base leading-relaxed text-mist sm:text-lg">
                          {service.description}
                        </p>
                      </Reveal>

                      <Reveal delay={0.18}>
                        <ul className="mt-8 grid grid-cols-1 gap-3 xs:grid-cols-2">
                          {service.capabilities.map((capability) => (
                            <li
                              key={capability}
                              className="flex items-center gap-2.5 text-sm text-cream/85"
                            >
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-500/15 text-gold-500">
                                <Check className="h-3 w-3" />
                              </span>
                              {capability}
                            </li>
                          ))}
                        </ul>
                      </Reveal>

                      <Reveal delay={0.24}>
                        <div className="mt-9">
                          <Button href="/contact" variant="outline" size="sm">
                            Discuss a {service.title.toLowerCase()} project
                          </Button>
                        </div>
                      </Reveal>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
