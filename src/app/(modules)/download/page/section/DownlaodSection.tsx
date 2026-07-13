"use client";

import Image from "next/image";
import { Check, Mail } from "lucide-react";
import { DownloadContent } from "@/assets/content/download/DownloadContent";
import {
  Reveal,
  Stagger,
  StaggerItem,
  Marquee,
} from "@/components/motion";
import { PageHero, SectionHeading, Button } from "@/components/ui";

const DownloadSection = () => {
  return (
    <>
      <PageHero
        eyebrow={DownloadContent.eyebrow}
        title={DownloadContent.title}
        highlight={DownloadContent.highlight}
        subtitle={DownloadContent.description}
      />

      {/* Screens — a two-row marquee running in opposite directions reads as a
          living wall of the product rather than a static screenshot dump. */}
      <section className="space-y-5 overflow-hidden border-b border-cream/5 bg-ink-900 py-16 sm:py-20">
        {[false, true].map((reverse, row) => (
          <Marquee key={row} speed={reverse ? 55 : 45} reverse={reverse}>
            {DownloadContent.screens
              // Split the set so the two rows never show the same screen twice.
              .filter((_, i) => (row === 0 ? i % 2 === 0 : i % 2 === 1))
              .map((screen, i) => (
                <span
                  key={i}
                  className="mx-2.5 block w-56 shrink-0 overflow-hidden rounded-xl border border-cream/10 sm:w-72"
                >
                  <Image
                    src={screen}
                    alt=""
                    className="h-auto w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </span>
              ))}
          </Marquee>
        ))}
      </section>

      {/* Features */}
      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <SectionHeading
            eyebrow="What's inside"
            title="Built for how children actually learn."
            highlight={["learn."]}
          />

          <Stagger className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DownloadContent.features.map((feature, i) => (
              <StaggerItem
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-cream/10 bg-ink-900 p-7 transition-colors duration-500 hover:border-gold-500/40"
              >
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 font-raleway text-lg font-bold text-cream transition-colors duration-300 group-hover:text-gold-500">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-mist">
                  {feature.description}
                </p>

                <span className="mt-6 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500/10 text-gold-500 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <Check className="h-4 w-4" />
                </span>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* CTA — no store links are published yet, so this points at the one
          channel that actually works instead of inventing a dead App Store URL. */}
      <section className="border-t border-cream/5 bg-ink-900 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <Reveal>
            <h2 className="display text-3xl text-cream sm:text-4xl">
              Want early access?
            </h2>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-mist">
              The app is rolling out now. Get in touch and we&apos;ll send you
              the download link as soon as it&apos;s live on your platform.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="mailto:infoibeststudios@gmail.com?subject=App%20download%20request"
                size="lg"
                magnetic
                icon={<Mail className="h-4 w-4" />}
              >
                Request the link
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact the studio
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
};

export default DownloadSection;
