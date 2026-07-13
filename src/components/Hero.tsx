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
    <section className="bg-gradient-to-br from-primary to-primary-dark text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column – Text & CTAs */}
          <div className="space-y-8 text-center md:text-left animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight text-balance">
                Coffee, Books &
                <span className="text-accent"> Meaningful Moments</span>
              </h1>
              <p className="text-lg md:text-xl font-body text-white/80 max-w-xl mx-auto md:mx-0 leading-relaxed">
                Discover a luxurious sanctuary where exceptional coffee, curated books, and vibrant community converge. Join us for moments that matter.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
              <Link
                href="/menu"
                className="px-8 py-3.5 bg-accent text-primary font-body font-semibold rounded-lg hover:bg-accent/90 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 transform inline-block text-center"
              >
                Explore Menu
              </Link>
              <Link
                href="/events"
                className="px-8 py-3.5 border-2 border-accent text-accent font-body font-semibold rounded-lg hover:bg-accent/10 transition-all duration-200 inline-block text-center"
              >
                Upcoming Events
              </Link>
            </div>
          </div>

          {/* Right Column – Carousel */}
          <div className="w-full animate-fade-in">
            <div className="relative w-full aspect-square md:aspect-auto md:h-96 overflow-hidden rounded-2xl shadow-2xl">
              {images.map((img, index) => (
                <div key={index} className="absolute inset-0">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
                      index === current
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              ))}
            </div>
            
            {/* Dot Indicators */}
            <div className="flex justify-center mt-6 gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`rounded-full transition-all duration-300 ${
                    index === current 
                      ? "w-8 h-2 bg-accent shadow-md" 
                      : "w-2 h-2 bg-white/40 hover:bg-white/60"
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
