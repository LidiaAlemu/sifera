"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const images = [
  {
    src: "https://picsum.photos/800/600?random=1",
    alt: "Sifera interior seating",
  },
  {
    src: "https://picsum.photos/800/600?random=2",
    alt: "Coffee and pastries",
  },
  {
    src: "https://picsum.photos/800/600?random=3",
    alt: "Bookshelf and reading corner",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-olive text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Left Column – Text & CTAs */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight">
              Coffee, Books &<br />
              Meaningful Moments
            </h1>
            <p className="text-lg md:text-xl font-sans text-cream max-w-xl mx-auto md:mx-0">
              Enjoy great coffee, explore books, attend events and become part
              of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                href="/menu"
                className="px-8 py-3 bg-gold text-dark font-sans font-semibold rounded-lg hover:bg-gold-dark transition-colors shadow-md"
              >
                Order Now
              </Link>
              <Link
                href="/membership"
                className="px-8 py-3 border border-beige text-beige font-sans font-semibold rounded-lg hover:bg-beige hover:text-dark transition-colors"
              >
                Become a Member
              </Link>
            </div>
          </div>

          {/* Right Column – Carousel */}
          <div className="flex-1 w-full">
            <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl shadow-xl">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img.src}
                  alt={img.alt}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    index === current
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-8"
                  }`}
                />
              ))}
            </div>
            {/* Dot Indicators */}
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === current ? "bg-gold" : "bg-cream/50 hover:bg-cream"
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}