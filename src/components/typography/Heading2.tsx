import React from "react";
import { TextProps } from "../../types/TextProps";

const Heading2: React.FC<TextProps> = ({
  children,
  className = "",
}) => {
  return (
    <h2
      className={`
        text-2xl
        xs:text-3xl
        sm:text-4xl
        md:text-5xl
        lg:text-6xl
        xl:text-7xl
        2xl:text-[4.5rem]
        3xl:text-[5.25rem]
        4xl:text-[6rem]
        5xl:text-[7rem]
        6xl:text-[8rem]
        tv-wide:text-[9rem]
        8k:text-[10rem]
        font-bold
        leading-tight
        ${className}
      `}
    >
      {children}
    </h2>
  );
};

export default Heading2;