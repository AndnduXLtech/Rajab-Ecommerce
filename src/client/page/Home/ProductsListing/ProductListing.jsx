import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Heart, Menu, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { PriceRangeSlider } from "./Price.range.slider";
import { fetchProducts } from "@/hooks/Product/Product.querry";
import LoaderSnippet from "@/components/LoaderSnippet";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const [priceRange, setPriceRange] = useState([90, 13800]);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const navigate = useNavigate();
  const { data, isLoading } = fetchProducts("", {});

  if (isLoading) {
    return <LoaderSnippet />;
  }
  console.log("products", data.products);
  const products = [
    {
      id: 1,
      name: "RAK VALET BATH TUB 170X75CM CAPPUCCINO (RAK SOLID MATERIAL)",
      category: "BATHROOM SUITS",
      brand: "RAK VALET BATH TUB",
      price: 404.0,
      discount: 16,
      image: "/api/placeholder/400/300",
    },
    {
      id: 2,
      name: "RAK VALET BATH TUB 170X75CM CAPPUCCINO (RAK SOLID MATERIAL)",
      category: "BATHROOM SUITS",
      brand: "RAK VALET BATH TUB",
      price: 404.0,
      discount: 16,
      image: "/api/placeholder/400/300",
    },
    {
      id: 3,
      name: "RAK VALET BATH TUB 170X75CM CAPPUCCINO (RAK SOLID MATERIAL)",
      category: "BATHROOM SUITS",
      brand: "RAK VALET BATH TUB",
      price: 404.0,
      discount: 16,
      image: "/api/placeholder/400/300",
    },
    {
      id: 4,
      name: "RAK VALET BATH TUB 170X75CM CAPPUCCINO (RAK SOLID MATERIAL)",
      category: "BATHROOM SUITS",
      brand: "RAK VALET BATH TUB",
      price: 404.0,
      discount: 16,
      image: "/api/placeholder/400/300",
    },
  ];

  const brands = [
    "RAK",
    "Espa",
    "GlobalWaterSolutions",
    "RR Global",
    "StuartTurner",
    "Teral",
  ];
  const colors = ["Black", "Blue", "Red", "White", "Green", "Yellow"];
  const materials = ["Ceramic", "Acrylic", "Fiberglass"];

  const handlePriceChange = (values) => {
    console.log("Price range changed:", values);
  };

  const FilterSection = () => (
    <>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">FILTER BY PRICE</h3>
          <PriceRangeSlider
            defaultValue={[90, 13800]}
            min={90}
            max={1000}
            onChange={handlePriceChange}
            className="mb-4"
          />
          <div className="text-sm text-gray-600">
            Price: AED {priceRange[0]} - AED {priceRange[1]}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">BRANDS</h3>
          <div className="space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center">
                <Checkbox
                  id={brand}
                  className="mr-2 appearance-none w-4 h-4 bg-gray-200 border border-gray-400 rounded-sm transform rotate-45"
                />
                <label htmlFor={brand} className="text-sm">
                  {brand}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">COLOURS</h3>
          <div className="space-y-2">
            {colors.map((color) => (
              <div key={color} className="flex items-center">
                <Checkbox
                  id={color}
                  className="mr-2 appearance-none w-4 h-4 bg-gray-200 border border-gray-400 rounded-sm transform rotate-45"
                />
                <label htmlFor={color} className="text-sm">
                  {color}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-4">MATERIALS</h3>
          <div className="space-y-2">
            {materials.map((material) => (
              <div key={material} className="flex items-center">
                <Checkbox
                  id={material}
                  className="mr-2 appearance-none w-4 h-4 bg-gray-200 border border-gray-400 rounded-sm transform rotate-45"
                />
                <label htmlFor={material} className="text-sm">
                  {material}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] overflow-y-auto"
          >
            <FilterSection />
          </SheetContent>
        </Sheet>
        <div className="flex-1 text-center">Show sidebar</div>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2"
          onClick={() => setIsSortOpen(!isSortOpen)}
        >
          <span>Most Popular</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Desktop Sidebar */}
        <div className="hidden md:block w-64 p-4">
          <FilterSection />
        </div>
        <div className="h-[100vh] w-px bg-green-500 my-5 mx-3 max-md:hidden" />
        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
              <span>Main Page</span>
              <span>›</span>
              <span>Categories</span>
              <span>›</span>
              <span>Bathroom Suits</span>
            </div>
            <h1 className="text-2xl font-bold text-green-900 mb-4">
              BATHROOM SUITS
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button variant="secondary" size="sm" className="rounded-full">
                #rak ✕
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                #suit ✕
              </Button>
              <Button variant="secondary" size="sm" className="rounded-full">
                #Water ✕
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.products?.map((product) => (
              <Card
                key={product._id}
                className="relative cursor-pointer"
                onClick={(e) => navigate(`view/${product?._id}`)}
              >
                {/* Log the product ID to ensure it's defined */}
                {console.log("Navigating to product ID:", product._id)}
                {/* Other card content */}
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={product?.images[0].url}
                      alt={product.name}
                      className="w-full aspect-[4/3] object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    >
                      <Heart className="w-5 h-5" />
                    </Button>
                    {product.discount && (
                      <div className="absolute bottom-2 right-2 bg-yellow-400 px-2 py-1 rounded text-sm">
                        -{product.discount}%
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-gray-600 uppercase">
                      {product.category}
                    </div>
                    <h3 className="text-sm font-medium mt-1">{product.name}</h3>
                    <div className="text-xs text-gray-600 mt-1">
                      {product.brand}
                    </div>
                    <div className="mt-2">
                      <div className="font-bold text-green-900">
                        AED {product.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
