import React from "react";
import { motion } from "framer-motion";
import {
  FaCrown,
  FaPepperHot,
  FaLeaf,
  FaHamburger,
  FaCoffee,
  FaMedal,
  FaStar,
} from "react-icons/fa";
import GeneralBtn from "../../components/Buttons/GeneralBtn";
import { Link } from "react-router";

// Mock Data with "Food Personalities"
const topThree = [
  {
    rank: 1,
    name: "Sarah Jenkins",
    title: "The Spice Hunter",
    points: 2840,
    img: "https://i.pravatar.cc/150?u=1",
    badge: <FaPepperHot />,
    bg: "bg-orange-100 text-orange-600",
  },
  {
    rank: 2,
    name: "Mike Chen",
    title: "Burger Connoisseur",
    points: 2400,
    img: "https://i.pravatar.cc/150?u=2",
    badge: <FaHamburger />,
    bg: "bg-red-100 text-red-600",
  },
  {
    rank: 3,
    name: "Jessica Low",
    title: "Vegan Warrior",
    points: 1960,
    img: "https://i.pravatar.cc/150?u=3",
    badge: <FaLeaf />,
    bg: "bg-green-100 text-green-600",
  },
];

const challengers = [
  {
    rank: 4,
    name: "Alex Rossi",
    title: "Coffee Snob",
    reviews: 85,
    img: "https://i.pravatar.cc/150?u=4",
    icon: <FaCoffee />,
  },
  {
    rank: 5,
    name: "Tom Ford",
    title: "Fine Dining",
    reviews: 62,
    img: "https://i.pravatar.cc/150?u=5",
    icon: <FaStar />,
  },
  {
    rank: 6,
    name: "Lisa Ray",
    title: "Dessert Lover",
    reviews: 58,
    img: "https://i.pravatar.cc/150?u=6",
    icon: <FaStar />,
  },
  {
    rank: 7,
    name: "John Doe",
    title: "Street Food",
    reviews: 45,
    img: "https://i.pravatar.cc/150?u=7",
    icon: <FaPepperHot />,
  },
  {
    rank: 8,
    name: "Jane Smith",
    title: "Sushi Fan",
    reviews: 42,
    img: "https://i.pravatar.cc/150?u=8",
    icon: <FaLeaf />,
  },
];

const Leaderboard = () => {
  return (
    <div className="bg-base-100 min-h-screen py-24 px-4 font-sans ">
      <title>Hall of Fame - TasteTribe</title>
      <div className="fixed inset-0 bg-texture opacity-20 pointer-events-none"></div>
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-24 relative z-10">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Community Rankings
          </span>
          <h1 className="text-6xl md:text-8xl font-black text-secondary tracking-tighter mt-2">
            Hall of{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Flame.
            </span>
          </h1>
          <p className="text-xl text-base-content/60 mt-4 max-w-2xl mx-auto">
            Celebrating the tastemakers who guide our cravings. Earn points by
            reviewing, sharing, and helping others eat better.
          </p>
        </div>

        {/* TOP 3 - THE ELITE CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end mb-24">
          {/* Rank 2 */}
          <div className="order-2 lg:order-1">
            <TopCard user={topThree[1]} delay={0.2} />
          </div>

          {/* Rank 1 (Center, Larger) */}
          <div className="order-1 lg:order-2 -mt-12 lg:-mt-20 z-10">
            <TopCard user={topThree[0]} delay={0} isWinner />
          </div>

          {/* Rank 3 */}
          <div className="order-3">
            <TopCard user={topThree[2]} delay={0.4} />
          </div>
        </div>

        {/* THE CHALLENGERS LIST */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-3xl font-black text-secondary mb-8 pl-6 border-l-8 border-accent/50 flex items-center gap-3">
            <FaMedal className="text-accent" /> Rising Stars
          </h3>

          <div className="grid gap-4">
            {challengers.map((user, i) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group bg-base-100 border border-base-300 p-4 sm:p-6 rounded-3xl flex items-center gap-4 sm:gap-8 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all cursor-pointer relative overflow-hidden"
              >
                {/* Rank Number Background */}
                <span className="absolute -left-2 -bottom-4 text-8xl font-black opacity-5 select-none font-outline-2 text-base-content">
                  {user.rank}
                </span>

                {/* Rank Badge */}
                <div className="relative z-10 w-12 h-12 shrink-0 flex items-center justify-center font-black text-xl text-base-content/40 bg-base-200 rounded-full group-hover:bg-primary group-hover:text-white transition-colors">
                  #{user.rank}
                </div>

                {/* Avatar */}
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-16 h-16 rounded-2xl object-cover shadow-md relative z-10"
                />

                {/* Info */}
                <div className="flex-1 relative z-10">
                  <h4 className="font-bold text-secondary text-lg sm:text-xl group-hover:text-primary transition-colors">
                    {user.name}
                  </h4>
                  <div className="flex items-center gap-2 text-sm font-medium text-base-content/60">
                    <span className="text-accent">{user.icon}</span>{" "}
                    {user.title}
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right relative z-10">
                  <p className="font-black text-secondary text-2xl">
                    {user.reviews}
                  </p>
                  <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-wider">
                    Reviews
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center bg-secondary text-secondary-content rounded-[3rem] p-12 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                Want to see your name here?
              </h2>
              <p className="mb-8 opacity-80">
                Start reviewing your favorite local spots and climb the ranks.
              </p>
              <Link to="/dashboard/add-review">
                <GeneralBtn>Write a Review</GeneralBtn>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component for Top 3 Cards
const TopCard = ({ user, delay, isWinner = false }) => (
  <motion.div
    initial={{ y: 50, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay }}
    className={`relative bg-base-100 rounded-[3rem] p-8 flex flex-col items-center text-center shadow-2xl border-4 ${
      isWinner ? "border-yellow-400 z-20 scale-105" : "border-base-200"
    }`}
  >
    {isWinner && (
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 px-6 py-2 rounded-full font-black uppercase tracking-widest shadow-lg flex items-center gap-2">
        <FaCrown /> Legend
      </div>
    )}

    <div className="relative mb-6">
      <div
        className={`w-32 h-32 rounded-full p-1 ${
          user.bg.split(" ")[0]
        } bg-opacity-20`}
      >
        <img
          src={user.img}
          alt={user.name}
          className="w-full h-full rounded-full object-cover border-4 border-base-100 shadow-lg"
        />
      </div>
      <div
        className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-full flex items-center justify-center text-lg shadow-md border-4 border-base-100 ${user.bg}`}
      >
        {user.badge}
      </div>
    </div>

    <h2 className="text-2xl font-black text-secondary mb-1">{user.name}</h2>
    <p className="text-sm font-bold opacity-60 uppercase tracking-wider mb-6">
      {user.title}
    </p>

    <div className="w-full bg-base-200 rounded-2xl py-4 px-2">
      <p className="text-3xl font-black text-primary">{user.points}</p>
      <p className="text-xs font-bold text-base-content/40 uppercase">
        Total Points
      </p>
    </div>
  </motion.div>
);

export default Leaderboard;
