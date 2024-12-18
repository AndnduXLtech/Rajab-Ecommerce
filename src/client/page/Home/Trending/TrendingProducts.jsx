import React, { useState } from "react";
import { Card } from "@/components/ui/card";

const TrendingProducts = () => {
  const cardData = [
    {
      title: "Top Offers",
      image:
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
      overlayText: {
        heading: "KLUDI",
        subheading: "RAK",
        description: "for bath in April 2020",
      },
    },
    {
      title: "Top-Selling Brands",
      image:
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
      overlayText: {
        heading: "KLUDI",
        subheading: "RAK",
        description: "for bath in April 2020",
      },
    },
    {
      title: "In Focus",
      image:
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
      overlayText: {
        heading: "KLUDI",
        subheading: "RAK",
        description: "for bath in April 2020",
      },
    },
    {
      title: "Top Selling Products",
      image:
        "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg",
      overlayText: {
        heading: "KLUDI",
        subheading: "RAK",
        description: "for bath in April 2020",
      },
    },
  ];

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="relative"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Card
            className={`overflow-hidden transition-all duration-300 ${
              hoveredIndex === index
                ? "border-4 border-yellow-400"
                : "border border-gray-200"
            }`}
          >
            {/* Card Header */}
            <div
              className={`p-3 transition-colors duration-300 ${
                hoveredIndex === index ? "bg-yellow-400" : "bg-gray-150"
              }`}
            >
              <h3
                className={`text-sm font-medium transition-colors duration-300 ${
                  hoveredIndex === index ? "text-white" : "text-black"
                }`}
              >
                {card.title}
              </h3>
            </div>

            {/* Card Image with Overlay */}
            <div
              className={`p-7 transition-colors duration-300 ${
                hoveredIndex === index ? "bg-yellow-400" : "bg-gray-150"
              }`}
            >
              <div className="relative aspect-square">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-lg"></div>
                {/* Text Overlay that appears on hover */}
                {hoveredIndex === index && (
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 rounded-lg">
                    <div className="text-center">
                      <h4 className="text-white text-xl font-bold mb-2">
                        {card.overlayText.heading}
                      </h4>
                      <p className="text-white text-sm">
                        {card.overlayText.subheading}
                      </p>
                      <p className="text-white text-xs mt-1">
                        {card.overlayText.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default TrendingProducts;
