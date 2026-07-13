"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ServiceContent } from "@/assets/content/service/ServiceContent";
import { Stagger, StaggerItem, Tilt } from "@/components/motion";
import { SectionHeading, Button } from "@/components/ui";

/**
 * The services grid. Shown on the home page as a teaser; the /service page
 * renders the same six disciplines in full detail below its own hero.
 */
export default function ServiceSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-cream/5 bg-ink-900 py-24 sm:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-ember-500/5 blur-[120px]"
      />

      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow={ServiceContent.eyebrow}
          title={ServiceContent.title}
          highlight={["do"]}
          subtitle={ServiceContent.description}
        />

        <Stagger
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {ServiceContent.sections.map((service) => {
            const Icon = service.icon;

            return (
              <StaggerItem key={service.id}>
                <Tilt max={6} className="h-full perspective-[1000px]">
                  <Link
                    href={`/service#${service.id}`}
                    className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-ink-850 transition-colors duration-500 hover:border-gold-500/40"
                  >
                    {/* Image */}
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-900 ease-out-expo group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-ink-850 via-ink-850/40 to-transparent" />

                      <span className="absolute right-4 top-4 font-mono text-xs text-cream/40">
                        {service.number}
                      </span>

                      <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/30 bg-ink-950/70 text-gold-500 backdrop-blur-sm transition-all duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>

                    {/* Copy */}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="font-raleway text-xl font-bold text-cream transition-colors duration-300 group-hover:text-gold-500">
                        {service.title}
                      </h3>
                      <p className="mt-1 text-xs uppercase tracking-widest text-faint">
                        {service.tagline}
                      </p>

                      <p className="mt-4 line-clamp-3 flex-1 text-sm leading-relaxed text-mist">
                        {service.description}
                      </p>

                      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                        Explore
                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>

        <div className="mt-14 flex justify-center">
          <Button
            href="/service"
            variant="outline"
            size="lg"
            icon={<ArrowUpRight className="h-4 w-4" />}
          >
            All services in detail
          </Button>
        </div>
      </div>
    </section>
  );
}
