"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import {
  ExperienceIntro,
  OurWorks,
} from "@/assets/content/Experience/Experience";
import WorksGrid from "@/components/work/WorksGrid";
import { Reveal, Counter } from "@/components/motion";
import { PageHero, SectionHeading } from "@/components/ui";

const HIGHLIGHTS = [
  { value: OurWorks.projects.length, suffix: "+", label: "Projects delivered" },
  { value: 2, suffix: "", label: "Feature films" },
  { value: 20, suffix: "+", label: "Creatives on set" },
];

const MainExperience: React.FC = () => {
  // The reel loads as a poster frame first — an autoplaying iframe on every
  // visit is both heavy and rude.
  const [reelPlaying, setReelPlaying] = useState(false);

  return (
    <>
      <PageHero
        eyebrow={ExperienceIntro.eyebrow}
        title="Four years of telling stories."
        highlight={["stories."]}
        subtitle={ExperienceIntro.paragraphs[0]}
      />

      {/* Showreel */}
      <section
        id="reel"
        className="relative scroll-mt-28 border-b border-cream/5 bg-ink-900 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            {/* Copy */}
            <div>
              <Reveal>
                <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-gold-500 sm:text-sm">
                  <span className="h-px w-8 bg-gold-500/60" aria-hidden="true" />
                  Showreel
                </span>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="display mt-5 text-3xl text-cream sm:text-4xl 3xl:text-5xl">
                  {ExperienceIntro.videoTitle}
                </h2>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-6 space-y-4">
                  {ExperienceIntro.paragraphs.map((para, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-mist sm:text-lg"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </Reveal>

              {/* Highlights */}
              <Reveal delay={0.2}>
                <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-cream/10 pt-8">
                  {HIGHLIGHTS.map((item) => (
                    <div key={item.label}>
                      <dt className="sr-only">{item.label}</dt>
                      <dd>
                        <span className="display block text-3xl text-gradient-gold sm:text-4xl">
                          <Counter to={item.value} suffix={item.suffix} />
                        </span>
                        <span className="mt-1.5 block text-[0.65rem] uppercase tracking-widest text-faint sm:text-xs">
                          {item.label}
                        </span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Player */}
            <Reveal direction="left" delay={0.1}>
              <div className="relative aspect-video overflow-hidden rounded-2xl border border-cream/10 bg-ink-950">
                <AnimatePresence mode="wait">
                  {reelPlaying ? (
                    <motion.iframe
                      key="player"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      title={ExperienceIntro.videoTitle}
                      src={`https://www.youtube.com/embed/${ExperienceIntro.videoId}?autoplay=1&rel=0`}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <motion.button
                      key="poster"
                      type="button"
                      exit={{ opacity: 0 }}
                      onClick={() => setReelPlaying(true)}
                      aria-label="Play the iBEST Studios showreel"
                      className="group absolute inset-0 h-full w-full"
                    >
                      {/* YouTube's own thumbnail — no extra asset to ship. */}
                      <Image
                        src={`https://img.youtube.com/vi/${ExperienceIntro.videoId}/maxresdefault.jpg`}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                      />
                      <span className="absolute inset-0 bg-ink-950/50 transition-colors duration-500 group-hover:bg-ink-950/35" />

                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold-500 text-ink-950 transition-transform duration-500 group-hover:scale-110">
                          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-gold-500" />
                          <Play className="relative ml-1 h-7 w-7 fill-current" />
                        </span>
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Works */}
      <section className="relative bg-ink-950 py-24 sm:py-32">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="Portfolio"
            title={OurWorks.title}
            highlight={["Works"]}
            subtitle="Filter by discipline. Every card opens the finished piece."
          />

          <WorksGrid filterable />
        </div>
      </section>
    </>
  );
};

export default MainExperience;
