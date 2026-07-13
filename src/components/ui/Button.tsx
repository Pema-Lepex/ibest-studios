"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "@/components/motion";

type Variant = "gold" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Opens in a new tab and adds the usual rel guard. */
  external?: boolean;
  /** Lean toward the cursor on hover. Worth it for primary CTAs only. */
  magnetic?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  gold: "bg-gold-500 text-ink-950 hover:bg-gold-400 shadow-[0_0_0_0_rgba(255,162,2,0.5)] hover:shadow-[0_8px_30px_-6px_rgba(255,162,2,0.5)]",
  outline:
    "border border-cream/20 text-cream hover:border-gold-500 hover:text-gold-500 hover:bg-gold-500/5",
  ghost: "text-mist hover:text-cream",
};

const SIZES: Record<Size, string> = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm sm:text-base",
  lg: "px-9 py-4 text-base sm:text-lg",
};

export default function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "gold",
  size = "md",
  className = "",
  external = false,
  magnetic = false,
  disabled = false,
  icon,
}: ButtonProps) {
  const classes = `group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  const inner = (
    <>
      {/* Sheen: a diagonal highlight that sweeps across the face on hover. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover/btn:translate-x-full"
      />
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1">
          {icon}
        </span>
      )}
    </>
  );

  const el = href ? (
    <Link
      href={href}
      className={classes}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {inner}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {inner}
    </button>
  );

  return magnetic ? <Magnetic className="inline-block">{el}</Magnetic> : el;
}
