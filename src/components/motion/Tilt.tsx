"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, type ReactNode } from "react";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Maximum rotation at the card's corners, in degrees. */
  max?: number;
}

/**
 * 3D card tilt that follows the cursor. Rotation is driven off the cursor's
 * position within the card, normalised to -0.5..0.5 on each axis.
 */
export default function Tilt({ children, className = "", max = 8 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const spring = { stiffness: 220, damping: 22, mass: 0.6 };
  // Y-cursor drives X-rotation (and vice versa) — that's what makes the card
  // feel like it's pivoting away from the pointer rather than toward it.
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [max, -max]), spring);
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-max, max]), spring);

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", ...spring }}
    >
      {children}
    </motion.div>
  );
}
