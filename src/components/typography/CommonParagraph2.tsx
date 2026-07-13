import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph2: React.FC<TextProps> = ({ children, className = "" }) => {
  return (
    <p className={`text-base leading-relaxed sm:text-lg md:text-xl 3xl:text-2xl ${className}`}>
      {children}
    </p>
  );
};

export default CommonParagraph2;
