import React from "react";
import { ChevronRight } from "lucide-react";

const LanguageSelector = () => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-row gap-4 max-w-2xl mx-auto">
        <button className="flex items-center justify-between bg-white rounded-md px-3 py-2 w-32 hover:bg-gray-50 transition-colors">
          <span className="text-emerald-900 font-medium">Quries</span>
          <ChevronRight
            className="h-5 w-5 text-emerald-900"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export default LanguageSelector;
