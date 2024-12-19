// src/hooks/useWishlistMutation.js
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../utils/fetcher";
import { toast } from "sonner";

export const useWishlistMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productId) =>
      api("/useractivities/togglewishlist", {
        method: "POST",
        body: JSON.stringify({ productId }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onError(e) {
      if (e?.response?._data?.error) {
        console.error("Error toggling wishlist:", e?.response?._data?.error);
      } else {
        toast.error("Failed to toggle wishlist");
      }
    },
    onSuccess(data) {
      if (data.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["wishlistlisting", "currentUser"]);
      }
    },
  });
};
