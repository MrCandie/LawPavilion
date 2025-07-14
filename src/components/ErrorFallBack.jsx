import React from "react";

const ErrorFallback = () => {
  return (
    <div className="p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        {/* Warning Icon */}
        <svg
          className="w-10 h-10 text-red-500"
          fill="currentColor"
          viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l6.518 11.59c.75 1.335-.213 2.991-1.743 2.991H3.482c-1.53 0-2.493-1.656-1.743-2.99l6.518-11.59zM11 14a1 1 0 10-2 0 1 1 0 002 0zm-1-2a1 1 0 01-1-1V7a1 1 0 112 0v4a1 1 0 01-1 1z"
            clipRule="evenodd"
          />
        </svg>

        {/* Heading */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Unexpected Application Error
        </h2>

        {/* Subtext */}
        <p className="text-gray-600 dark:text-gray-400">
          Something went wrong. Please try again.
        </p>

        {/* Refresh Button */}
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 text-white bg-orange-500 rounded hover:bg-orange-600 transition">
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ErrorFallback;
