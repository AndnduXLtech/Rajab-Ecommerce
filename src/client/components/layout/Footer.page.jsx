import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const Footerpg = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#004734] py-8 text-custom-yellow px-8 rounded shadow-md border">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col">
          <Link to={"/"} className="mb-4">
            <img src={Logo} alt="logo" className="w-24" />
          </Link>
          <p className="text-sm mb-4">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
          <hr className="border-white my-4" />
          <p className="text-sm">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
        </div>

        {/* Product Categories */}
        <div className="flex-row justify-center items-center md:ms-16">
          <h3 className="text-lg font-bold mb-4 text-white">
            PRODUCT CATEGORIES
          </h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                Water Heater
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Water Pumps
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Bathroom Accessories
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Bathroom Suites
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Kitchen Sink Mixers
              </a>
            </li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold mb-4 text-white">USEFUL LINKS</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Brands
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Terms and Conditions
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Shipping & Refund Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Catalog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Grid of Numbers */}
        <div>
          <span className=" mt-4 p-4 border rounded-full bg-white"></span>
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <div
                key={num}
                className="bg-white px-4 py-8 md:py-7 flex items-center justify-center text-white font-bold text-2xl"
              >
                {num}
              </div>
            ))}
          </div>
          <div className="mt-4 ">
            <Button className="bg-custom-yellow me-4 hover:bg-gray-300 duration-150 text-black">
              Load More
            </Button>
            <Button className="bg-custom-yellow hover:bg-gray-300 duration-150 text-black mt-2">
              Follow on Instagram
            </Button>
          </div>
        </div>
      </div>
      <hr className="bg-white my-4" />
      <p className="text-sm">
        {" "}
        Looking to take your team away on a retreat to enjoy awesome food and
        take in some sunshine.
      </p>
    </footer>
  );
};

export default Footerpg;
