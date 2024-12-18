import React from "react";
import { IoRepeat } from "react-icons/io5";
import { TiHeartOutline } from "react-icons/ti";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/Auth-provider";
import { CircleUser } from "lucide-react";
import { useCurrentUser } from "@/store/slice/profileslice/profilefetcher";
import { useSelector } from "react-redux";
import {
  selectCurrentUser,
  selectUserLoading,
} from "@/store/slice/profileslice/profileselector";

function LogAndIcons() {
  const { myRole } = useAuth();
  //useCurrentUser(); // Just call the hook without destructuring

  //useCurrentUser(); // Add this if not already present
  const currentUser = useSelector(selectCurrentUser);

  console.log("currentUser from Redux:", currentUser);

  return (
    <div className="flex items-center space-x-4">
      <div className="hidden sm:block text-amber-400 text-xs sm:text-sm font-medium tracking-wide whitespace-nowrap">
        {myRole ? (
          <Link to={"profile"} className="cursor-pointer hover:text-amber-300">
            <div className="border py-2 px-4 rounded-md hover:border-amber-400">
              <CircleUser />
            </div>
          </Link>
        ) : (
          <Link
            to={"/auth/login"}
            className="cursor-pointer hover:text-amber-300 transition-colors"
          >
            LOGIN / REGISTER
          </Link>
        )}
      </div>
      <div className="flex gap-2 sm:gap-4">
        <div className="relative group">
          <div className="size-3 rounded-full bg-[#eaeaea] text-[10px] sm:text-xs flex text-green-700 justify-center items-center absolute left-3 sm:left-4 bottom-3 sm:bottom-4">
            0
          </div>
          <Link to={"wishlist"}>
            <TiHeartOutline
              size={20}
              className="sm:size-[25px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            />
          </Link>
        </div>
        <div className="relative group">
          <div className="size-3 rounded-full bg-[#eaeaea] text-[10px] sm:text-xs flex text-green-700 justify-center items-center absolute left-3 sm:left-4 bottom-3 sm:bottom-4">
            0
          </div>
          <Link to={"cart"}>
            <BsHandbag
              size={18}
              className="sm:size-[20px] text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LogAndIcons;
