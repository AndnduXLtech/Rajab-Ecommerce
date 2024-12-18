import React, { useState } from "react";
import Logo from "../../assets/logo.png";
import CustomSearchInput2 from "@/components/CustomSearchInput2";
import LogAndIcons from "./LogAndIcons";
import LanguageSelector from "./LanguageSelector";
import TopBarScrolling from "./TopBarScrolling";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/Auth-provider";
import { useCurrentUser } from "../../store/slice/profileslice/profilefetcher";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { myRole } = useAuth();
  const { data: user, loading } = useCurrentUser();
  console.log(user);
  console.log(myRole);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <TopBarScrolling />
      <div className="bg-custom-green">
        <nav className="relative px-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              className="navbar-burger flex items-center text-blue-600 p-3 mr-4 lg:hidden"
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
            <Link className="" to={"/"}>
              <img src={Logo} alt="logo" className="w-24 my-auto" />
            </Link>
          </div>
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            <CustomSearchInput2 />
            <LogAndIcons />
            <LanguageSelector />
          </div>
        </nav>
        <div className="bg-emerald-900 px-4 py-2 lg:hidden">
          <CustomSearchInput2 />
        </div>
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
    </>
  );
};

export default Nav;
