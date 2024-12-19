import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { api } from "../utils/fetcher";
import { wishlistlisting } from "@/store/slice/cartslice/cart.fetcher";
import { useWishlistMutation } from "../utils/wishlist.mutation";

export default function Wishlist() {
  const { data: wishlistData, loading } = wishlistlisting();
  if (loading) return <>loading....</>;

  const wishlistItems = wishlistData?.wishlist?.products || [];

  const queryClient = useQueryClient();
  const { mutate: toggleWishlist } = useWishlistMutation();
  const handleWishlistToggle = (productId) => {
    toggleWishlist(productId);
  };

  const moveToCart = useMutation({
    mutationFn: (itemId) => api.post(`/api/cart/add/${itemId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["wishlist", "cart"]);
    },
  });

  return (
    <div className="space-y-6 my-11">
      <h2 className="text-2xl font-bold ms-5 ">My Wishlist</h2>
      <div className="px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
        {wishlistItems.map((item) => (
          <div
            key={item.product._id}
            className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
          >
            {/* Product Image */}
            <div className="relative">
              <img
                src={item.product.images[0]?.url} // Access the first image
                alt={item.product.images[0]?.altText || item.product.name} // Use altText if available
                className="w-full h-64 object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Ensure this is the first line
                  console.log(
                    "Wishlist button clicked, event propagation stopped."
                  );
                  handleWishlistToggle(item?.product?._id);
                }}
                className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white"
              >
                <Heart className="w-5 h-5 text-red-500" />
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">{item.product.name}</h2>
              <p className="text-gray-600 text-sm mb-2">
                {item.product.description}
              </p>
              <p className="text-gray-500 mb-2">{item.product.category}</p>

              {/* Price Section */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold">
                    AED {item.product.price.toFixed(2)}
                  </span>
                  {item.product.discount && (
                    <span className="bg-yellow-300 text-sm px-2 py-1 rounded">
                      -{item.product.discount}%
                    </span>
                  )}
                </div>
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
