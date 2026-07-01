import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph3: React.FC<TextProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={`
        text-xs
        xs:text-sm
        sm:text-base
        md:text-lg
        lg:text-[1.1rem]
        xl:text-[1.2rem]
        2xl:text-xl
        3xl:text-2xl
        4xl:text-3xl
        5xl:text-4xl
        6xl:text-5xl
        tv-wide:text-6xl
        8k:text-7xl
        leading-relaxed
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default CommonParagraph3;