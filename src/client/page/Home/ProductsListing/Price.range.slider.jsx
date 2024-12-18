import React, { useState, useEffect } from "react";
import { formatPrice } from "../../utils/Helper";

export function PriceRangeSlider({ min, max, onChange }) {
  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);

  useEffect(() => {
    setMinValue(min);
    setMaxValue(max);
  }, [min, max]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - 1);
    setMinValue(newMin);
    onChange?.({ min: newMin, max: maxValue });
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + 1);
    setMaxValue(newMax);
    onChange?.({ min: minValue, max: newMax });
  };

  const minPercentage = ((minValue - min) / (max - min)) * 100;
  const maxPercentage = ((maxValue - min) / (max - min)) * 100;

  return (
    <div className="w-full max-w-md mx-auto px-4">
      <div className="mb-8">
        <div className="flex justify-between mb-4">
          <div
            className={`text-sm font-medium ${
              isDraggingMin ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {formatPrice(minValue)}
          </div>
          <div
            className={`text-sm font-medium ${
              isDraggingMax ? "text-blue-600" : "text-gray-700"
            }`}
          >
            {formatPrice(maxValue)}
          </div>
        </div>

        <div className="relative h-2 mt-4">
          {/* Base track */}
          <div className="absolute w-full h-full bg-gray-200 rounded-full" />

          {/* Active track */}
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{
              left: `${minPercentage}%`,
              right: `${100 - maxPercentage}%`,
            }}
          />

          {/* Slider controls */}
          <div className="relative">
            {/* Minimum value slider */}
            <input
              type="range"
              min={min}
              max={max}
              value={minValue}
              onChange={handleMinChange}
              onMouseDown={() => setIsDraggingMin(true)}
              onMouseUp={() => setIsDraggingMin(false)}
              onTouchStart={() => setIsDraggingMin(true)}
              onTouchEnd={() => setIsDraggingMin(false)}
              className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[30] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-[30]"
              style={{ zIndex: 20 }}
            />

            {/* Maximum value slider */}
            <input
              type="range"
              min={min}
              max={max}
              value={maxValue}
              onChange={handleMaxChange}
              onMouseDown={() => setIsDraggingMax(true)}
              onMouseUp={() => setIsDraggingMax(false)}
              onTouchStart={() => setIsDraggingMax(true)}
              onTouchEnd={() => setIsDraggingMax(false)}
              className="absolute w-full pointer-events-none appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-blue-500 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-[30] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-blue-500 [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:relative [&::-moz-range-thumb]:z-[30]"
              style={{ zIndex: 20 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
