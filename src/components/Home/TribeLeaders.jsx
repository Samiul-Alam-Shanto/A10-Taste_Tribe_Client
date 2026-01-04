import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaCrown, FaQuoteLeft } from "react-icons/fa";
import GeneralBtn from "../Buttons/GeneralBtn";

// Mock Data (In real app, fetch sorted by review count)
const leaders = [
  {
    name: "Mike Chen",
    reviews: 120,
    img: "https://i.pravatar.cc/150?u=2",
    rank: 2,
    quote: "Tacos are life.",
  },
  {
    name: "Sarah Jenkins",
    reviews: 145,
    img: "https://i.pravatar.cc/150?u=1",
    rank: 1,
    quote: "Spice hunter!",
  },
  {
    name: "Jessica Low",
    reviews: 98,
    img: "https://i.pravatar.cc/150?u=3",
    rank: 3,
    quote: "Sweet tooth.",
  },
];

const TribeLeaders = () => {
  return (
    <section className="py-24 bg-base-100   relative overflow-hidden">
      <div className="absolute inset-0 bg-texture opacity-20 pointer-events-none"></div>
      <div className="container mx-auto px-4">
        {/* Editorial Header */}
        <div className="text-center mb-20 relative z-10">
          <h2 className="text-5xl md:text-7xl font-black text-secondary mb-4 tracking-tighter">
            Hall of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600">
              Fame
            </span>
          </h2>
          <p className="text-xl text-base-content/70">
            The legends eating their way to the top.
          </p>
        </div>

        {/* The Podium Layout */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-8 mb-16 relative z-10">
          {leaders.map((leader) => {
            // Styling logic based on rank
            const isFirst = leader.rank === 1;
            const height = isFirst ? "h-[450px]" : "h-[380px]";
            const order = isFirst
              ? "order-1 md:order-2"
              : leader.rank === 2
              ? "order-2 md:order-1"
              : "order-3";
            const ringColor = isFirst
              ? "ring-yellow-400 shadow-[0_0_30px_rgba(250,204,21,0.4)]"
              : leader.rank === 2
              ? "ring-gray-300"
              : "ring-orange-400";

            return (
              <motion.div
                key={leader.rank}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: leader.rank * 0.2 }}
                className={`${order} ${height} w-full md:w-1/3 max-w-sm bg-base-100 border-2 border-base-300 rounded-[3rem] p-8 flex flex-col items-center justify-between shadow-2xl relative group hover:-translate-y-4 transition-transform duration-500`}
              >
                {isFirst && (
                  <FaCrown className="absolute -top-6 text-6xl text-yellow-400 drop-shadow-lg rotate-12 z-20" />
                )}

                <div className="text-center mt-4">
                  <div
                    className={`w-28 h-28 rounded-full ring-4 ${ringColor} p-1 mb-6 mx-auto overflow-hidden bg-base-100`}
                  >
                    <img
                      src={leader.img}
                      alt={leader.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-black text-secondary">
                    {leader.name}
                  </h3>
                  <p className="font-bold text-primary">
                    {leader.reviews} Reviews
                  </p>
                </div>

                <div className="bg-base-200 p-4 rounded-2xl w-full text-center relative">
                  <FaQuoteLeft className="absolute -top-3 left-4 text-2xl text-base-content/10" />
                  <p className="text-base-content/70 italic font-serif">
                    "{leader.quote}"
                  </p>
                </div>

                <div className="font-black text-9xl opacity-5 absolute bottom-0 select-none text-base-content font-outline-2">
                  {leader.rank}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center flex justify-center items-center">
          <Link to="/leaderboard">
            <GeneralBtn>View Full Leaderboard</GeneralBtn>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TribeLeaders;
