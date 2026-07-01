import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph2: React.FC<TextProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={`
        text-sm
        xs:text-base
        sm:text-lg
        md:text-xl
        lg:text-[1.3rem]
        xl:text-[1.4rem]
        2xl:text-2xl
        3xl:text-3xl
        4xl:text-4xl
        5xl:text-5xl
        6xl:text-6xl
        tv-wide:text-7xl
        8k:text-8xl
        leading-relaxed
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default CommonParagraph2;
