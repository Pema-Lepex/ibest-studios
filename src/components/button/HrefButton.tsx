import { JSX } from "react";
import { ButtonProps } from "./ButtonProps";
import Link from "next/link";

export default function HrefButton({
  children,
  type,
  className,
  onClick,
  href,
  target
}: ButtonProps): JSX.Element {
  return (
          <Link
            href={href}
            target={target}
            rel="noopener noreferrer"
            className={`text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl 4xl:text-4xl 5xl:text-5xl w-64 h-12 2xl:w-80 2xl:h-20 5xl:w-[750px] 5xl:h-28 rounded-md font-semibold transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex justify-center items-center ${className}`}
          >
            {children}
          </Link>
  );
}
