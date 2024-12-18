import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { User, MapPin, Heart, ShoppingBag, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/Auth-provider";

export default function ProfileLayout() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const navLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
      isActive ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
    }`;

  const handleLogout = () => {
    logout();
    //navigate("/login");
  };

  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
      <hr className="border-green-700 mb-4 w-64 max-md:w-full" />
      <div className="flex flex-col md:flex-row gap-8 min-h-[calc(100vh-280px)]">
        {/* Sidebar Navigation */}
        <aside className="md:w-64 flex-shrink-0 flex flex-col">
          <nav className="space-y-2 flex-grow">
            <NavLink to="/profile" end className={navLinkClass}>
              <User className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/profile/info" end className={navLinkClass}>
              <User className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
            <NavLink to="/profile/addresses" className={navLinkClass}>
              <MapPin className="w-5 h-5" />
              <span>Addresses</span>
            </NavLink>
            <NavLink to="/profile/orders" className={navLinkClass}>
              <ShoppingBag className="w-5 h-5" />
              <span>Orders</span>
            </NavLink>
            <NavLink to="/profile/wishlist" className={navLinkClass}>
              <Heart className="w-5 h-5" />
              <span>Wishlist</span>
            </NavLink>
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-3 rounded-lg 
              text-gray-600 hover:bg-red-50 hover:text-red-600 
              transition-colors mt-4 border border-transparent 
              hover:border-red-200"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </aside>

        {/* Vertical Divider */}
        <div className="border-l border-green-700"></div>

        {/* Main Content Area with Reduced Height */}
        <main className="flex-1 min-h-[400px] overflow-y-auto">
          <div className="h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
