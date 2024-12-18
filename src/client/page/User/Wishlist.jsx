import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2, ShoppingCart } from "lucide-react";
import { api } from "../utils/fetcher";

export default function Wishlist() {
  const queryClient = useQueryClient();

  const { data: wishlistItems = [] } = useQuery({
    queryKey: ["wishlist"],
    queryFn: () => api.get("/api/wishlist").then((res) => res.data),
  });

  const removeFromWishlist = useMutation({
    mutationFn: (itemId) => api.delete(`/api/wishlist/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist"]);
    },
  });

  const moveToCart = useMutation({
    mutationFn: (itemId) => api.post(`/api/cart/add/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist", "cart"]);
    },
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Wishlist</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow rounded-lg overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
              <p className="mt-1 text-gray-500">${item.price.toFixed(2)}</p>
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={() => moveToCart.mutate(item.id)}
                  className="flex-1 flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist.mutate(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {wishlistItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Your wishlist is empty</p>
        </div>
      )}
    </div>
  );
}
