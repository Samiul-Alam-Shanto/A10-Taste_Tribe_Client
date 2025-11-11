import React from "react";

const UniversalSpinner = () => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-[calc(100vh-300px)] bg-base-100"
      aria-live="polite"
      role="status"
    >
      <div className="relative flex justify-center items-center w-32 h-32">
        <div
          className="absolute rounded-full border-2 border-primary animate-ripple"
          style={{ width: "100%", height: "100%" }}
        ></div>
        <div
          className="absolute rounded-full border-2 border-secondary animate-ripple animation-delay-250ms"
          style={{ width: "100%", height: "100%" }}
        ></div>
        <div
          className="absolute rounded-full border-2 border-accent animate-ripple animation-delay-500ms"
          style={{ width: "100%", height: "100%" }}
        ></div>
      </div>
      <p className="mt-8 text-lg font-medium text-secondary tracking-widest animate-pulse">
        Gathering the freshest reviews...
      </p>
    </div>
  );
};

export default UniversalSpinner;
