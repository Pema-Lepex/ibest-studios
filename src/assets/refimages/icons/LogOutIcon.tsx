import React from "react";

const LogOutIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      className={`${className || "h-4 w-4 text-primary-500 mr-1"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
};

export default LogOutIcon;
