import React, { useState } from "react";

const CustomSearchInput = () => {
  const [category, setCategory] = useState("Category");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="m-5">
      <div className="inline-flex items-center border border-teal-500 rounded-md overflow-hidden ">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="h-8 px-2 focus:outline-none"
          placeholder="Search..."
        />
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-8 px-2 appearance-none bg-transparent border-l border-teal-500 focus:outline-none cursor-pointer"
          >
            <option>Category</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button className="h-8 px-4 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none">
          Search
        </button>
      </div>
    </div>
  );
};

export default CustomSearchInput;
