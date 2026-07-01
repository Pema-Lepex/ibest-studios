import React from "react";

const SwrinkArrowIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className || ""}
    >
      <path
        d="M0 11H3L3 0H5L5 11H8V12L4 16L0 12V11Z"
        fill="currentColor"
      />
      <path d="M16 0H10V2H16V0Z" fill="currentColor" />
      <path d="M10 4H14V6H10V4Z" fill="currentColor" />
      <path d="M12 8H10V10H12V8Z" fill="currentColor" />
    </svg>
  );
};

export default SwrinkArrowIcon;
