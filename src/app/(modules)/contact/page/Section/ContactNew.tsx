"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ContactContent } from "@/assets/content/Contact/Contact";
import { Reveal, Stagger, StaggerItem, Parallax } from "@/components/motion";
import { Button } from "@/components/ui";

const { eyebrow, email, blocks, image, imageAlt, map } = ContactContent;

const ContactNew: React.FC = () => {
  return (
    <>
      {/* Details + office photo */}
      <section className="grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Details card */}
        <Reveal>
          <div className="flex h-full flex-col rounded-2xl border border-cream/10 bg-ink-850 p-7 sm:p-9 lg:p-10">
            <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500">
              <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
              {eyebrow}
            </span>

            <Stagger className="mt-9 flex-1 space-y-7" stagger={0.08}>
              {blocks.map((block) => {
                const Icon = block.icon;

                return (
                  <StaggerItem key={block.title} className="group flex gap-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-500/30 text-gold-500 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div className="min-w-0">
                      <h3 className="font-raleway text-base font-bold text-cream sm:text-lg">
                        {block.title}
                      </h3>

                      <ul className="mt-2 space-y-1">
                        {block.lines.map((line) => (
                          <li
                            key={line.text}
                            className={`text-sm sm:text-[0.95rem] ${
                              // `muted` is for the asides — "Closed", "We'll
                              // respond soon" — which shouldn't read as data.
                              "muted" in line && line.muted
                                ? "text-faint"
                                : "text-mist"
                            }`}
                          >
                            {"label" in line && line.label && (
                              <span className="mr-1.5 text-faint">
                                {line.label}:
                              </span>
                            )}

                            {"href" in line && line.href ? (
                              <a
                                href={line.href}
                                className="link-underline break-all font-medium text-cream transition-colors hover:text-gold-500"
                              >
                                {line.text}
                              </a>
                            ) : (
                              line.text
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>

            <div className="mt-10 border-t border-cream/10 pt-8">
              <Button
                href={`mailto:${email}`}
                size="lg"
                magnetic
                icon={<ArrowUpRight className="h-5 w-5" />}
              >
                Start a project
              </Button>
            </div>
          </div>
        </Reveal>

        {/* Office photo. min-h keeps it from collapsing on mobile, where it has
            no tall sibling to stretch against. */}
        <Reveal direction="left" delay={0.1}>
          <div className="group relative h-full min-h-80 overflow-hidden rounded-2xl border border-cream/10 sm:min-h-96">
            <Parallax distance={24} className="absolute inset-0">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="scale-105 object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-110"
              />
            </Parallax>

            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="text-[0.65rem] uppercase tracking-widest text-gold-500">
                The studio
              </p>
              <p className="mt-1.5 font-raleway text-lg font-bold text-cream sm:text-xl">
                Changzamtog, Thimphu
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Map */}
      <Reveal className="mt-6 lg:mt-8">
        <div className="relative overflow-hidden rounded-2xl border border-cream/10">
          <iframe
            src={map}
            title="iBEST Studios location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="map-dark block h-80 w-full border-0 sm:h-96 lg:h-112"
          />
        </div>
      </Reveal>
    </>
  );
};

export default ContactNew;
