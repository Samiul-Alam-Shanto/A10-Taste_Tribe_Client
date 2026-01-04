import React, { useState, useEffect, useRef } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import ReviewCard from "../components/ReviewCard";
import GeneralBtn from "../components/Buttons/GeneralBtn";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import SkeletonLoader from "../components/LoadingAnimations/SkeletonLoader";
import ComponentError from "./Errors/ComponentError";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const AllReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [rating, setRating] = useState(0);

  // Use larger limit for 4-col grid so it fills up nicer (multiples of 4 ideally, e.g., 12)
  const LIMIT = 12;

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["reviews", appliedSearch, sort, rating],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await axiosPublic.get("/all-reviews", {
        params: {
          search: appliedSearch,
          rating: rating > 0 ? rating : undefined,
          sort,
          page: pageParam,
          limit: LIMIT,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      const loadedReviews = allPages.flatMap((page) => page.reviews).length;
      return loadedReviews < lastPage.totalCount
        ? allPages.length + 1
        : undefined;
    },
  });

  // Infinite Scroll Observer
  const scrollTrigger = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      },
      { threshold: 1.0 }
    );
    if (scrollTrigger.current) observer.observe(scrollTrigger.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setAppliedSearch(search);
  };
  const allReviews = data?.pages.flatMap((page) => page.reviews) || [];

  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <div className="min-h-screen bg-base-100   font-sans">
      <title>Reviews - TasteTribe</title>
      <div className="fixed inset-0 bg-texture opacity-20 pointer-events-none"></div>
      {/* HEADER HERO */}
      <div className="bg-secondary text-secondary-content pt-32 pb-24 px-4 relative overflow-hidden">
        {/* Abstract background */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">
              Community Feed
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6">
              Craving{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Something?
              </span>
            </h1>
            <p className="text-xl opacity-80 max-w-2xl mx-auto">
              Explore {data?.pages[0]?.totalCount || "thousands of"} honest
              reviews from local foodies.
            </p>
          </motion.div>
        </div>
      </div>

      {/* STICKY FILTER BAR */}
      <div className="sticky top-20 z-40 px-4 -mt-10 mb-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-base-100/80 backdrop-blur-xl p-3 rounded-[2rem] shadow-2xl border border-base-200 flex flex-col lg:flex-row gap-3 items-center justify-between max-w-6xl mx-auto"
          >
            {/* Search */}
            <form
              onSubmit={handleSearch}
              className="relative w-full lg:w-96 group"
            >
              <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/40 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search dish..."
                className="input w-full pl-12 rounded-full bg-base-200/50 border-transparent focus:border-primary focus:bg-base-100 transition-all font-medium"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            {/* Filters Group */}
            <div className="flex flex-wrap gap-2 justify-center w-full lg:w-auto items-center">
              {/* Rating Pill */}
              <div className="relative">
                <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none text-xs" />
                <select
                  className="select select-sm h-12 pl-10 pr-8 rounded-full bg-base-200/50 border-none focus:ring-2 focus:ring-primary font-bold text-secondary text-xs uppercase tracking-wide cursor-pointer hover:bg-base-200"
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value={0}>All Ratings</option>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={3}>3+ Stars</option>
                </select>
              </div>

              {/* Sort Pill */}
              <div className="relative">
                <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/50 pointer-events-none text-xs" />
                <select
                  className="select select-sm h-12 pl-10 pr-8 rounded-full bg-base-200/50 border-none focus:ring-2 focus:ring-primary font-bold text-secondary text-xs uppercase tracking-wide cursor-pointer hover:bg-base-200"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="newest">Newest</option>
                  <option value="highest_rated">Top Rated</option>
                </select>
              </div>

              {/* Action */}
              <div className="ml-2">
                <GeneralBtn onClick={handleSearch} size="sm">
                  Filter
                </GeneralBtn>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* REVIEWS GRID */}
      <div className="container mx-auto px-4 pb-24 max-w-[1600px]">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonLoader key={i} />
            ))}
          </div>
        ) : allReviews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allReviews.map((review, idx) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <ReviewCard singleReview={review} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 opacity-50">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-secondary">
              No reviews found.
            </h3>
            <p className="text-base-content/60">
              Try searching for something else.
            </p>
          </div>
        )}

        {/* Loader Trigger */}
        <div ref={scrollTrigger} className="py-16 flex justify-center h-20">
          {isFetchingNextPage && <UniversalSpinner />}
        </div>
      </div>
    </div>
  );
};

export default AllReviews;
