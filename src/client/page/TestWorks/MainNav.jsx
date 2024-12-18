import React from "react";

import LogAndIcons from "../../components/layout/LogAndIcons";

import Logo from "../../assets/logo.png";
import CustomSearchInput2 from "@/components/CustomSearchInput2";
import LanguageSelector from "../../components/layout/LanguageSelector";
function MainNav() {
  // add flex row reverse to reverse the nav
  return (
    <div className=" flex  p-0 w-full  bg-emerald-900 justify-center items-center">
      <div className="w-[40%] flex justify-start mx-4">
        <img src={Logo} alt="logo" className=" w-28   my-auto" />
      </div>
      <div className="w-[40%] mx-5 my-auto">
        <CustomSearchInput2 />
      </div>

      <div className="w-[15%]">
        <LogAndIcons />
      </div>

      <div className="w-[10%] mx-4 ">
        <LanguageSelector />
      </div>
    </div>
  );
}

export default MainNav;
