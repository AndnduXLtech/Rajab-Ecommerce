import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cartlisting } from "@/store/slice/cartslice/cart.fetcher";
import { useApi } from "@/page/utils/fetcher";
import { toast } from "sonner";

const CartPage = () => {
  const { data, loading } = cartlisting();
  const queryClient = useQueryClient();
  const ofetch = useApi();

  const updateCartQuantityMutation = useMutation({
    mutationFn: async ({ productId, variantId, newQuantity }) => {
      console.log(productId, variantId, newQuantity);
      const response = await ofetch(
        `/useractivities/updatecart/${productId}/${variantId}`,
        {
          method: "PUT",
          body: JSON.stringify({ quantity: newQuantity }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cartlisting"]);
    },
    onError: (error) => {
      console.error("Error updating quantity:", error);
    },
  });

  const removeCartMutation = useMutation({
    mutationFn: async ({ productId, variantId }) => {
      const response = await ofetch(
        `/useractivities/removecart/${productId}/${variantId}`,
        { method: "DELETE" }
      );
      return response;
    },
    onSuccess: () => {
      toast.success("Item removed from cart");
      queryClient.invalidateQueries(["cartlisting"]);
    },
    onError: (error) => {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
    },
  });

  const handleQuantityChange = (productId, variantId, delta) => {
    console.log(productId, variantId, delta);
    const cartItems = data?.cart?.products || [];
    const item = cartItems.find(
      (item) => item.product._id === productId && item.variant._id === variantId
    );

    if (item) {
      console.log(item);
      const newQuantity = Math.max(1, item.quantity + delta);

      updateCartQuantityMutation.mutate({
        productId,
        variantId,
        newQuantity,
      });
    }
  };

  if (loading) return <>loading....</>;

  const cartItems = data?.cart?.products || [];

  const handleRemoveItem = (productId, variantId) => {
    removeCartMutation.mutate({ productId, variantId });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + (item.product?.price || 0) * item.quantity,
    0
  );

  return (
    <div className="p-6 md:p-8">
      <div className="flex flex-col md:flex-row justify-between gap-10">
        <div className="w-full md:w-3/4 mb-8 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">PRODUCT</h2>
          <ScrollArea className="max-h-[400px] overflow-y-auto rounded-md border p-4">
            {cartItems.map((item) => (
              <div
                key={`${item.product?._id}-${item.variant?._id}`}
                className="flex flex-col md:flex-row items-center border-b py-4"
              >
                <button
                  onClick={() =>
                    handleRemoveItem(item.product?._id, item.variant?._id)
                  }
                  className="text-red-500 mb-4 md:mb-0 md:mr-4"
                >
                  &times;
                </button>
                <img
                  src={
                    item.product?.images[0]?.url || "/path/to/default-image.jpg"
                  }
                  alt={item.product?.name || "Product Image"}
                  className="w-20 h-20 mb-4 md:mb-0 md:mr-4"
                />
                <div className="flex-grow mb-4 md:mb-0">
                  <h3 className="text-lg font-medium text-center md:text-left">
                    {item.product?.name || "Product Name"}
                  </h3>
                  <p className="text-sm text-gray-500 text-center md:text-left">
                    Variant: {item.variant?.color || "Default Variant"},
                    {item.variant?.size || "Default Variant"}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <span className="w-24 text-center md:text-left">
                    AED {item.product?.price?.toFixed(2) || "0.00"}
                  </span>
                  <div className="flex items-center mx-0 md:mx-4 mt-2 md:mt-0">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product?._id,
                          item.variant?._id,
                          -1
                        )
                      }
                      className="border px-2"
                    >
                      -
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.product?._id,
                          item.variant?._id,
                          1
                        )
                      }
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>
                  <span className="mt-2 md:mt-0">
                    AED{" "}
                    {(item.product?.price * item.quantity).toFixed(2) || "0.00"}
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>

          <div className="flex flex-col md:flex-row mt-4">
            <Input
              placeholder="Coupon code"
              className="w-full md:w-1/3 mb-2 md:mb-0 md:mr-2"
            />
            <Button className="bg-custom-green text-white">Apply Coupon</Button>
          </div>
        </div>

        <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg sticky top-0">
          <h2 className="text-2xl font-semibold mb-4">CART</h2>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span>SUBTOTAL</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b pb-2 mb-2">
            <span>Shipping</span>
            <span>Free Shipping</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>TOTAL</span>
            <span>AED {subtotal.toFixed(2)}</span>
          </div>
          <Button className="w-full mt-4 bg-custom-green text-white">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
