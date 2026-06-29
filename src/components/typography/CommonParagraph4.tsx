import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph4: React.FC<TextProps> = ({
  children,
  className = "",
}) => {
  return (
    <p
      className={`
        text-xs
        xs:text-xs
        sm:text-sm
        md:text-base
        lg:text-[1rem]
        xl:text-[1.05rem]
        2xl:text-lg
        3xl:text-xl
        4xl:text-2xl
        5xl:text-3xl
        6xl:text-4xl
        tv-wide:text-5xl
        8k:text-6xl
        leading-relaxed
        ${className}
      `}
    >
      {children}
    </p>
  );
};

export default CommonParagraph4;