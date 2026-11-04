"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useIntro } from "./Providers";

// Brand intro: the iBEST flame bounces in while a progress counter runs to 100.
export default function Loader() {
  const { ready, setReady } = useIntro();
  const [pct, setPct] = useState(0);

  useEffect(() => {
    // the intro plays once per visit; coming back to the home page skips it
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || sessionStorage.getItem("ibest-intro")) {
      setReady(true);
      return;
    }
    sessionStorage.setItem("ibest-intro", "1");
    const start = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const p = Math.min(100, ((now - start) / 1500) * 100);
      setPct(Math.round(p));
      if (p < 100) id = requestAnimationFrame(tick);
      else setTimeout(() => setReady(true), 200);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [setReady]);

  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy motion-safe:animate-[loader-failsafe_0.6s_ease-in_5s_forwards]"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="cloud-pattern absolute inset-0" />
          <motion.img
            src="/img/emblem-light.png"
            alt=""
            className="relative h-24 w-auto sm:h-28"
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0, y: [0, -14, 0] }}
            transition={{ scale: { type: "spring", damping: 10 }, y: { repeat: Infinity, duration: 1.1, ease: "easeInOut" } }}
          />
          <p className="relative mt-6 font-display text-2xl font-extrabold tracking-tight text-cream">
            iBEST <span className="text-red">STUDIOS</span>
          </p>
          <div className="relative mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-cream/15">
            <div className="h-full rounded-full bg-gradient-to-r from-orange to-sun" style={{ width: `${pct}%` }} />
          </div>
          <p className="relative mt-3 font-mono text-xs tabular-nums text-cream/70">{pct}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
