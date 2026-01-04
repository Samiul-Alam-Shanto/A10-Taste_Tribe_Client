import React from "react";

const GeneralBtn = ({
  children,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        group relative flex items-center justify-center gap-2 px-9 py-2.5
        rounded-full border-none cursor-pointer overflow-hidden
        bg-linear-to-r from-[#d96c4e] via-[#fbbf24] to-[#d96c4e]
        bg-size-[200%_auto] bg-left
        text-white font-semibold text-base
        transition-all  ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:bg-right  active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      <svg
        viewBox="0 0 24 24"
        className="absolute left-[-25%] w-6 fill-white z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:left-4"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>

      <span className="relative z-10 -translate-x-3 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-3">
        {children}
      </span>

      <svg
        viewBox="0 0 24 24"
        className="absolute right-4 w-6 fill-white z-10 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:right-[-25%]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </button>
  );
};

export default GeneralBtn;
