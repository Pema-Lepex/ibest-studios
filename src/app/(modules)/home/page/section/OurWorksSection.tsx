"use client";

import { ArrowUpRight } from "lucide-react";
import WorksGrid from "@/components/work/WorksGrid";
import { SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/motion";

/** Home-page teaser: the six most recent projects, no filter bar. */
export default function OurWorksSection() {
  return (
    <section className="relative border-t border-cream/5 bg-ink-950 py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Selected work"
          title="Stories we have told"
          highlight={["told"]}
          subtitle="Feature films, folktales, music videos and campaigns — made in Bhutan, for audiences at home and beyond."
        />

        <WorksGrid limit={6} />

        <Reveal delay={0.1}>
          <div className="mt-14 flex justify-center">
            <Button
              href="/experience"
              size="lg"
              magnetic
              icon={<ArrowUpRight className="h-5 w-5" />}
            >
              See all our work
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
