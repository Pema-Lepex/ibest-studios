"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Which way the element travels in from. */
  direction?: Direction;
  /** Seconds to wait before starting. Use to hand-stagger siblings. */
  delay?: number;
  duration?: number;
  distance?: number;
  /** Replay the animation every time it re-enters the viewport. */
  repeat?: boolean;
  /** Fraction of the element that must be visible to trigger. */
  amount?: number;
  as?: "div" | "section" | "li" | "span" | "article";
}

const offset = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/**
 * Fades and slides its children in as they scroll into view.
 * The workhorse — most sections on the site are wrapped in one of these.
 */
export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 32,
  repeat = false,
  amount = 0.25,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  // Honouring prefers-reduced-motion means rendering the end state immediately,
  // not a faster version of the same travel.
  const variants: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, ...offset(direction, distance) },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, delay, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: !repeat, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}
