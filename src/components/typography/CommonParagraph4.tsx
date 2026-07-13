import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph4: React.FC<TextProps> = ({ children, className = "" }) => {
  return (
    <p className={`text-sm leading-relaxed sm:text-[0.95rem] md:text-base 3xl:text-lg ${className}`}>
      {children}
    </p>
  );
};

export default CommonParagraph4;
