import React from "react";
import { Outlet } from "react-router-dom";

function Productlayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

export default Productlayout;
