"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";
import { RecentNewsContents } from "@/assets/content/home/HomeContent";
import { Stagger, StaggerItem } from "@/components/motion";
import { SectionHeading } from "@/components/ui";

type Article = (typeof RecentNewsContents.articles)[number];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function RecentNewsSection() {
  const [open, setOpen] = useState<Article | null>(null);

  // Escape closes the reader, and the page behind it must not scroll.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <section className="relative border-t border-cream/5 bg-ink-900 py-24 sm:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Newsroom"
          title="Recent news"
          highlight={["news"]}
          subtitle="Announcements, launches and the occasional milestone worth marking."
        />

        <Stagger className="mt-16 grid gap-6 md:grid-cols-3" stagger={0.1}>
          {RecentNewsContents.articles.map((article) => (
            <StaggerItem key={article.id} as="article" className="h-full">
              <button
                type="button"
                onClick={() => setOpen(article)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-cream/10 bg-ink-850 text-left transition-colors duration-500 hover:border-gold-500/40"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.img}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-107"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-ink-850 to-transparent opacity-60" />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <time
                    dateTime={article.date}
                    className="text-[0.7rem] uppercase tracking-widest text-gold-500"
                  >
                    {formatDate(article.date)}
                  </time>

                  <h3 className="mt-3 font-raleway text-lg font-bold text-cream transition-colors duration-300 group-hover:text-gold-500 sm:text-xl">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-mist">
                    {article.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-500">
                    Read more
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </button>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Reader */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-70 flex items-start justify-center overflow-y-auto bg-ink-950/85 p-4 backdrop-blur-md sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={open.title}
          >
            <motion.article
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              // Clicks inside the panel must not reach the backdrop's close handler.
              onClick={(e) => e.stopPropagation()}
              className="relative my-auto w-full max-w-3xl overflow-hidden rounded-2xl border border-cream/10 bg-ink-900"
            >
              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close article"
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cream/15 bg-ink-950/70 text-cream backdrop-blur-sm transition-colors hover:border-gold-500 hover:text-gold-500"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative aspect-video w-full">
                <Image
                  src={open.img}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-ink-900 via-ink-900/20 to-transparent" />
              </div>

              <div className="p-6 sm:p-10">
                <time
                  dateTime={open.date}
                  className="text-[0.7rem] uppercase tracking-widest text-gold-500"
                >
                  {formatDate(open.date)}
                </time>

                <h3 className="display mt-3 text-3xl text-cream sm:text-4xl">
                  {open.title}
                </h3>

                <p className="mt-6 text-base leading-relaxed text-cream/90">
                  {open.description}
                </p>

                <p className="mt-5 whitespace-pre-line text-sm leading-relaxed text-mist sm:text-base">
                  {open.details}
                </p>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
