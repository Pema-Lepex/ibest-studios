"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** How far the element leans toward the cursor, as a fraction of the offset. */
  strength?: number;
}

/**
 * Pulls its child gently toward the cursor while hovered, then springs back.
 * Reserved for primary CTAs — used everywhere it would feel gimmicky.
 */
export default function Magnetic({
  children,
  className = "",
  strength = 0.35,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });

  // Touch devices have no hover, and a cursor-follow on a reduced-motion
  // setting is exactly the kind of thing that preference is asking us to skip.
  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
