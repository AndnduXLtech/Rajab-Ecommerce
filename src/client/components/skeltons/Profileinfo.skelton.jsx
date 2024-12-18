import { FilePenIcon, MapPin, ShoppingBag, ShoppingCart } from "lucide-react";

export const ProfileCardSkeleton = () => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden md:flex lg:flex animate-pulse">
      {/* Left Section Skeleton */}
      <div className="md:w-1/3 lg:w-1/4">
        <div className="relative p-6 bg-gradient-to-r from-gray-200 to-gray-300 h-full">
          {/* Profile Info Skeleton */}
          <div className="flex flex-col items-center space-y-4">
            <div className="text-center">
              <div className="h-8 w-32 bg-gray-300 rounded mb-2"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
          </div>

          {/* Stats Section Skeleton */}
          <div className="mt-8 space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gray-300 rounded"></div>
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Section Skeleton */}
      <div className="md:w-2/3 lg:w-3/4 p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Form Fields Skeleton */}
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>

          {/* Footer Section Skeleton */}
          <div className="pt-6 mt-6 border-t border-gray-200 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
