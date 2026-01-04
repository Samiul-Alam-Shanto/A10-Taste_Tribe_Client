import React from "react";
import { motion } from "framer-motion";
import { FaClock, FaTag } from "react-icons/fa";

const blogPosts = [
  {
    id: 1,
    title: "5 Hidden Gems in Downtown",
    category: "Guide",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    date: "Jan 2, 2025",
  },
  {
    id: 2,
    title: "The Art of Food Photography",
    category: "Tips",
    img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800",
    date: "Dec 28, 2024",
  },
  {
    id: 3,
    title: "Spicy Food: A Love Story",
    category: "Culture",
    img: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800",
    date: "Dec 15, 2024",
  },
  {
    id: 4,
    title: "Best Vegan Burgers",
    category: "Review",
    img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=800",
    date: "Nov 30, 2024",
  },
  {
    id: 5,
    title: "Coffee Brewing 101",
    category: "Tips",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
    date: "Nov 20, 2024",
  },
  {
    id: 6,
    title: "Street Food Tour",
    category: "Travel",
    img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
    date: "Nov 10, 2024",
  },
];

const Blog = () => {
  return (
    <div className="bg-base-100 min-h-screen py-24 px-4 font-sans">
      <title>Blog - TasteTribe</title>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            The Journal
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-secondary">
            Stories & <span className="text-gradient">Bites.</span>
          </h1>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="rounded-4xl overflow-hidden h-64 mb-6 relative">
                <div className="absolute top-4 left-4 bg-base-100/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-2 z-10">
                  <FaTag /> {post.category}
                </div>
                <img
                  src={post.img}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex items-center gap-3 text-sm text-base-content/50 mb-3 font-bold">
                <FaClock /> {post.date}
              </div>

              <h3 className="text-2xl font-bold text-secondary leading-tight group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Blog;
