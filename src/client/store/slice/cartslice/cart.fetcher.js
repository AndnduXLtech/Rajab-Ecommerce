import { queryHelper } from "@/hooks/base";

export const cartlisting = () => {
  return queryHelper("useractivities/getcart", ["cartlisting"]);
};
