import React from "react";
import TrendingProducts from "./Trending/TrendingProducts";

import Rajablagacy from "./About_Rajab/Rajab.lagacy";
import BrandCarousel from "./brandCarosuel/Brands.page";

function LandingPage() {
  return (
    <>
      <div className="flex-row justify-center mx-4">
        <TrendingProducts />
        <BrandCarousel />
        <Rajablagacy />
      </div>

      {/*added rajab company legacy, refering web site https://primetechtrading.com/ also have the company legacy in home page*/}
      {/*added further you want here */}
    </>
  );
}

export default LandingPage;
