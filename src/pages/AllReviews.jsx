import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import ReviewCard from "../components/ReviewCard";
import GeneralBtn from "../components/Buttons/GeneralBtn";
import { Zoom } from "react-awesome-reveal";
import SkeletonLoader from "../components/LoadingAnimations/SkeletonLoader";
import ComponentError from "./Errors/ComponentError";

const AllReviews = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState("");
  const [searchText, setSearchText] = useState("");

  const { data, isLoading, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["reviews", searchText],
    queryFn: async () => {
      const res = await axiosPublic.get(`/all-reviews?search=${searchText}`);
      return res.data;
    },
  });
  // console.log(data);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchText(search);
  };

  if (isLoading)
    return (
      <div className=" container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 9 }).map((_, i) => (
          <SkeletonLoader key={i} />
        ))}
      </div>
    );
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <Zoom triggerOnce duration={800}>
      <section className="container mx-auto my-12 lg:my-20 px-4">
        <title>All Reviews - TasteTribe</title>
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-secondary">
            All Food Reviews
          </h2>
          <p className="mt-2 text-base-content/80">
            Find your next favorite meal from our community's collection.
          </p>
        </div>

        <form
          onSubmit={handleSearch}
          className="flex justify-center items-center gap-2 mb-12"
        >
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder="Search by food name..."
            className="input bg-white text-accent-content  w-full max-w-sm focus:ring-2 focus:ring-[#d96c4e]"
            disabled={isFetching}
          />
          <GeneralBtn>
            <div type="submit" disabled={isFetching}>
              <span>Search</span>
            </div>
          </GeneralBtn>
        </form>
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-300 ${
            isFetching ? "opacity-50" : "opacity-100"
          }`}
        >
          {data?.map((singleReview) => (
            <ReviewCard key={singleReview._id} singleReview={singleReview} />
          ))}
        </div>

        {data?.length === 0 && !isFetching && (
          <div className="text-center my-8">
            <p className="text-xl text-base-content/70">
              No reviews found for "{searchText}".
            </p>
            <p className="mt-2 text-base-content/90">
              Try searching for something else!
            </p>
          </div>
        )}
      </section>
    </Zoom>
  );
};

export default AllReviews;
