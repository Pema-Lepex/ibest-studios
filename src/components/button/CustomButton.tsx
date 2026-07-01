import { JSX } from "react";

import { ButtonProps } from "./ButtonProps";
export default function CustomButton({
  children,
  type,
  className,
  loading,
  onClick,
  loadingText,
  ...props
}: ButtonProps): JSX.Element {
  return (
    <>
      <button
      {...props}
        onClick={onClick}
        type={type}
        className={`font-semibold px-6 py-3 rounded-lg shadow-sm  hover:shadow-md transition-all duration-300 ease-in-out ${className}`}
      >
        {loading ? (
          <div className="flex items-center space-x-2 justify-center">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>{loadingText}</span>
          </div>
        ) : (
          <>{children || "Submit"}</>
        )}
      </button>
    </>
  );
}
