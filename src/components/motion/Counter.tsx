"use client";

import {
  animate,
  useInView,
  useReducedMotion,
  useMotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CounterProps {
  to: number;
  className?: string;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

/** Ticks from 0 up to `to` the first time it scrolls into view. */
export default function Counter({
  to,
  className = "",
  suffix = "",
  prefix = "",
  duration = 2,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  const count = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduced) {
      setDisplay(to);
      return;
    }

    const controls = animate(count, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [inView, to, duration, reduced, count]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
