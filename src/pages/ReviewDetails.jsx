import React from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import { motion } from "framer-motion";
import {
  FaStar,
  FaMapMarkerAlt,
  FaStore,
  FaArrowLeft,
  FaQuoteLeft,
} from "react-icons/fa";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import ComponentError from "./Errors/ComponentError";
import GeneralBtn from "../components/Buttons/GeneralBtn";

const ReviewDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["review_details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <UniversalSpinner />;
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <div className="bg-base-100 min-h-screen pb-20 font-sans">
      <title>{data.foodName} - TasteTribe</title>

      {/* HERO SECTION - Full Width Image */}
      <div className="relative h-[65vh] w-full bg-gray-900">
        <img
          src={data.foodImage}
          alt={data.foodName}
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent"></div>

        {/* HERO TEXT CONTENT */}
        {/* FIXED: Added pb-24/pb-32 to push text UP, so the card below doesn't cover it */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 pb-24 md:pb-32 z-10 container mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="bg-accent text-secondary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider mb-4 inline-block shadow-lg">
              Verified Review
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 drop-shadow-lg max-w-4xl">
              {data.foodName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-white/90 text-sm md:text-lg font-medium">
              <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">
                <FaStore className="text-primary" /> {data.restaurantName}
              </span>
              <span className="flex items-center gap-2 bg-black/30 px-3 py-1 rounded-full backdrop-blur-md">
                <FaMapMarkerAlt className="text-primary" /> {data.location}
              </span>
              <span className="flex items-center gap-2 text-yellow-400 font-bold text-xl md:text-2xl">
                <FaStar /> {data.rating}/5
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CONTENT OVERLAP SECTION */}
      {/* FIXED: Reduced negative margin on mobile (-mt-10) vs desktop (-mt-20) */}
      <div className="container mx-auto px-4 -mt-10 md:-mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Card */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-base-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-base-200 flex-1"
          >
            <FaQuoteLeft className="text-5xl md:text-6xl text-base-content/10 mb-6" />
            <p className="text-lg md:text-2xl text-base-content/80 leading-relaxed font-serif italic">
              "{data.reviewText}"
            </p>

            <div className="divider my-8 md:my-12"></div>

            {/* Reviewer Info */}
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={data.reviewerPhoto} alt={data.reviewerName} />
                  </div>
                </div>
                <div>
                  <p className="text-xs md:text-sm text-base-content/60 uppercase tracking-widest font-bold">
                    Reviewed By
                  </p>
                  <p className="text-lg md:text-xl font-black text-secondary">
                    {data.reviewerName}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-base-content/40 uppercase tracking-wider">
                  Date Posted
                </p>
                <p className="text-sm md:text-base font-bold text-secondary">
                  {new Date(data.postedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sidebar / Actions */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:w-1/3 space-y-6"
          >
            <div className="bg-secondary text-secondary-content p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
              <h3 className="text-2xl font-bold mb-4 relative z-10">
                Hungry for more?
              </h3>
              <p className="mb-8 opacity-80 relative z-10">
                Browse thousands of other reviews to find your next meal.
              </p>
              <div className="relative z-10">
                <Link to="/all-reviews">
                  <GeneralBtn>Browse Feed</GeneralBtn>
                </Link>
              </div>
            </div>

            <Link
              to="/all-reviews"
              className="btn btn-ghost btn-lg w-full rounded-full border-2 border-base-300 hover:border-primary hover:bg-base-200 transition-all font-bold text-secondary"
            >
              <FaArrowLeft /> Back to Feed
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetails;
