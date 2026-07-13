import React from "react";
import { TextProps } from "../../types/TextProps";

export default function Heading1({ children, className = "" }: TextProps) {
  return (
    <h1
      className={`display text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl 3xl:text-9xl ${className}`}
    >
      {children}
    </h1>
  );
}
