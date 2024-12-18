import React, { useState } from "react";
import { Search } from "lucide-react";

const CustomSearchInput2 = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Category");

  return (
    <div className="max-w-2xl p-3">
      <div className="flex items-center bg-white rounded-lg shadow-lg">
        <input
          type="text"
          placeholder="Search For Products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow px-6 py-3 rounded-l-full text-lg text-teal-900 placeholder-teal-700 focus:outline-none"
        />
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="appearance-none bg-transparent border border-x-emerald-900 px-4 py-3 pr-8 text-lg text-teal-700 focus:outline-none cursor-pointer"
          >
            <option>Category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Books</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-teal-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button className="bg-white text-teal-700 rounded-r-full p-3 focus:outline-none hover:text-teal-900">
          <Search size={24} />
        </button>
      </div>
    </div>
  );
};

export default CustomSearchInput2;
