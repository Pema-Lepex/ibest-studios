"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { RenderFormattedText } from "@/app/utils/helpers/RenderText";
import { OurStoryContent } from "@/assets/content/home/HomeContent";
import { ServiceAnimation2DImage, ServiceVfxImage } from "@/assets";
import {
  Reveal,
  Counter,
  Parallax,
  Stagger,
  StaggerItem,
} from "@/components/motion";
import { Button } from "@/components/ui";

const STATS = [
  { value: 12, suffix: "+", label: "Productions delivered" },
  { value: 20, suffix: "", label: "Animators on the team" },
  { value: 2, suffix: "", label: "Feature films released" },
  { value: 4, suffix: "+", label: "Years of storytelling" },
];

const VALUES = ["Integrity", "Bold", "Empathy", "Social responsibility", "Trust"];

export default function OurStorySection() {
  return (
    <section
      id="story"
      className="relative overflow-hidden border-t border-cream/5 bg-ink-950 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-azure-500/5 blur-[120px]"
      />

      <div className="mx-auto grid max-w-[1600px] items-center gap-16 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-12">
        {/* Image collage */}
        <div className="relative order-2 lg:order-1">
          <Parallax distance={40} direction={-1}>
            <Reveal direction="right">
              <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl sm:aspect-3/4">
                <Image
                  src={ServiceAnimation2DImage}
                  alt="An animator at work in the iBEST studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink-950/70 to-transparent" />
              </div>
            </Reveal>
          </Parallax>

          {/* Overlapping second frame — hidden on the smallest screens, where it
              would crowd the primary image instead of layering over it. */}
          <Parallax
            distance={60}
            direction={1}
            className="absolute -bottom-10 -right-4 hidden w-2/5 sm:block"
          >
            <Reveal direction="up" delay={0.2}>
              <div className="relative aspect-square overflow-hidden rounded-2xl border-4 border-ink-950 shadow-2xl">
                <Image
                  src={ServiceVfxImage}
                  alt="A visual effects shot from a home production"
                  fill
                  sizes="20vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </Parallax>

          {/* Floating badge */}
          <Reveal delay={0.4}>
            <div className="absolute -left-2 top-6 animate-float rounded-2xl border border-gold-500/25 bg-ink-900/90 px-5 py-4 backdrop-blur-md sm:-left-6">
              <p className="display text-gradient-gold text-3xl">
                <Counter to={100} suffix="%" />
              </p>
              <p className="mt-1 text-[0.65rem] uppercase tracking-widest text-mist">
                Made in Bhutan
              </p>
            </div>
          </Reveal>
        </div>

        {/* Copy */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500 sm:text-sm">
              <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
              Our story
            </span>
          </Reveal>

          <Reveal delay={0.05}>
            <h2 className="display text-3xl text-cream xs:text-4xl sm:text-5xl 3xl:text-6xl">
              We give life to any story{" "}
              <span className="text-gradient-gold">our client needs.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            {/* RenderFormattedText turns the **bold** markers in the content file
                into <strong>; the arbitrary variant below styles that output. */}
            <div className="mt-8 space-y-5 whitespace-pre-line text-base leading-relaxed text-mist [&_strong]:font-semibold [&_strong]:text-cream sm:text-lg">
              {RenderFormattedText(OurStoryContent.content)}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-wrap gap-2">
              {VALUES.map((value) => (
                <span
                  key={value}
                  className="rounded-full border border-cream/10 bg-cream/5 px-3.5 py-1.5 text-xs text-mist transition-colors hover:border-gold-500/40 hover:text-gold-500"
                >
                  {value}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10">
              <Button
                href="/team"
                variant="outline"
                icon={<ArrowUpRight className="h-4 w-4" />}
              >
                Meet the team
              </Button>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Stats — the gap-px over a light background is what draws the hairline
          dividers between cells without a border on each one. */}
      <div className="mx-auto mt-28 max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Stagger className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-cream/10 bg-cream/10 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StaggerItem
              key={stat.label}
              className="group bg-ink-950 p-6 text-center transition-colors duration-500 hover:bg-ink-900 sm:p-8"
            >
              <p className="display text-4xl text-cream transition-colors duration-500 group-hover:text-gold-500 sm:text-5xl">
                <Counter to={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-2 text-[0.7rem] uppercase tracking-widest text-faint sm:text-xs">
                {stat.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
