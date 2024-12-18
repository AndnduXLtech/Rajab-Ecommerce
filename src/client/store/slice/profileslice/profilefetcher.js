import React from "react";
import { queryHelper } from "../../../hooks/base";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "./Profile.slice";
//dispatch(setUser(data.user));
// export const useCurrentUser = () => {
//   const dispatch = useDispatch();
//   const { data, isLoading, error } = queryHelper("/user/profile", [
//     "currentUser",
//   ]);

//   React.useEffect(() => {
//     if (data && data.user) {
//       dispatch(setUser(data.user));
//     }
//   }, [data, dispatch]);

//   return { data, isLoading, error };
// };

export const useCurrentUser = () => {
  const dispatch = useDispatch();

  const { data, isLoading, error } = queryHelper(
    "/user/profile",
    ["currentUser"],
    {
      select: (response) => {
        if (response && response.user) {
          dispatch(setUser(response.user));
        }
        return response;
      },
    }
  );

  React.useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  return { data, isLoading, error };
};

export const useAddressList = () => {
  return queryHelper("user/getAddress", ["allAddress"]);
};

// export const useCurrentUser = () => {
//   const dispatch = useDispatch();

//   const { data, isLoading, error } = queryHelper(
//     "/user/profile",
//     ["currentUser"],
//     {
//       onSuccess: (response) => {
//         console.log("onSuccess triggered", response); // Debug log
//         if (response && response.user) {
//           console.log("Found user data", response.user); // Debug log
//           dispatch(setUser(response.user));
//         }
//       },
//       // Let's also add onError to see if there are any issues
//       onError: (error) => {
//         console.error("Query error:", error);
//       },
//       // Add staleTime and cacheTime to ensure data handling
//       staleTime: 0,
//       cacheTime: 0,
//     }
//   );

//   console.log("Current data:", data); // Debug log

//   return { data, isLoading, error };
// };
