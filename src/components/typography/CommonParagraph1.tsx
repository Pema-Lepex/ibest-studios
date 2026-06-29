import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph1: React.FC<TextProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={`
        text-base
        xs:text-lg
        sm:text-xl
        md:text-2xl
        lg:text-[1.5rem]
        xl:text-[1.75rem]
        2xl:text-3xl
        3xl:text-4xl
        4xl:text-5xl
        5xl:text-6xl
        6xl:text-7xl
        tv-wide:text-8xl
        8k:text-9xl
        leading-relaxed
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default CommonParagraph1;