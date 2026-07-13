"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Play } from "lucide-react";
import { OurWorks } from "@/assets/content/Experience/Experience";

type Project = (typeof OurWorks.projects)[number];

interface WorksGridProps {
  /** Cap the number of projects shown. Omit to show all of them. */
  limit?: number;
  /** Render the category filter bar. */
  filterable?: boolean;
}

const ALL = "All";

export default function WorksGrid({ limit, filterable = false }: WorksGridProps) {
  const [active, setActive] = useState(ALL);

  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(OurWorks.projects.map((p) => p.category)))],
    [],
  );

  const projects = useMemo(() => {
    const filtered =
      active === ALL
        ? OurWorks.projects
        : OurWorks.projects.filter((p) => p.category === active);
    return limit ? filtered.slice(0, limit) : filtered;
  }, [active, limit]);

  return (
    <>
      {filterable && (
        <div className="mt-12 flex flex-wrap justify-center gap-2">
          {categories.map((category) => {
            const isActive = category === active;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 sm:text-sm ${
                  isActive ? "text-ink-950" : "text-mist hover:text-cream"
                }`}
              >
                {isActive && (
                  // Shared layoutId => the gold pill slides from the old filter
                  // to the new one rather than blinking between them.
                  <motion.span
                    layoutId="works-filter-pill"
                    className="absolute inset-0 rounded-full bg-gold-500"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* layout on the grid lets surviving cards glide into their new slots
          when the filter changes; popLayout stops exiting cards from holding
          their space while the rest reflow. */}
      <motion.div
        layout
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {projects.map((project) => (
            <ProjectCard key={project.title + project.category} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {projects.length === 0 && (
        <p className="mt-16 text-center text-mist">
          No projects in this category yet.
        </p>
      )}
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.a
      layout
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="group relative block overflow-hidden rounded-2xl border border-cream/10 bg-ink-850 transition-colors duration-500 hover:border-gold-500/40"
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
        />

        {/* Scrim deepens on hover so the play affordance reads clearly. */}
        <div className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full border border-gold-500/60 bg-ink-950/60 text-gold-500 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:scale-100 group-hover:opacity-100">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </span>

        <span className="absolute left-4 top-4 rounded-full border border-cream/15 bg-ink-950/70 px-3 py-1 text-[0.65rem] uppercase tracking-widest text-gold-500 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3 p-5">
        <h3 className="font-raleway text-base font-bold text-cream transition-colors duration-300 group-hover:text-gold-500 sm:text-lg">
          {project.title}
        </h3>
        <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-500" />
      </div>
    </motion.a>
  );
}
