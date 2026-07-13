"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Pixels of drift across the element's full pass through the viewport. */
  distance?: number;
  /** Negative moves against the scroll (the classic "further away" read). */
  direction?: 1 | -1;
}

/** Drifts its child vertically as the page scrolls past it. */
export default function Parallax({
  children,
  className = "",
  distance = 80,
  direction = -1,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // "start end" → "end start" tracks the element from the moment it enters the
  // bottom of the viewport to the moment it leaves the top.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const raw = useTransform(
    scrollYProgress,
    [0, 1],
    [distance * direction, -distance * direction],
  );
  const y = useSpring(raw, { stiffness: 120, damping: 30, mass: 0.4 });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
