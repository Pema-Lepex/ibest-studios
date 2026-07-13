"use client";
import { FC } from "react";
import { ButtonProps } from "./ButtonProps";

const SubmitButton: FC<ButtonProps> = ({
  children,
  type,
  className,
  onClick,
  loading,
  loadingText,
  ...props
}) => {
  return (
    <button
    {...props}
      onClick={onClick}
      type={type}
      disabled={loading}
      className={`bg-gold-500 text-ink-950 font-semibold px-9 py-3 rounded-lg shadow-md hover:bg-gold-600 hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out transform ${className}`}
    >
      <span className="flex items-center space-x-2 justify-center">
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
            {loadingText ? loadingText : " Submitting..."}
          </>
        ) : (
          <>{children || "Submit"}</>
        )}
      </span>
    </button>
  );
};

export default SubmitButton;
