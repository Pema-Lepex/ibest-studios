import React from "react";

const WideArrowIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className || ""}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path d="M0 5H3L3 16H5L5 5L8 5V4L4 0L0 4V5Z" fill="currentColor"></path>{" "}
        <path d="M16 6H10V8H16V6Z" fill="currentColor"></path>{" "}
        <path d="M10 10H14V12H10V10Z" fill="currentColor"></path>{" "}
        <path d="M12 14H10V16H12V14Z" fill="currentColor"></path>{" "}
      </g>
    </svg>
  );
};

export default WideArrowIcon;
