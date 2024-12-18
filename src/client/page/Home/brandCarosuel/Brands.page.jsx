import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const brands = [
  {
    name: "Acme Corp",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format",
    color: "bg-blue-50 hover:bg-blue-100",
    badge: "Featured",
  },
  {
    name: "Global Tech",
    logo: "https://images.unsplash.com/photo-1599305446868-59e861c19d68?w=200&h=100&fit=crop&auto=format",
    color: "bg-purple-50 hover:bg-purple-100",
    badge: "Partner",
  },
  {
    name: "Eco Solutions",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format",
    color: "bg-green-50 hover:bg-green-100",
    badge: "Verified",
  },
  {
    name: "Future Industries",
    logo: "https://images.unsplash.com/photo-1599305446868-59e861c19d68?w=200&h=100&fit=crop&auto=format",
    color: "bg-orange-50 hover:bg-orange-100",
    badge: "Enterprise",
  },
  {
    name: "Innovation Labs",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop&auto=format",
    color: "bg-pink-50 hover:bg-pink-100",
    badge: "Premium",
  },
];

export function BrandCarousel() {
  const [api, setApi] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="w-full py-12 bg-gradient-to-b from-white to-gray-50 flex justify-center items-center">
      <div className="container px-4 md:px-6 max-w-screen-xl mx-auto">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tighter">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Join thousands of companies that trust our platform
          </p>
        </div>
        <div className="relative w-full">
          <Carousel
            setApi={setApi}
            opts={{
              align: "center", // Changed from "start" to "center"
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
            onSelect={(index) => setCurrentIndex(index)}
          >
            <CarouselContent className="flex justify-center -ml-2 md:-ml-4">
              {[...brands, ...brands].map((brand, index) => (
                <CarouselItem
                  key={index}
                  className="pl-2 md:pl-4 basis-full md:basis-1/3 lg:basis-1/5 transition-opacity duration-300"
                >
                  <Card
                    className={cn(
                      "group relative overflow-hidden transition-all duration-300 ease-in-out transform hover:-translate-y-1",
                      brand.color,
                      "border-0 shadow-sm hover:shadow-xl"
                    )}
                  >
                    <div className="absolute top-2 right-2 z-10">
                      <Badge
                        variant="secondary"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {brand.badge}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <div className="aspect-[2/1] relative rounded-lg overflow-hidden bg-white">
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                        />
                      </div>
                      <div className="mt-4 space-y-2">
                        <h3 className="text-sm font-semibold text-center text-gray-900 group-hover:text-gray-700">
                          {brand.name}
                        </h3>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 hover:bg-primary hover:text-primary-foreground transition-colors" />
            <CarouselNext className="hidden md:flex -right-4 hover:bg-primary hover:text-primary-foreground transition-colors" />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
