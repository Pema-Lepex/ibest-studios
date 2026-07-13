"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { TeamContent } from "@/assets/content/team/TeamContent";
import TeamMemberCard from "../component/TeamCard";
import { Stagger, StaggerItem, Marquee } from "@/components/motion";
import { PageHero } from "@/components/ui";

const TeamSection: React.FC = () => {
  return (
    <>
      <PageHero
        eyebrow={TeamContent.eyebrow}
        title={TeamContent.title}
        highlight={["people."]}
        subtitle={TeamContent.description}
      />

      {/* Disciplines strip — conveys the size of the studio without inventing
          headshots for people we don't have photos of. */}
      <div className="border-b border-cream/5 bg-ink-900 py-6">
        <Marquee speed={38}>
          {TeamContent.disciplines.map((discipline) => (
            <span
              key={discipline}
              className="flex items-center gap-6 whitespace-nowrap px-6 text-sm uppercase tracking-widest text-mist sm:text-base"
            >
              {discipline}
              <span className="text-gold-500">✦</span>
            </span>
          ))}
        </Marquee>
      </div>

      <section className="bg-ink-950 py-20 sm:py-28">
        <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
          <Stagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TeamContent.members.map((member) => (
              <StaggerItem key={member.name} className="h-full">
                <TeamMemberCard
                  name={member.name}
                  designation={member.role}
                  bio={member.bio}
                  image={member.image}
                />
              </StaggerItem>
            ))}

            {/* Recruit card — closes the grid and doubles as a careers hook. */}
            <StaggerItem className="h-full">
              <Link
                href="/job"
                className="group relative flex h-full min-h-80 flex-col justify-between overflow-hidden rounded-2xl border border-dashed border-cream/15 bg-ink-900 p-8 transition-colors duration-500 hover:border-gold-500/50"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/5 blur-3xl transition-opacity duration-500 group-hover:opacity-180"
                />

                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 text-gold-500 transition-colors duration-500 group-hover:bg-gold-500 group-hover:text-ink-950">
                  <ArrowUpRight className="h-5 w-5" />
                </span>

                <div className="relative mt-8">
                  <h3 className="display text-2xl text-cream sm:text-3xl">
                    Your name{" "}
                    <span className="text-gradient-gold">here.</span>
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-mist">
                    We&apos;re looking for creative mavericks who believe
                    creativity is unlimited. See what we&apos;re hiring for.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                    View open roles
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          </Stagger>
        </div>
      </section>
    </>
  );
};

export default TeamSection;
