import React, { useState } from "react";
import { Heart, ShoppingCart, Minus, Plus, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useParams } from "react-router-dom";
import { fetchOneProduct } from "@/hooks/Product/Product.querry";
import ProductPageSkeleton from "@/components/skeltons/ProductviewSkeltons";
import { BsChatRightHeart, BsHeart } from "react-icons/bs";
import { useMutation } from "@tanstack/react-query";
import { mutationHelper } from "@/hooks/base";
import { toast } from "sonner";

const ProductPage = () => {
  const { id } = useParams();
  const { data: productResponse, loading } = fetchOneProduct(id);
  const product = productResponse?.product;
  const addCartMutation = mutationHelper("useractivities/addcart", "POST");
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );

  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    if (!selectedVariant?._id) return toast.error("Please select the Varient");

    addCartMutation.mutate(
      {
        productId: product._id,
        quantity,
        variantId: selectedVariant?._id,
      },
      {
        onSuccess: () => {
          console.log("Product added to cart successfully");
        },
        onError: (error) => {
          console.error("Error adding product to cart:", error);
        },
      }
    );
  };

  const handleAddToWishlist = () => {
    console.log("Added to wishlist:", product);
  };

  // Calculate discounted price
  const originalPrice = product.price;
  const discountedPrice = originalPrice * (1 - product.discount / 100);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery Section */}
        <CardContent className="space-y-4">
          <div className="relative overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage].url}
              alt={product.images[selectedImage].altText}
              className="w-full h-[500px] object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex justify-center space-x-4">
            {product.images.map((img, index) => (
              <img
                key={index}
                src={img.url}
                alt={img.altText}
                onClick={() => setSelectedImage(index)}
                className={`w-20 h-20 object-cover cursor-pointer rounded-md border-2 ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent hover:border-muted-foreground"
                }`}
              />
            ))}
          </div>
        </CardContent>

        {/* Product Details Section */}
        <CardContent>
          <CardHeader className="px-0">
            <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
            <div className="flex items-center space-x-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.ratings?.average || 0)
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  ({product.ratings?.average || 0}) •{" "}
                  {product.ratings?.count || 0} Reviews
                </span>
              </div>
              {product.stock > 0 ? (
                <Badge variant="default">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>
          </CardHeader>

          <div className="space-y-6 mt-6">
            <div className="flex items-center space-x-4">
              <p className="text-2xl font-semibold text-primary">
                ${discountedPrice.toFixed(2)}
              </p>
              {product.discount > 0 && (
                <p className="text-muted-foreground line-through">
                  ${originalPrice.toFixed(2)}
                </p>
              )}
              {product.discount > 0 && (
                <Badge variant="secondary">{product.discount}% OFF</Badge>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            {/* Variant Selection */}
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-2">
                <p className="font-medium">Variant:</p>
                <div className="flex space-x-3">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-2 rounded-md border-2 ${
                        selectedVariant?._id === variant._id
                          ? "border-primary ring-2 ring-primary/50"
                          : "border-gray-300"
                      }`}
                    >
                      {variant.color} - {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <p className="font-medium">Quantity:</p>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <Button
                className="flex-1 bg-custom-green"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="border border-custom-green"
                size="icon"
                onClick={handleAddToWishlist}
              >
                <Heart
                  className="h-5 w-5"
                  style={{
                    fill: "yellow",
                    stroke: "green",
                    strokeWidth: "2px",
                  }}
                />
              </Button>
            </div>

            {/* Additional Product Info */}
            <div className="text-sm text-muted-foreground mt-4">
              <p>Category: {product.category}</p>
              <p>Brand: {product.brand}</p>
              <p>SKU: {product.sku}</p>

              {/* Specifications */}
              {product.specifications && product.specifications.length > 0 && (
                <div className="mt-4">
                  <p className="font-medium">Specifications:</p>
                  <ul className="list-disc list-inside">
                    {product.specifications.map((spec) => (
                      <li key={spec._id}>
                        {spec.key}: {spec.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPage;
