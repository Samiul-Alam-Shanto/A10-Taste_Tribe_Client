import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaClipboardList, FaHeart, FaUtensils, FaClock } from "react-icons/fa";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import UniversalSpinner from "../../../components/LoadingAnimations/UniversalSpinner";

// Theme-safe chart colors
const COLORS = ["#d96c4e", "#fbbf24", "#4a2c2a", "#9ca3af", "#d1d5db"];

const UserHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Time-based greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  const { data: stats, isLoading } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <UniversalSpinner />;

  return (
    <div className="space-y-8">
      {/* 1. HERO CARD: Concierge Vibe */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-secondary text-secondary-content rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/food.png')]"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <p className="text-accent font-bold uppercase tracking-widest text-sm mb-2">
              {greeting}, {user?.displayName?.split(" ")[0]}
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Ready to taste <br /> something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                new?
              </span>
            </h1>
          </div>
          <Link
            to="/dashboard/add-review"
            className="btn btn-primary rounded-full px-8 shadow-lg border-none text-white"
          >
            Write a Review
          </Link>
        </div>
      </motion.div>

      {/* 2. STATS GRID: Floating Glass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Review Count */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 flex items-center justify-between group hover:border-primary/30 transition-colors"
        >
          <div>
            <p className="text-sm font-bold text-base-content/50 uppercase tracking-wider">
              Contributions
            </p>
            <h3 className="text-4xl font-black text-secondary mt-1">
              {stats?.reviewCount || 0}
            </h3>
          </div>
          <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            <FaClipboardList />
          </div>
        </motion.div>

        {/* Favorites */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 flex items-center justify-between group hover:border-red-400/30 transition-colors"
        >
          <div>
            <p className="text-sm font-bold text-base-content/50 uppercase tracking-wider">
              Collection
            </p>
            <h3 className="text-4xl font-black text-secondary mt-1">
              {stats?.favoriteCount || 0}
            </h3>
          </div>
          <div className="w-14 h-14 bg-red-100 text-red-500 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            <FaHeart />
          </div>
        </motion.div>

        {/* Impact Score (Fake calc for fun) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 flex items-center justify-between group hover:border-accent/30 transition-colors"
        >
          <div>
            <p className="text-sm font-bold text-base-content/50 uppercase tracking-wider">
              Tribe Level
            </p>
            <h3 className="text-4xl font-black text-secondary mt-1">
              {stats?.reviewCount * 10 + stats?.favoriteCount * 5}
            </h3>
          </div>
          <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            <FaUtensils />
          </div>
        </motion.div>
      </div>

      {/* 3. CHART & ACTIVITY SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Rating Breakdown (Donut Chart) */}
        <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-200">
          <h3 className="text-xl font-bold text-secondary mb-6">
            Taste Profile
          </h3>
          <div className="h-64 relative">
            {stats?.userRatingDistribution?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.userRatingDistribution}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {stats.userRatingDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke="none"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    }}
                    itemStyle={{ color: "#4a2c2a", fontWeight: "bold" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-base-content/40 font-medium">No data yet.</p>
                <Link
                  to="/dashboard/add-review"
                  className="text-primary font-bold text-sm mt-2 hover:underline"
                >
                  Start Reviewing
                </Link>
              </div>
            )}
            {/* Center Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-sm font-bold text-base-content/30 uppercase">
                Ratings
              </span>
            </div>
          </div>
        </div>

        {/* Recent Activity List */}
        <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-secondary">Recent Bites</h3>
            <Link
              to="/dashboard/my-reviews"
              className="text-xs font-bold text-primary uppercase tracking-widest hover:underline"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {stats?.recentReviews?.length > 0 ? (
              stats.recentReviews.map((review) => (
                <div
                  key={review._id}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-base-200 transition-colors cursor-pointer group"
                >
                  <img
                    src={review.foodImage}
                    alt="food"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-secondary truncate">
                      {review.foodName}
                    </h4>
                    <p className="text-xs text-base-content/60 truncate">
                      {review.restaurantName}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="badge badge-sm badge-ghost font-bold text-primary gap-1">
                      {review.rating} <span className="text-[10px]">★</span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-base-content/50 italic text-sm">
                No recent activity found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
