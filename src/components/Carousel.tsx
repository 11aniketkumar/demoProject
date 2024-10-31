import React, { useEffect } from 'react';

interface Slide {
  heading: string;
  text: string;
  image: string;
}

interface CarouselProps {
  slides: Slide[];
  currentSlide: number;
  setCurrentSlide: (index: number) => void;
  autoRotate?: boolean;
  rotationInterval?: number;
}

export function Carousel({
  slides,
  currentSlide,
  setCurrentSlide,
  autoRotate = true,
  rotationInterval = 5000
}: CarouselProps) {
  useEffect(() => {
    if (autoRotate) {
      const timer = setInterval(() => {
        setCurrentSlide((currentSlide + 1) % slides.length);
      }, rotationInterval);
      return () => clearInterval(timer);
    }
  }, [currentSlide, slides.length, autoRotate, rotationInterval, setCurrentSlide]);

  return (
    <div className="h-full bg-gray-900 relative overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 bg-black opacity-50" />
          <img
            src={slide.image}
            alt={slide.heading}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{slide.heading}</h2>
            <p className="text-lg max-w-md">{slide.text}</p>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}