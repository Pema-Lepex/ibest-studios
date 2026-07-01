import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-2
        hover:border-primary-500/40
        hover:shadow-2xl
        hover:shadow-primary-500/10
        ${className}
      `}
    >
      {/* Glow Effect */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
          bg-gradient-to-br
          from-primary-500/10
          via-transparent
          to-primary-700/10
          pointer-events-none
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Card;