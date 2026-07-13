"use client";

import Image from "next/image";
import { JobBanner } from "@/assets";
import { JobIntro, WeArelookingFor, WhatWeOffer } from "@/assets/content/Career/Skills";
import { RenderFormattedText } from "@/app/utils/helpers/RenderText";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ui";
import { Sparkles } from "lucide-react";

const JoinOurTeamSection = () => {
  return (
    <>
      {/* Banner */}
      <section className="relative h-[45svh] min-h-80 w-full overflow-hidden grain sm:h-[60svh]">
        <Image
          src={JobBanner}
          alt=""
          fill
          priority
          sizes="100vw"
          className="animate-ken-burns object-cover"
        />
        <div className="absolute inset-0 bg-ink-950/65" />
        <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/40 to-ink-950/70" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-[1600px] px-5 pb-12 sm:px-8 sm:pb-16 lg:px-12">
            <Reveal>
              <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500 sm:text-sm">
                <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
                Careers
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="display mt-5 max-w-3xl text-[clamp(2.25rem,6vw,5rem)] text-cream">
                An opportunity of{" "}
                <span className="text-gradient-gold">a lifetime.</span>
              </h1>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <Reveal>
              <h2 className="display sticky top-32 text-3xl text-cream sm:text-4xl">
                If you are passionate about giving wings to your{" "}
                <span className="text-gradient-gold">imagination</span> —
              </h2>
            </Reveal>

            <div className="space-y-5">
              {JobIntro.paragraphs.map((para, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <p className="text-base leading-relaxed text-mist sm:text-lg">
                    {para}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open roles */}
      <section className="border-y border-cream/5 bg-ink-900 py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Open roles"
            title={WeArelookingFor.title}
            highlight={["Talent"]}
            subtitle={WeArelookingFor.subTitle}
            align="left"
          />

          <Stagger className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 sm:grid-cols-2">
            {WeArelookingFor.skills.map((skill, i) => (
              <StaggerItem
                key={skill}
                className="group flex items-center justify-between gap-4 bg-ink-900 p-6 transition-colors duration-500 hover:bg-ink-850 sm:p-7"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-xs text-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-raleway text-base font-semibold text-cream transition-colors duration-300 group-hover:text-gold-500 sm:text-lg">
                    {skill}
                  </h3>
                </div>
                <span className="shrink-0 rounded-full border border-cream/10 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-faint transition-colors duration-300 group-hover:border-gold-500/40 group-hover:text-gold-500">
                  Open
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Why iBEST"
            title={WhatWeOffer.title}
            highlight={["Offer"]}
            align="left"
          />

          <Stagger className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {WhatWeOffer.offers.map((offer, i) => (
              <StaggerItem
                key={i}
                className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-ink-900 p-7 transition-colors duration-500 hover:border-gold-500/40"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/30 text-gold-500 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <Sparkles className="h-5 w-5" />
                </span>

                {/* The offers contain **bold** spans, so they render through the
                    same formatter the story section uses. */}
                <p className="mt-6 text-sm leading-relaxed text-mist [&_strong]:font-semibold [&_strong]:text-cream">
                  {RenderFormattedText(offer)}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
};

export default JoinOurTeamSection;
