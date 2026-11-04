"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { educare, nav, site } from "@/data/site";
import { useIntro } from "./Providers";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { ready, go: follow } = useIntro();
  const pathname = usePathname();
  const { scrollY, scrollYProgress } = useScroll();
  const travel = useRef(0); // distance scrolled in the current direction

  // Hide the bar after scrolling down a little, bring it back as soon as the visitor scrolls up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? y);
    setSolid(y > 40);
    if (y < 120) {
      travel.current = 0;
      setHidden(false);
      return;
    }
    travel.current = Math.sign(delta) === Math.sign(travel.current) ? travel.current + delta : delta;
    if (travel.current > 48) setHidden(true);
    else if (travel.current < -16) setHidden(false);
  });

  const isActive = (href: string) => href.startsWith("/") && pathname?.replace(/\/$/, "") === href;

  const go = (href: string) => {
    setOpen(false);
    setTimeout(() => follow(href), open ? 300 : 0);
  };

  return (
    <>
      <motion.header
        initial={false}
        animate={{ y: ready && (!hidden || open) ? "0%" : "-100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={() => setHidden(false)}
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          solid && !open ? "bg-deep/85 shadow-lg shadow-black/20 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-20 lg:px-12">
          <button onClick={() => go("#top")} className="flex shrink-0 items-center gap-2.5" aria-label="iBEST Studios — back to top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/logo-original.webp" alt="" width={512} height={512} className="h-12 w-12 lg:h-16 lg:w-16" />
          </button>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.slice(0, -1).map((n) => (
              <button
                key={n.href}
                onClick={() => go(n.href)}
                aria-current={isActive(n.href) ? "page" : undefined}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition hover:text-cream ${
                  isActive(n.href) ? "text-sun" : "text-cream/85"
                }`}
              >
                {n.label}
                <span
                  className={`absolute inset-x-4 bottom-1 h-0.5 origin-left rounded-full bg-sun transition-transform duration-300 group-hover:scale-x-100 ${
                    isActive(n.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => go("/contact")}
              className="hidden rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red/30 transition hover:-translate-y-0.5 hover:bg-ember sm:block"
            >
              Let&apos;s talk
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative flex size-11 items-center justify-center rounded-full bg-cream/10 text-cream backdrop-blur lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition ${open ? "rotate-45" : "-translate-y-[5px]"}`} />
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition ${open ? "opacity-0" : ""}`} />
              <span className={`absolute h-0.5 w-5 rounded-full bg-current transition ${open ? "-rotate-45" : "translate-y-[5px]"}`} />
            </button>
          </div>
        </div>
      </motion.header>
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-red via-orange to-sun"
        aria-hidden
      />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy px-5 pb-8 pt-24 sm:px-8 lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.75rem) 2rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.75rem) 2rem)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="cloud-pattern pointer-events-none absolute inset-0" />
            <ul className="relative space-y-1">
              {nav.map((n, i) => (
                <li key={n.href} className="overflow-hidden">
                  <motion.button
                    onClick={() => go(n.href)}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    aria-current={isActive(n.href) ? "page" : undefined}
                    className={`flex items-baseline gap-4 py-1 font-display text-[clamp(2.2rem,10vw,3.5rem)] font-extrabold leading-tight tracking-tight ${
                      isActive(n.href) ? "text-sun" : "text-cream"
                    }`}
                  >
                    <span className="font-mono text-xs font-normal text-sun">0{i + 1}</span>
                    {n.label}
                  </motion.button>
                </li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="relative mt-auto space-y-5 pt-10"
            >
              <a href={`mailto:${site.email}`} className="block break-all text-lg font-semibold text-sun">
                {site.email}
              </a>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  ["YouTube", site.socials.youtube],
                  ["Instagram", site.socials.instagram],
                  ["Facebook", site.socials.facebook],
                  ["Educare Skill", educare.url],
                ].map(([l, h]) => (
                  <a key={l} href={h} target="_blank" rel="noreferrer" className="rounded-full border border-cream/25 px-4 py-2 text-cream/90">
                    {l}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
