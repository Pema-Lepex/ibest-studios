"use client";

import { useState } from "react";
import { OurWorks } from "@/assets/content/Experience/Experience";

const PROJECTS_PER_PAGE = 10;

const OurWorksSection: React.FC = () => {
  const [page, setPage] = useState(1);
  const pageCount = Math.ceil(OurWorks.projects.length / PROJECTS_PER_PAGE);
  const visibleProjects = OurWorks.projects.slice(
    (page - 1) * PROJECTS_PER_PAGE,
    page * PROJECTS_PER_PAGE
  );

  return (
    <div className="mx-auto w-full max-w-5xl px-6 font-open-sans md:px-10 lg:max-w-6xl xl:max-w-7xl 3xl:max-w-[90rem]">
      {/* Our works */}
      <section className="py-12 md:py-16">
        <div className="mb-8 text-center">
          <h2 className="font-raleway text-xl uppercase tracking-wide text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
            Our Experience
          </h2>
          <span className="mx-auto mt-3 block h-1 w-12 bg-accent-blue sm:w-16" />
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4 xl:gap-8">
          {visibleProjects.map((project, i) => (
            <a
              key={i}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-2xl border border-customOrange-100 bg-white shadow-sm transition-transform hover:-translate-y-1"
            >
              <img
                src={project.image}
                alt={project.title}
                className="aspect-video w-full object-cover"
              />
              <div className="p-6 xl:p-7">
                <p className="mb-2 font-raleway text-sm font-semibold text-accent-blue lg:text-base">
                  {project.category}
                </p>
                <p className="font-semibold text-body-text lg:text-lg">{project.title}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Pagination */}
        {pageCount > 1 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-accent-blue disabled:opacity-40 lg:h-11 lg:w-11 lg:text-lg"
            >
              «
            </button>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md border text-sm font-medium lg:h-11 lg:w-11 lg:text-base ${
                  num === page
                    ? "border-accent-blue bg-accent-blue text-white"
                    : "border-gray-200 text-accent-blue"
                }`}
              >
                {num}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-gray-200 text-accent-blue disabled:opacity-40 lg:h-11 lg:w-11 lg:text-lg"
            >
              »
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default OurWorksSection;
