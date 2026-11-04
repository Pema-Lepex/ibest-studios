"use client";

import Lenis from "lenis";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";

type Ctx = {
  ready: boolean;
  setReady: (v: boolean) => void;
  scrollTo: (target: string) => void;
  /** follow a nav link: "#id" scrolls on the home page (or goes home first), "/path" opens that page */
  go: (href: string) => void;
};

const IntroContext = createContext<Ctx>({ ready: false, setReady: () => {}, scrollTo: () => {}, go: () => {} });

export const useIntro = () => useContext(IntroContext);

export default function Providers({ children, intro = true }: { children: React.ReactNode; intro?: boolean }) {
  // open connections early so posters and videos start sooner
  preconnect("https://i.ytimg.com");
  preconnect("https://www.youtube-nocookie.com");

  // pages without the intro screen are ready (and scrollable) straight away
  const [ready, setReady] = useState(!intro);
  const lenisRef = useRef<Lenis | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  const scrollTo = useCallback((target: string) => {
    const el = document.querySelector(target) as HTMLElement | null;
    if (!el) return;
    const offset = target === "#top" ? 0 : -(document.querySelector("header")?.offsetHeight ?? 64);
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset, duration: 1.4 });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: "smooth" });
  }, []);

  // Lock scrolling while the intro plays; once it's done, honour a #section in the URL.
  useEffect(() => {
    if (ready) {
      lenisRef.current?.start();
      document.documentElement.style.overflow = "";
      if (window.location.hash.length > 1) setTimeout(() => scrollTo(window.location.hash), 150);
    } else {
      lenisRef.current?.stop();
      document.documentElement.style.overflow = "hidden";
    }
  }, [ready, scrollTo]);

  const go = useCallback(
    (href: string) => {
      if (href.startsWith("#")) {
        if (pathname === "/") scrollTo(href);
        else router.push(href === "#top" ? "/" : `/${href}`);
      } else {
        router.push(href);
      }
    },
    [pathname, router, scrollTo],
  );

  return <IntroContext.Provider value={{ ready, setReady, scrollTo, go }}>{children}</IntroContext.Provider>;
}
