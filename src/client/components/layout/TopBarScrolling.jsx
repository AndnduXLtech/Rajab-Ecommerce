import React, { useEffect, useRef } from "react";

function TopBarScrolling() {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const textWidth = textRef.current.scrollWidth;
    const containerWidth = textRef.current.offsetWidth;
    const scrollAmount = textWidth;

    const animateScroll = () => {
      if (!textRef.current) return;
      textRef.current.style.transition = `transform ${
        scrollAmount / 80
      }s linear`;
      textRef.current.style.transform = `translateX(-${scrollAmount}px)`;
    };

    const resetScroll = () => {
      if (!textRef.current) return;
      textRef.current.style.transition = "none";
      textRef.current.style.transform = "translateX(100%)";
      setTimeout(animateScroll, 50);
    };

    const handleAnimationEnd = () => {
      resetScroll();
    };

    const element = textRef.current;
    element.addEventListener("transitionend", handleAnimationEnd);

    animateScroll();

    return () => {
      if (element) {
        element.removeEventListener("transitionend", handleAnimationEnd);
      }
    };
  }, []);

  return (
    <div
      className="overflow-hidden whitespace-nowrap bg-custom-yellow text-green p-1 font-medium text-xs"
      style={{ width: "100%" }}
    >
      <div ref={textRef} className="inline-block">
        Free Delivery on Order above AED 200 &nbsp; | &nbsp;Delivering Across
        UAE &nbsp; &nbsp; Delivery on Order above AED 200 &nbsp; | &nbsp;
        Delivering Across UAE &nbsp; &nbsp; Delivery on Order above AED 200
        &nbsp; &nbsp; | &nbsp; &nbsp; Delivering Across UAE
      </div>
    </div>
  );
}

export default TopBarScrolling;
