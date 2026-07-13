"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

interface StaggerProps {
  children: ReactNode;
  className?: string;
  /** Gap between each child's start, in seconds. */
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "section";
}

/**
 * Parent half of the stagger pair. Wrap a grid in <Stagger> and each cell in
 * <StaggerItem> — the children cascade in rather than all landing at once.
 */
export function Stagger({
  children,
  className = "",
  stagger = 0.08,
  delay = 0,
  amount = 0.15,
  as = "div",
}: StaggerProps) {
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </MotionTag>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
  as?: "div" | "li" | "article" | "span";
}

/** Child half of the stagger pair. Inherits timing from its <Stagger> parent. */
export function StaggerItem({
  children,
  className = "",
  distance = 28,
  as = "div",
}: StaggerItemProps) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = reduced
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: distance, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
        },
      };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
