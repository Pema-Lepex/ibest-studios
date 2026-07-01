import React from "react";

type Props = React.SVGProps<SVGSVGElement> & {
  variant?: "ticket" | "ticketFilled" | "tag";
  className?: string
};

const CouponIcon: React.FC<Props> = ({ variant = "ticket",className, ...props }) => {
  if (variant === "ticketFilled") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        {...props}
      >
        <path d="M6 5h12a2 2 0 0 1 2 2v1.25a1.75 1.75 0 0 0 0 3.5V13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.25a1.75 1.75 0 0 0 0-3.5V7a2 2 0 0 1 2-2z" />
        <path
          d="M12 5v14"
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray="3 3"
        />
        <circle cx="8.5" cy="9" r="0.9" fill="white" />
        <circle cx="8.5" cy="15" r="0.9" fill="white" />
      </svg>
    );
  }
  if (variant === "tag") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        <path d="M3 12l7.3-7.3a2 2 0 0 1 1.4-.6H18a2 2 0 0 1 2 2v6.3a2 2 0 0 1-.6 1.4L12 21l-9-9z" />
        <circle cx="15.5" cy="8.5" r="0.9" fill="currentColor" stroke="none" />
        <path d="M9 15l6-6" />
        <circle cx="10.5" cy="13.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1}
    stroke="currentColor"
    className={className || "size-5"}
  >
    <path d="M21 10a2.25 2.25 0 0 1 .41.04.5.5 0 0 0 .41-.11.5.5 0 0 0 .18-.38V7.5A2.5 2.5 0 0 0 19.5 5h-15A2.5 2.5 0 0 0 2 7.5v2.05a.5.5 0 0 0 .59.49A2.25 2.25 0 0 1 3 10a2 2 0 0 1 0 4 2.25 2.25 0 0 1-.41-.04.5.5 0 0 0-.41.11.5.5 0 0 0-.18.38v2.05A2.5 2.5 0 0 0 4.5 19h15a2.5 2.5 0 0 0 2.5-2.5V14.45a.5.5 0 0 0-.59-.49A2.25 2.25 0 0 1 21 14a2 2 0 0 1 0-4Z" />
    <path d="M12.5 9v1a.5.5 0 0 1-1 0V9a.5.5 0 0 1 1 0ZM12.5 14v1a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 1 0Z" />
  </svg>
  );
};

export default CouponIcon;
