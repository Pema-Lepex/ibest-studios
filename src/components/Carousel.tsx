import { SlideProps } from "@/types/CommonProps";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
interface Props {
  slides: SlideProps[];
}
const Carousel: React.FC<Props> = ({ slides = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  if (slides.length === 0) return null;

  // Preload the next slide for smoother transitions
  const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="w-full relative group">
      <div className="relative w-full overflow-hidden aspect-[16/10] xs:aspect-[16/9] md:aspect-[21/9] 3xl:aspect-[32/9]">
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide.img}
            alt={slide.title || `Slide ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            className={`
        object-cover
        transition-opacity duration-700 ease-in-out
        ${index === currentIndex ? "opacity-100" : "opacity-0"}
      `}
          />
        ))}

        {/* Hidden preload for the next slide */}
        <link
          rel="preload"
          as="image"
          href={
            typeof slides[nextIndex].img === "string"
              ? slides[nextIndex].img
              : slides[nextIndex].img.src
          }
        />
      </div>

      <button
        onClick={prevSlide}
        className="flex size-8 xs:size-10 text-lg xs:text-xl justify-center items-center absolute top-1/2 -translate-y-1/2 left-2 xs:left-5 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full md:hidden md:group-hover:flex"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="flex size-8 xs:size-10 text-lg xs:text-xl justify-center items-center absolute top-1/2 -translate-y-1/2 right-2 xs:right-5 text-white bg-black/30 hover:bg-black/50 p-2 rounded-full md:hidden md:group-hover:flex"
      >
        &#10095;
      </button>

      <div className="absolute flex justify-center py-2 z-10 bottom-0 w-full lg:gap-3 md:gap-2 gap-1">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer text-2xl xs:text-3xl md:text-4xl lg:text-5xl ${
              index === currentIndex ? "text-blue-500" : "text-gray-400"
            }`}
          >
            &bull;
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
