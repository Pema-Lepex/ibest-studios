import React from "react";
import { TextProps } from "../../types/TextProps";

const Heading4: React.FC<TextProps> = ({
  children,
  className = "",
}) => {
  return (
    <h4
      className={`
        text-lg
        xs:text-xl
        sm:text-2xl
        md:text-3xl
        lg:text-4xl
        xl:text-5xl
        2xl:text-[2.75rem]
        3xl:text-[3.25rem]
        4xl:text-[3.75rem]
        5xl:text-[4.25rem]
        6xl:text-[5rem]
        tv-wide:text-[5.75rem]
        8k:text-[6.5rem]
        font-semibold
        leading-snug
        ${className}
      `}
    >
      {children}
    </h4>
  );
};

export default Heading4;