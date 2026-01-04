import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkerAlt,
  FaHeart,
  FaRegHeart,
  FaStore,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import GeneralBtn from "./Buttons/GeneralBtn";
import useAxiosSecure from "../hooks/Axios/useAxiosSecure";

const ReviewCard = ({ singleReview }) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    _id,
    foodImage,
    foodName,
    restaurantName,
    location,
    rating,
    reviewerName,
    reviewerPhoto,
  } = singleReview;

  // Favorite Logic
  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Please login first");
      const favData = { ...singleReview, userEmail: user.email, reviewId: _id };
      delete favData._id;
      return axiosSecure.post("/favorite-reviews", favData);
    },
    onSuccess: () => toast.success("Saved to favorites!"),
    onError: (err) =>
      toast.error(
        err.response?.status === 409 ? "Already in favorites" : "Login required"
      ),
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-base-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl border border-base-200 transition-all duration-300 h-full flex flex-col"
    >
      {/* 1. Image Area */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={foodImage}
          alt={foodName}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Overlay Gradient (for text readability if needed, currently clean) */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Favorite Button (Floating) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            mutate();
          }}
          className="absolute top-3 right-3 w-10 h-10 bg-base-100/80 backdrop-blur-md rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-md z-10"
        >
          <FaRegHeart />
        </button>

        {/* Rating Badge (Floating) */}
        <div className="absolute bottom-3 left-3 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm text-xs font-bold text-secondary">
          <FaStar className="text-accent" /> {rating}/5
        </div>
      </div>

      {/* 2. Content Area */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header Info */}
        <div className="mb-3">
          <h3
            className="text-lg font-black text-secondary line-clamp-1 group-hover:text-primary transition-colors"
            title={foodName}
          >
            {foodName}
          </h3>
          <p className="text-xs font-bold text-base-content/50 uppercase tracking-wider mt-1 flex items-center gap-1 line-clamp-1">
            <FaStore className="text-accent" /> {restaurantName}
          </p>
        </div>

        {/* Location & Meta */}
        <div className="flex items-center gap-2 text-sm text-base-content/70 mb-4">
          <FaMapMarkerAlt className="text-primary flex-shrink-0" />
          <span className="truncate">{location}</span>
        </div>

        {/* Spacer to push footer down */}
        <div className="mt-auto"></div>

        {/* Divider */}
        <div className="h-px bg-base-200 my-4"></div>

        {/* 3. Footer: Avatar + General Btn */}
        <div className="flex items-center justify-between gap-3">
          {/* User Info */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={reviewerPhoto}
              alt={reviewerName}
              className="w-8 h-8 rounded-full border border-base-300 flex-shrink-0"
            />
            <span className="text-xs font-bold text-secondary truncate">
              {reviewerName?.split(" ")[0]}
            </span>
          </div>

          {/* The General Button (Compact Wrapper) */}
          <div className="scale-90 origin-right">
            <Link to={`/review-details/${_id}`}>
              <GeneralBtn>View</GeneralBtn>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ReviewCard;
