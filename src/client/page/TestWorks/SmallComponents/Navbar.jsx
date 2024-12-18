import React, { useState } from "react";
import Logo from "../../../assets/logo.png";
import CustomSearchInput2 from "@/components/CustomSearchInput2";
import LogAndIcons from "../../../components/layout/LogAndIcons";
import LanguageSelector from "../../../components/layout/LanguageSelector";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="bg-emerald-900">
      <nav className="relative px-4  flex justify-between items-center">
        <a className="" href="#">
          <img src={Logo} alt="logo" className="w-24 my-auto" />
        </a>
        <div className="lg:hidden">
          <button
            className="navbar-burger flex items-center text-blue-600 p-3"
            onClick={toggleMenu}
          >
            <svg
              className="block h-4 w-4 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Mobile menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
        {/* Modified this ul element to be right-aligned */}
        <ul className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6 lg:w-1/2">
          <CustomSearchInput2 />
          <LogAndIcons />
          <LanguageSelector />
        </ul>
      </nav>
      {isMenuOpen && (
        <div className="navbar-menu relative z-50 lg:hidden">
          <div className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>
          <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
            <div className="flex items-center mb-8">
              <a className="mr-auto text-3xl font-bold leading-none" href="#">
                <svg className="h-12" alt="logo" viewBox="0 0 10240 10240">
                  {/* SVG Path Here */}
                </svg>
              </a>
              <button className="navbar-close" onClick={toggleMenu}>
                <svg
                  className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 18L18 6M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <ul>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm text-gray-900 hover:bg-blue-50 rounded"
                  href="#"
                >
                  Home
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm text-gray-900 hover:bg-blue-50 rounded"
                  href="#"
                >
                  About Us
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm text-gray-900 hover:bg-blue-50 rounded"
                  href="#"
                >
                  Services
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm text-gray-900 hover:bg-blue-50 rounded"
                  href="#"
                >
                  Pricing
                </a>
              </li>
              <li className="mb-1">
                <a
                  className="block p-4 text-sm text-gray-900 hover:bg-blue-50 rounded"
                  href="#"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Navbar;
