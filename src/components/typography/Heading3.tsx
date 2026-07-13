import React from "react";
import { TextProps } from "../../types/TextProps";

const Heading3: React.FC<TextProps> = ({ children, className = "" }) => {
  return (
    <h3
      className={`display text-2xl xs:text-3xl sm:text-4xl md:text-5xl 3xl:text-6xl ${className}`}
    >
      {children}
    </h3>
  );
};

export default Heading3;
