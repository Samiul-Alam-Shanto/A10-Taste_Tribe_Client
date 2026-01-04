import React from "react";
import useAxiosPublic from "../../hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import ReviewCard from "../ReviewCard";
import GeneralBtn from "../Buttons/GeneralBtn";
import { Link } from "react-router";
import { motion } from "framer-motion";
import SkeletonLoader from "../LoadingAnimations/SkeletonLoader";
import ComponentError from "../../pages/Errors/ComponentError";

const FeaturedReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["featured_reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured-reviews");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="container mx-auto py-20 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonLoader key={i} />
        ))}
      </div>
    );
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <section className="py-24 bg-base-200/50 bg-texture text-base-content/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Top Rated
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-secondary mt-2">
            Community Favorites
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {data?.map((singleReview, index) => (
            <motion.div
              key={singleReview._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ReviewCard singleReview={singleReview} />
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 flex justify-center items-center">
          <Link to="/all-reviews">
            <GeneralBtn>View All Reviews</GeneralBtn>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedReviews;
