import { JSX } from "react";
import { ButtonProps } from "./ButtonProps";

export default function CancelButton({
  children,
  type,
  className,
  onClick,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <>
      <button
      {...props}
        onClick={onClick}
        type={type ? type : "button"}
        className={`bg-red-600 text-white font-semibold px-9 py-3 rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform ${className}`}
      >
      {children || "Cancel"}
      </button>
    </>
  );
}
