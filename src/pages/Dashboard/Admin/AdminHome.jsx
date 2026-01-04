// src/pages/Dashboard/Admin/AdminHome.jsx

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaClipboardList, FaHeart } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { Fade } from "react-awesome-reveal";

import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import UniversalSpinner from "../../../components/LoadingAnimations/UniversalSpinner";

const COLORS = ["#D96C4E", "#FBBF24", "#4A2C2A", "#8b5e56", "#a51b5c"]; // Your theme colors

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  if (isLoading) return <UniversalSpinner />;

  return (
    <div>
      <Fade direction="down" triggerOnce>
        <h1 className="text-4xl font-bold text-secondary mb-8">
          Admin Dashboard
        </h1>
      </Fade>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Fade cascade damping={0.1} direction="up" triggerOnce>
          <div className="card bg-base-100 shadow-lg p-6 flex-row items-center gap-4">
            <div className="text-primary">
              <FaUsers size={40} />
            </div>
            <div>
              <p className="text-lg">Total Users</p>
              <h2 className="text-3xl font-bold">{stats?.userCount || 0}</h2>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6 flex-row items-center gap-4">
            <div className="text-secondary">
              <FaClipboardList size={40} />
            </div>
            <div>
              <p className="text-lg">Total Reviews</p>
              <h2 className="text-3xl font-bold">{stats?.reviewCount || 0}</h2>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg p-6 flex-row items-center gap-4">
            <div className="text-accent">
              <FaHeart size={40} />
            </div>
            <div>
              <p className="text-lg">Total Favorites</p>
              <h2 className="text-3xl font-bold">
                {stats?.favoriteCount || 0}
              </h2>
            </div>
          </div>
        </Fade>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Bar Chart - Main Chart */}
        <div className="lg:col-span-3 card bg-base-100 shadow-lg p-6">
          <h3 className="text-xl font-bold text-secondary mb-4">
            Monthly Review Growth
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats?.monthlyReviews}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Reviews" fill="#D96C4E" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="lg:col-span-2 card bg-base-100 shadow-lg p-6">
          <h3 className="text-xl font-bold text-secondary mb-4">
            Review Rating Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats?.ratingDistribution}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {stats?.ratingDistribution?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
