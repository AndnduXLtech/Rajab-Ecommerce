import { queryHelper } from "@/hooks/base";

export const cartlisting = () => {
  return queryHelper("useractivities/getcart", ["cartlisting"]);
};

export const wishlistlisting = () => {
  return queryHelper("useractivities/getwishlist", ["wishlistlisting"]);
};
