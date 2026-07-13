import { TextProps } from "@/types/TextProps";
import React from "react";

const CommonParagraph1: React.FC<TextProps> = ({ children, className = "" }) => {
  return (
    <p className={`text-lg leading-relaxed sm:text-xl md:text-2xl 3xl:text-3xl ${className}`}>
      {children}
    </p>
  );
};

export default CommonParagraph1;
