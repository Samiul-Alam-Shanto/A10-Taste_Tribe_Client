import React from "react";
import { FaStar } from "react-icons/fa";

const restaurants = [
  "Tony's Pizza",
  "Sushi Zen",
  "The Burger Joint",
  "Taco Fiesta",
  "Pasta House",
  "Curry Corner",
  "Sweet Treats",
  "Coffee Lab",
  "Dim Sum Daily",
  "BBQ King",
  "Ramen Lord",
  "Steakhouse 88",
  "Vegan Vibes",
  "Donut Dreams",
];

const TrendingMarquee = () => {
  return (
    <div className="bg-secondary py-6 overflow-hidden relative border-y-4 border-accent">
      {/* Rotated Badge - Hidden on mobile */}
      <div className="absolute left-0 z-20 bg-accent text-secondary px-6 py-2 font-black text-xl uppercase tracking-wider shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] rotate-2 top-1/2 -translate-y-1/2 hidden md:block">
        Trending Now
      </div>

      {/* Marquee Track */}
      <div className="animate-marquee flex items-center gap-12 pl-40">
        {[...restaurants, ...restaurants].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 group cursor-pointer"
          >
            {/* Text adapts: Secondary-Content (Light in Dark mode, Cream in Light mode - assuming Secondary is dark brown in Light Mode) */}
            <span className="text-secondary-content text-4xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors stroke-text">
              {item}
            </span>
            <FaStar className="text-accent text-xl animate-spin-slow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingMarquee;
