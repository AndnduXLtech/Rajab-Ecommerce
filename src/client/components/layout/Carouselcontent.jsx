import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CarouselContent,
  CarouselPrevious,
  CarouselNext,
  CarouselItem,
  Carousel,
} from "@/components/ui/carousel";

const slides = [
  {
    title: "RAK BASIN AND SINK",
    image:
      "https://res.cloudinary.com/djmrroluc/image/upload/v1734607134/wxy885smbmcnlxt4whtj.jpg",
    cta: "Shop Now",
  },
  {
    title: "LUXURY SOAKING TUB",
    image:
      "https://res.cloudinary.com/djmrroluc/image/upload/v1734607134/eyqf3ov5gz3rdsbmktj8.jpg",
    cta: "Learn More",
  },
  {
    title: "MODERN FREESTANDING BATH",
    image:
      "https://res.cloudinary.com/djmrroluc/image/upload/v1734607135/tfe3cuikz3njhakhfede.jpg",
    cta: "View Details",
  },
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [api, setApi] = React.useState(null);

  // Update current index when slide changes
  React.useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Auto-slide functionality
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className=" w-[100%] h-[50vh]">
      <Card className="   ">
        <CardContent className="relative p-0">
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {slides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-[50vh] w-full">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="h-full w-full rounded-md object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent">
                      <div className="flex h-full flex-col justify-center space-y-4 p-8">
                        <h2 className="text-3xl font-bold text-white">
                          {slide.title}
                        </h2>
                        <Button
                          variant="default"
                          className="w-32 bg-yellow-400 text-black hover:bg-yellow-500"
                        >
                          {slide.cta}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
          </Carousel>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
            {slides.map((_, index) => (
              <Button
                key={index}
                variant={currentIndex === index ? "default" : "outline"}
                size="sm"
                className="h-2 w-2 rounded-full p-0"
                onClick={() => api?.scrollTo(index)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCarousel;
