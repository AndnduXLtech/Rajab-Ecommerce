import React from "react";

const LoaderSnippet = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Main loader animation */}
        <div className="relative w-16 h-16">
          {/* Spinning outer circle */}
          <div className="absolute inset-0 border-4 border-emerald-900/20 rounded-full">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-amber-400 rounded-full animate-[spin_1s_linear_infinite] border-t-transparent border-l-transparent"></div>
          </div>

          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-emerald-900 rounded-full"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-1">
          <p className="text-emerald-900 font-semibold">Loading</p>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-[bounce_1s_infinite]"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-[bounce_1s_infinite_200ms]"></span>
            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-[bounce_1s_infinite_400ms]"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoaderSnippet;
