import React, { useState } from "react";
import {
  ChevronDownIcon,
  Heater,
  Droplets,
  ShowerHead,
  Bath,
  UtensilsCrossed,
  Wrench,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CarouselContent } from "../ui/carousel";
import ProductCarousel from "./Carouselcontent";
import TrendingProducts from "@/page/Home/Trending/TrendingProducts";
import { useNavigate } from "react-router-dom";

//import CartPage from "@/page/Client/cart/Cart.page";

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState("");

  const categories = [
    { name: "WATER HEATERS", icon: <Heater className="w-4 h-4" /> },
    { name: "WATER PUMPS", icon: <Droplets className="w-4 h-4" /> },
    { name: "BATHROOM ACCESSORIES", icon: <ShowerHead className="w-4 h-4" /> },
    { name: "BATHROOM SUITS", icon: <Bath className="w-4 h-4" /> },
    {
      name: "KITCHEN SINK MIXERS",
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
  ];

  const browseCategories = [
    { name: "BATHROOM MIXER", icon: <ShowerHead className="w-4 h-4" /> },
    { name: "BATHTUB", icon: <Bath className="w-4 h-4" /> },
    { name: "WASH BASIN", icon: <Droplets className="w-4 h-4" /> },
    { name: "MANHOLE COVER", icon: <Heater className="w-4 h-4" /> },
    { name: "KITCHEN SINK", icon: <UtensilsCrossed className="w-4 h-4" /> },
    { name: "POWER TOOLS", icon: <Wrench className="w-4 h-4" /> },
  ];

  const navigate = useNavigate(); // Add this hook

  // Function to handle category selection
  const handleCategorySelect = (categoryName) => {
    setActiveCategory(categoryName);
    // Navigate to products page with category as query parameter
    //navigate(`/products?category=${encodeURIComponent(categoryName)}`);
    navigate(`/products`);
  };

  return (
    <>
      <div className="w-full">
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                {activeCategory || "Select Category"}
                <ChevronDownIcon className="w-4 h-4 ml-2" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="w-full">
              <SheetHeader>
                <SheetTitle>Categories</SheetTitle>
              </SheetHeader>
              <div className="grid gap-2 py-4">
                {[...categories, ...browseCategories].map((category) => (
                  <Button
                    key={category.name}
                    variant="ghost"
                    className={`justify-start ${
                      activeCategory === category.name
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : ""
                    }`}
                    onClick={() => handleCategorySelect(category.name)} // Updated here
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center border-b border-gray-200">
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="px-4 w-64">
                  BROWSE CATEGORY
                  <ChevronDownIcon className="w-4 h-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 h-[50vh]">
                {browseCategories.map((category) => (
                  <DropdownMenuItem
                    key={category.name}
                    className={`${
                      activeCategory === category.name
                        ? "bg-yellow-400 hover:bg-yellow-500"
                        : ""
                    } w-full px-4 py-6 text-left text-sm hover:bg-gray-100 flex items-center justify-between border-b border-gray-100`}
                    onClick={() => handleCategorySelect(category.name)} // Updated here
                  >
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="h-6 w-px bg-green-500 my-auto" />
          <div className="flex flex-wrap">
            {categories.map((category) => (
              <React.Fragment key={category.name}>
                <Button
                  variant="ghost"
                  className={`flex items-center px-4 ${
                    activeCategory === category.name
                      ? "bg-yellow-400 hover:bg-yellow-500"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(category.name)} // Updated here
                >
                  {category.icon}
                  <span className="ml-2 hidden xl:inline">{category.name}</span>
                </Button>
                <div className="h-6 w-px bg-green-500 mx-1 my-auto" />
              </React.Fragment>
            ))}
          </div>
        </nav>
      </div>
      <ProductCarousel />
      <div className="w-[100%] h-3 bg-yellow-500"></div>
    </>
  );
};

export default CategoryNav;
