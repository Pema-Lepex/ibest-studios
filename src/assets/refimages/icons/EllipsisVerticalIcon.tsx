import React from "react";

const EllipsisVerticalIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={`${className || "w-6 h-6 size-8"}`}
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10.5 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm0 6a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default EllipsisVerticalIcon;
