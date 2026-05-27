"use client";

import { useEffect, useRef } from "react";
import { brands } from "@/lib/data";

export default function Brands() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    const content = contentRef.current;
    if (!slider || !content) return;

    const autoScrollSpeed = 0.5;
    let currentTranslate = 0;
    let isDown = false;
    let isHovered = false;
    let startX = 0;
    let scrollLeft = 0;
    let animationId = 0;

    // content holds two identical brand rows -> loop on half its width
    const brandWidth = content.scrollWidth / 2;

    const step = () => {
      if (!isDown && !isHovered) {
        currentTranslate -= autoScrollSpeed;
        if (Math.abs(currentTranslate) >= brandWidth) {
          currentTranslate = 0;
        }
        content.style.transform = `translateX(${currentTranslate}px)`;
      }
      animationId = requestAnimationFrame(step);
    };
    animationId = requestAnimationFrame(step);

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = currentTranslate;
    };
    const onMouseLeave = () => {
      isDown = false;
      isHovered = false;
    };
    const onMouseEnter = () => {
      isHovered = true;
    };
    const onMouseUp = () => {
      isDown = false;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      currentTranslate = scrollLeft + walk;
      if (currentTranslate > 0) currentTranslate = -brandWidth;
      if (Math.abs(currentTranslate) > brandWidth) currentTranslate = 0;
      content.style.transform = `translateX(${currentTranslate}px)`;
    };

    const onTouchStart = (e: TouchEvent) => {
      isDown = true;
      isHovered = true;
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = currentTranslate;
    };
    const onTouchEnd = () => {
      isDown = false;
      isHovered = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      currentTranslate = scrollLeft + walk;
      if (currentTranslate > 0) currentTranslate = -brandWidth;
      if (Math.abs(currentTranslate) > brandWidth) currentTranslate = 0;
      content.style.transform = `translateX(${currentTranslate}px)`;
    };

    slider.addEventListener("mousedown", onMouseDown);
    slider.addEventListener("mouseleave", onMouseLeave);
    slider.addEventListener("mouseenter", onMouseEnter);
    slider.addEventListener("mouseup", onMouseUp);
    slider.addEventListener("mousemove", onMouseMove);
    slider.addEventListener("touchstart", onTouchStart);
    slider.addEventListener("touchend", onTouchEnd);
    slider.addEventListener("touchmove", onTouchMove);

    return () => {
      cancelAnimationFrame(animationId);
      slider.removeEventListener("mousedown", onMouseDown);
      slider.removeEventListener("mouseleave", onMouseLeave);
      slider.removeEventListener("mouseenter", onMouseEnter);
      slider.removeEventListener("mouseup", onMouseUp);
      slider.removeEventListener("mousemove", onMouseMove);
      slider.removeEventListener("touchstart", onTouchStart);
      slider.removeEventListener("touchend", onTouchEnd);
      slider.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  return (
    <section
      id="brands"
      className="py-section-gap px-margin-mobile lg:px-margin-desktop max-w-container-max mx-auto overflow-hidden"
    >
      <div className="text-center mb-16">
        <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-gradient mb-4">
          Our Brands
        </h2>
      </div>

      <div ref={sliderRef} className="marquee-container mb-12">
        <div ref={contentRef} className="marquee-content">
          {/* two identical rows enable a seamless infinite loop */}
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="marquee-item grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
            >
              {brands.map((brand) => (
                <div
                  key={`${copy}-${brand.name}`}
                  className={`font-display-lg text-display-lg ${brand.colorClass} font-bold`}
                >
                  {brand.name}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button
          type="button"
          className="primary-button text-white font-label-md text-label-md px-10 py-4 rounded-xl"
        >
          Start Earning With Our Brands
        </button>
      </div>
    </section>
  );
}
