import React from "react";
import { TextProps } from "../../types/TextProps";

export default function Heading1({
  children,
  className = "",
}: TextProps) {
  return (
    <h1
      className={`
        text-3xl
        xs:text-4xl
        sm:text-5xl
        md:text-6xl
        lg:text-7xl
        xl:text-8xl
        2xl:text-[5.5rem]
        3xl:text-[6.5rem]
        4xl:text-[7.5rem]
        5xl:text-[8.5rem]
        6xl:text-[9.5rem]
        tv-wide:text-[10.5rem]
        8k:text-[12rem]
        font-extrabold
        leading-tight
        ${className}
      `}
    >
      {children}
    </h1>
  );
}