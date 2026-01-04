import React from "react";

const SkeletonLoader = () => {
  return (
    <div className="card w-full bg-white/50 border border-[#e8e2d9] shadow-sm rounded-3xl overflow-hidden p-0">
      {/* Image Placeholder */}
      <div className="h-56 w-full bg-gray-200/80 animate-pulse relative overflow-hidden">
        {/* Shimmer Effect overlay */}
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
      </div>

      <div className="p-6 space-y-4">
        {/* Title & Rating Placeholder */}
        <div className="flex justify-between items-start h-16">
          <div className="h-6 bg-gray-200 rounded-md w-3/5 animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded-md w-16 animate-pulse"></div>
        </div>

        {/* Metadata Placeholders */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4 animate-pulse"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-1/2 animate-pulse"></div>
          </div>
        </div>

        <div className="divider my-4 h-px bg-gray-100"></div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded-md w-24 animate-pulse"></div>
          </div>
          <div className="h-10 w-28 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
