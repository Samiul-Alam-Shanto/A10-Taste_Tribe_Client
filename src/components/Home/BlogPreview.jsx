import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    title: "5 Hidden Gems in Downtown That Locals Keep Secret",
    date: "Jan 02",
    readTime: "5 min",
    img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    type: "Guide",
  },
  {
    id: 2,
    title: "The Art of Food Photography",
    date: "Dec 28",
    readTime: "3 min",
    img: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500",
    type: "Tips",
  },
  {
    id: 3,
    title: "Why We Crave Spicy Food",
    date: "Dec 15",
    readTime: "4 min",
    img: "https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=500",
    type: "Science",
  },
];

const BlogPreview = () => {
  return (
    <section className="py-24 bg-base-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-16 border-b border-base-300 pb-6">
          <div>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">
              The Foodie Journal
            </span>
            <h2 className="text-5xl font-black text-secondary">Read Up.</h2>
          </div>
          <Link
            to="/blog"
            className="hidden md:flex items-center gap-2 text-secondary font-bold hover:text-primary transition-all text-lg group"
          >
            View All Stories{" "}
            <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LARGE FEATURE POST */}
          <motion.div
            whileHover={{ y: -5 }}
            className="group cursor-pointer h-full flex flex-col"
          >
            <div className="flex-1 overflow-hidden rounded-4xl relative mb-6">
              <div className="absolute top-6 left-6 bg-base-100/90 backdrop-blur px-4 py-2 rounded-xl font-bold text-secondary z-10 shadow-sm border border-base-200">
                {posts[0].date} •{" "}
                <span className="text-primary">{posts[0].type}</span>
              </div>
              <img
                src={posts[0].img}
                alt=""
                className="w-full h-[400px] lg:h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <h3 className="text-3xl md:text-4xl font-bold text-secondary group-hover:text-primary transition-colors leading-tight mb-3">
              {posts[0].title}
            </h3>
            <p className="flex items-center gap-2 text-base-content/60 font-medium">
              <FaClock /> {posts[0].readTime} read
            </p>
          </motion.div>

          {/* SIDE COLUMN */}
          <div className="flex flex-col gap-8">
            {posts.slice(1).map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ x: 5 }}
                className="group cursor-pointer flex gap-6 items-center"
              >
                <div className="w-1/3 overflow-hidden rounded-2xl h-32 relative">
                  <img
                    src={post.img}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="w-2/3">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider mb-1 block">
                    {post.type}
                  </span>
                  <h3 className="text-xl font-bold text-secondary leading-snug mb-2 group-hover:underline decoration-primary decoration-2 underline-offset-4">
                    {post.title}
                  </h3>
                  <p className="text-sm text-base-content/50">
                    {post.date} • {post.readTime}
                  </p>
                </div>
              </motion.div>
            ))}

            {/* Call to Action Box in Grid */}
            <div className="mt-auto bg-base-200 rounded-3xl p-8 text-center border-2 border-dashed border-base-300 hover:border-primary transition-colors cursor-pointer group">
              <h4 className="text-xl font-bold text-secondary mb-2">
                Have a story to tell?
              </h4>
              <p className="text-base-content/70 mb-4">Write for TasteTribe.</p>
              <span className="font-bold text-primary group-hover:translate-x-2 inline-block transition-transform">
                Submit Article →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
