import React from "react";
import Nav from "./Nav";
import CategoryNav from "./CategoryNav";
import { Outlet } from "react-router-dom";
import { AuthProvider } from "@/hooks/Auth-provider";
import Footerpg from "./Footer.page";

function BaseLayout() {
  return (
    <AuthProvider>
      <div className="flex min-h-screen flex-col ">
        <Nav />
        <CategoryNav />
        <Outlet />
        <Footerpg />
      </div>
    </AuthProvider>
  );
}

export default BaseLayout;
