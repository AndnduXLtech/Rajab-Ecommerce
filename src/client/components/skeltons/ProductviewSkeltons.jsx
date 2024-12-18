import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProductPageSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="grid md:grid-cols-2 gap-8 animate-pulse">
        {/* Image Gallery Skeleton */}
        <CardContent className="space-y-4">
          <Skeleton className="w-full h-[500px] rounded-lg" />

          {/* Thumbnail Images Skeleton */}
          <div className="flex justify-center space-x-4">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-20 h-20 rounded-md" />
            ))}
          </div>
        </CardContent>

        {/* Product Details Skeleton */}
        <CardContent>
          <CardHeader className="px-0">
            {/* Product Name */}
            <Skeleton className="h-10 w-3/4 mb-4" />

            {/* Ratings and Stock */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-6 w-20" />
            </div>
          </CardHeader>

          <div className="space-y-6 mt-6">
            {/* Price */}
            <Skeleton className="h-8 w-1/3" />

            {/* Description */}
            <Skeleton className="h-20 w-full" />

            {/* Variants */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <div className="flex space-x-3">
                {[...Array(3)].map((_, index) => (
                  <Skeleton key={index} className="w-20 h-10 rounded-md" />
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-10 w-1/3" />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mt-6">
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-20" />
            </div>

            {/* Additional Product Info */}
            <div className="space-y-2">
              {[...Array(4)].map((_, index) => (
                <Skeleton key={index} className="h-4 w-1/2" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPageSkeleton;
