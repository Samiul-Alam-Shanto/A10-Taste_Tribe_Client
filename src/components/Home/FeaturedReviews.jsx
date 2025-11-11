import React from "react";
import useAxiosPublic from "../../hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import UniversalSpinner from "../../components/LoadingAnimations/UniversalSpinner";
import ReviewCard from "../ReviewCard";
import GeneralBtn from "../Buttons/GeneralBtn";
import { Link } from "react-router";
import { Fade } from "react-awesome-reveal";

const FeaturedReviews = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["featured_reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/featured-reviews");
      // console.log(res);
      return res.data;
    },
  });
  if (isLoading) return <UniversalSpinner />;
  if (isError)
    return (
      <div className="container mx-auto">
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center bg-base-300 rounded-xl  px-4 mx-4 shadow-md">
          <div className="bg-base-200 text-secondary px-4 py-2 rounded-full text-3xl font-semibold mb-3">
            ⚠️ Something Went Wrong
          </div>
          <p className="text-gradient my-12 text-4xl font-bold leading-12  max-w-md">
            {error?.message ||
              "An unexpected error occurred. Please try again later."}
          </p>
          <div onClick={() => refetch()}>
            <GeneralBtn>Try Again</GeneralBtn>
          </div>
        </div>
      </div>
    );
  //   console.log(data);

  return (
    <Fade triggerOnce duration={3500}>
      <section className="container mx-auto mt-24 px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-secondary">
          Top Rated Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.map((singleReview) => (
            <ReviewCard key={singleReview._id} singleReview={singleReview} />
          ))}
        </div>
        <div className="mt-12 flex justify-center items-center">
          <GeneralBtn>
            <Link>All Reviews</Link>
          </GeneralBtn>
        </div>
      </section>
    </Fade>
  );
};

export default FeaturedReviews;
