import React from "react";
import { TextProps } from "../../types/TextProps";

const Heading4: React.FC<TextProps> = ({ children, className = "" }) => {
  return (
    <h4
      className={`font-raleway text-xl font-bold leading-snug tracking-tight sm:text-2xl md:text-3xl 3xl:text-4xl ${className}`}
    >
      {children}
    </h4>
  );
};

export default Heading4;
