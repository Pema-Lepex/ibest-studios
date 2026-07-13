import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph3: React.FC<TextProps> = ({ children, className = "" }) => {
  return (
    <p className={`text-sm leading-relaxed sm:text-base md:text-lg 3xl:text-xl ${className}`}>
      {children}
    </p>
  );
};

export default CommonParagraph3;
