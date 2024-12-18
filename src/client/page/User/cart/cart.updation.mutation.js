import { useApi } from "@/page/utils/fetcher";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export const useUpdateCartQuantity = () => {
  const ofetch = useApi(); // This is now called inside the hook
  const queryClient = useQueryClient();

  const mutateCartQuantity = useCallback(
    (productId, variantId, newQuantity) => {
      return ofetch(`/useractivities/updatecart/${productId}/${variantId}`, {
        method: "PUT",
        body: JSON.stringify({ quantity: newQuantity }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
    [ofetch]
  );

  const mutation = useMutation(
    ({ productId, variantId, newQuantity }) =>
      mutateCartQuantity(productId, variantId, newQuantity),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["cartlisting"]);
      },
      onError: (error) => {
        console.error("Error updating quantity:", error);
      },
    }
  );

  return mutation;
};
