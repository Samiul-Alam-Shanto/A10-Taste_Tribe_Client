import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden animate-pulse">
      <figure className="relative h-56 bg-gray-300"></figure>

      <div className="card-body p-6">
        <div className="flex justify-between pt-5 h-24 items-start">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-5 bg-gray-300 rounded w-16"></div>
        </div>

        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          </div>
        </div>

        <div className="divider my-4"></div>

        <div className="card-actions flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-300"></div>
            <div className="h-4 bg-gray-300 rounded w-20"></div>
          </div>
          <div className="h-10 w-24 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
