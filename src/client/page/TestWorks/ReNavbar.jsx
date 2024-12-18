import React, { useState } from "react";
import { Search, Menu, X, ChevronRight } from "lucide-react";
import { IoRepeat } from "react-icons/io5";
import { TiHeartOutline } from "react-icons/ti";
import { BsHandbag } from "react-icons/bs";

const ReNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("Category");

  const IconButton = ({ icon: Icon, count }) => (
    <div className="relative group">
      <div className="size-3 rounded-full bg-[#eaeaea] text-[10px] sm:text-xs flex text-green-700 justify-center items-center absolute left-3 sm:left-4 bottom-3 sm:bottom-4">
        {count}
      </div>
      <Icon
        size={20}
        className="sm:size-[25px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
      />
    </div>
  );

  return (
    <nav className="bg-emerald-900 w-full">
      {/* Desktop Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src="/api/placeholder/112/40"
              alt="logo"
              className="h-10 w-28 object-contain"
            />
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-400 hover:text-amber-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop menu items */}
          <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1 lg:ml-8">
            {/* Search bar */}
            <div className="w-[40%] min-w-[400px]">
              <div className="flex items-center bg-white rounded-lg shadow-lg">
                <input
                  type="text"
                  placeholder="Search For Products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow px-4 py-2 rounded-l-lg text-sm text-teal-900 placeholder-teal-700 focus:outline-none"
                />
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="appearance-none bg-transparent border-l border-emerald-900 px-3 py-2 text-sm text-teal-700 focus:outline-none cursor-pointer"
                  >
                    <option>Category</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Books</option>
                  </select>
                </div>
                <button className="bg-white text-teal-700 rounded-r-lg p-2 hover:text-teal-900">
                  <Search size={20} />
                </button>
              </div>
            </div>

            {/* Icons and Login */}
            <div className="flex items-center space-x-8">
              <div className="text-amber-400 text-sm font-medium">
                <p className="cursor-pointer hover:text-amber-300 transition-colors">
                  LOGIN / REGISTER
                </p>
              </div>
              <div className="flex space-x-4">
                <IconButton icon={IoRepeat} count={0} />
                <IconButton icon={TiHeartOutline} count={0} />
                <IconButton icon={BsHandbag} count={0} />
              </div>
            </div>

            {/* Language and Queries */}
            <div className="flex space-x-4">
              <button className="flex items-center justify-between bg-white rounded-md px-4 py-2 hover:bg-gray-50 transition-colors group">
                <span className="text-sm text-emerald-900 font-medium group-hover:text-emerald-700">
                  English
                </span>
                <ChevronRight className="h-4 w-4 ml-2 text-emerald-900 group-hover:text-emerald-700" />
              </button>
              <button className="bg-white rounded-md px-4 py-2 text-sm text-emerald-900 font-medium hover:bg-gray-50">
                For Queries
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-4 pt-2 pb-4 space-y-4">
          {/* Mobile Search */}
          <div className="flex items-center bg-white rounded-lg shadow-lg">
            <input
              type="text"
              placeholder="Search For Products"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-3 py-2 rounded-l-lg text-sm"
            />
            <button className="bg-white text-teal-700 rounded-r-lg p-2">
              <Search size={20} />
            </button>
          </div>

          {/* Mobile Login/Register */}
          <div className="text-amber-400 text-sm font-medium text-center">
            <p className="cursor-pointer hover:text-amber-300 transition-colors">
              LOGIN / REGISTER
            </p>
          </div>

          {/* Mobile Icons */}
          <div className="flex justify-center space-x-6">
            <IconButton icon={IoRepeat} count={0} />
            <IconButton icon={TiHeartOutline} count={0} />
            <IconButton icon={BsHandbag} count={0} />
          </div>

          {/* Mobile Language and Queries */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between bg-white rounded-md px-4 py-2 text-sm text-emerald-900">
              English
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="w-full bg-white rounded-md px-4 py-2 text-sm text-emerald-900">
              For Queries
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ReNavbar;
