import React from "react";

const AuthBtn = ({ children, onClick, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`
        group relative flex items-center justify-center
        bg-gradient-to-r from-[#d96c4e] to-[#fbbf2490]
        text-white font-medium text-sm tracking-wider
        h-[2.8em] pl-[1.2em] pr-[3.3em] rounded-[0.9em]
        border-none shadow-inner cursor-pointer overflow-hidden
        transition-all duration-300 active:scale-95
      `}
      style={{ boxShadow: "inset 0 0 1.6em -0.6em #4a2c2a" }}
    >
      {children}

      <div className="absolute right-[0.3em] flex items-center justify-center h-[2.2em] w-[2.2em] bg-white rounded-[0.7em] transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-md">
        <svg
          height={24}
          width={24}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-[1.1em] text-[#383838] transition-transform duration-300 group-hover:translate-x-[0.1em]"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
            fill="currentColor"
          />
        </svg>
      </div>
    </button>
  );
};

export default AuthBtn;
