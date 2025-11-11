import React from "react";
import GeneralBtn from "../../components/Buttons/GeneralBtn";

const ComponentError = ({ error, refetch }) => {
  return (
    <div className="container mx-auto my-12">
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-base-300 rounded-xl  px-4 mx-4 shadow-md">
        <div className="bg-base-200 text-secondary px-4 py-2 rounded-full text-3xl font-semibold mb-3">
          ⚠️ Something Went Wrong
        </div>
        <p className="text-gradient my-12 text-4xl font-bold leading-12  max-w-md">
          {error?.message ||
            "An unexpected error occurred. Please try again later."}
        </p>
        <div onClick={() => refetch()}>
          <GeneralBtn>Try Again</GeneralBtn>
        </div>
      </div>
    </div>
  );
};

export default ComponentError;
