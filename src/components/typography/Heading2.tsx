import React from "react";
import { TextProps } from "../../types/TextProps";

const Heading2: React.FC<TextProps> = ({ children, className = "" }) => {
  return (
    <h2
      className={`display text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl 3xl:text-8xl ${className}`}
    >
      {children}
    </h2>
  );
};

export default Heading2;
