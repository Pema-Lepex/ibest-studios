"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { thumb } from "@/data/site";

export const playVideo = (id: string) => window.dispatchEvent(new CustomEvent("play-video", { detail: id }));

// One shared lightbox; the YouTube iframe only loads when a video is opened.
export default function VideoModal() {
  const [id, setId] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<string | null>(null);

  useEffect(() => {
    const onPlay = (e: Event) => setId((e as CustomEvent<string>).detail);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setId(null);
    window.addEventListener("play-video", onPlay);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("play-video", onPlay);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <AnimatePresence>
      {id && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-abyss/90 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setId(null)}
          role="dialog"
          aria-modal
        >
          <motion.div
            initial={{ scale: 0.85, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 22, stiffness: 200 }}
            className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border border-cream/10 bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={thumb(id)} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
            <iframe
              className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${loaded === id ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setLoaded(id)}
              key={id}
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
              title="iBEST Studios video"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          </motion.div>
          <button
            onClick={() => setId(null)}
            className="absolute right-4 top-4 flex size-12 items-center justify-center rounded-full bg-cream text-2xl text-navy md:right-8 md:top-8"
            aria-label="Close video"
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
