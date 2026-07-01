import React, { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  animation?: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in";
  duration?: number; // ms
  delay?: number; // ms
  distance?: number; // px
  easing?: string;
}

const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  className = "",
  threshold = 0.18,
  rootMargin = "0px 0px -8% 0px",
  once = true,
  animation = "fade-up",
  duration = 700,
  delay = 0,
  distance = 24,
  easing = "cubic-bezier(0.22, 1, 0.36, 1)",
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
    if (reduce) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once && el) observer.unobserve(el);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  let hiddenTransform = "";
  switch (animation) {
    case "fade-down":
      hiddenTransform = `translateY(-${distance}px) scale(0.995)`;
      break;
    case "fade-left":
      hiddenTransform = `translateX(-${distance}px) scale(0.995)`;
      break;
    case "fade-right":
      hiddenTransform = `translateX(${distance}px) scale(0.995)`;
      break;
    case "zoom-in":
      hiddenTransform = `scale(0.92) translateY(${distance / 3}px)`;
      break;
    case "fade-up":
    default:
      hiddenTransform = `translateY(${distance}px) scale(0.995)`;
      break;
  }

  const transitionStyle: React.CSSProperties = {
    transitionProperty: "opacity, transform",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${delay}ms`,
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : hiddenTransform,
    willChange: visible ? "auto" : "transform, opacity",
  };

  return (
    <div
      ref={ref}
      className={`${className}`}
      style={transitionStyle}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
};

export default AnimateOnScroll;