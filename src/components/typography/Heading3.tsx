import React from "react";
import { TextProps } from "../../types/TextProps";

const Heading3: React.FC<TextProps> = ({
  children,
  className = "",
}) => {
  return (
    <h3
      className={`
        text-xl
        xs:text-2xl
        sm:text-3xl
        md:text-4xl
        lg:text-5xl
        xl:text-6xl
        2xl:text-[3.5rem]
        3xl:text-[4rem]
        4xl:text-[4.5rem]
        5xl:text-[5.25rem]
        6xl:text-[6rem]
        tv-wide:text-[7rem]
        8k:text-[8rem]
        font-bold
        leading-snug
        ${className}
      `}
    >
      {children}
    </h3>
  );
};

export default Heading3;