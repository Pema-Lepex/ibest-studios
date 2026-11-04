"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

// Camera-focus cursor, shown only for fine pointers; touch devices keep native behaviour.
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { damping: 30, stiffness: 400 });
  const sy = useSpring(y, { damping: 30, stiffness: 400 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setHover(!!(e.target as HTMLElement).closest("a,button"));
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden mix-blend-difference [@media(hover:hover)_and_(pointer:fine)]:block"
      aria-hidden
    >
      <motion.div
        animate={{ scale: hover ? 1.8 : 1 }}
        className="relative -translate-x-1/2 -translate-y-1/2"
      >
        <div className="size-8 rounded-full border border-white" />
        <div className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
      </motion.div>
    </motion.div>
  );
}
