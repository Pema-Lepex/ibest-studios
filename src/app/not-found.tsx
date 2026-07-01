
"use client";
import Link from "next/link";
import React from "react";

const PageNotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-9xl font-extrabold text-[#013954] drop-shadow-lg">
        404
      </h1>
      <p className="text-lg text-[#4D7487] mt-4">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <p className="text-sm text-[#99B0BB] max-w-md mt-2">
        It might have been moved or deleted. Check the URL or go back to the homepage.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-primary-600 px-6 py-3 hover:bg-primary-700 transition text-white"
      >
        Go Home
      </Link>
    </div>
  );
};

export default PageNotFound;
