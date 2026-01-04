import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import GeneralBtn from "../Buttons/GeneralBtn";

const categories = [
  { name: "🍕 Pizza", size: "col-span-1" },
  { name: "🍔 Burgers", size: "col-span-2" },
  { name: "🍣 Sushi", size: "col-span-1" },
  { name: "🍰 Desserts", size: "col-span-2" },
  { name: "☕ Coffee", size: "col-span-1" },
  { name: "🌶️ Spicy", size: "col-span-1" },
  { name: "🌮 Tacos", size: "col-span-1" },
  { name: "🥗 Vegan", size: "col-span-2" },
];

const CravingsGrid = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-16">
        {/* Text Side */}
        <div className="w-full md:w-1/3">
          <h2 className="text-6xl font-black text-secondary leading-none mb-6">
            What's <br /> on your <br />{" "}
            <span className="text-gradient">Mind?</span>
          </h2>
          <p className="text-lg text-base-content/70 mb-8">
            From late-night munchies to fine dining dates, find exactly what
            your stomach is growling for.
          </p>
          <Link to="/all-reviews">
            <GeneralBtn>Explore All</GeneralBtn>
          </Link>
        </div>

        {/* Grid Side */}
        <div className="w-full md:w-2/3 grid grid-cols-4 gap-4 auto-rows-[80px]">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
              className={`${cat.size} bg-base-200 border-2 border-secondary/20 rounded-4xl flex items-center justify-center text-xl md:text-2xl font-bold text-secondary shadow-sm hover:shadow-[4px_4px_0px_0px_var(--color-primary)] transition-all cursor-pointer`}
            >
              <Link
                to="/all-reviews"
                className="w-full h-full flex items-center justify-center"
              >
                {cat.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CravingsGrid;
