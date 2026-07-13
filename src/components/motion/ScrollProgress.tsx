"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Gold hairline across the top of the page tracking scroll depth. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-linear-to-r from-gold-500 to-ember-500"
      aria-hidden="true"
    />
  );
}
