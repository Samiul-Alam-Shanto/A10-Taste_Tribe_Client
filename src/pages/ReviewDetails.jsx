import React from "react";
import { Link, useParams } from "react-router";
import {
  FaStar,
  FaRegStar,
  FaMapMarkerAlt,
  FaStore,
  FaArrowLeft,
} from "react-icons/fa";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import ComponentError from "./Errors/ComponentError";

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = rating;
  return (
    <div className="flex items-center gap-1">
      {[...Array(totalStars)].map((_, index) =>
        index < filledStars ? (
          <FaStar key={index} className="text-amber-400" />
        ) : (
          <FaRegStar key={index} className="text-gray-300" />
        )
      )}
    </div>
  );
};

const ReviewDetails = () => {
  const axiosPublic = useAxiosPublic();
  const { id } = useParams();

  const { data, isLoading, isError, refetch, error } = useQuery({
    queryKey: ["review_details", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${id}`);
      // console.log(res);
      return res.data;
    },
  });
  if (isLoading) return <UniversalSpinner />;
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <section data-aos="flip-down" className="py-12 lg:py-20 bg-base-100">
      <title>{`${data.foodName} Details - TasteTribe`}</title>
      <div className="container mx-auto px-4">
        <div className="card lg:card-side bg-base-200 shadow-2xl rounded-lg overflow-hidden">
          {/* Left Column*/}
          <figure className="w-full lg:w-1/2">
            <img
              src={data.foodImage}
              alt={`Photo of ${data.foodName}`}
              className="w-full h-full object-cover min-h-[400px]"
            />
          </figure>

          {/* Right Column */}
          <div className="card-body justify-center w-full lg:w-1/2 p-8 lg:p-12">
            <div className="space-y-2 mb-2">
              <p className="text-sm text-base-content/60">
                Reviewed on {new Date(data.postedDate).toLocaleDateString()}
              </p>
              <StarRating rating={data.rating} />
            </div>

            <h1 className="card-title text-4xl lg:text-5xl font-bold text-secondary">
              {data.foodName}
            </h1>

            <div className="space-y-2 mt-4 text-base-content/80">
              <p className="flex items-center gap-3">
                <FaStore className="text-primary" />
                <span className="font-medium">{data.restaurantName}</span>
              </p>
              <p className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>{data.location}</span>
              </p>
            </div>

            <div className="divider my-6"></div>

            <blockquote className="text-lg italic text-base-content/90 border-l-4 border-primary/50 pl-4 my-4">
              "{data.reviewText}"
            </blockquote>

            <div className="mt-8">
              <div className="flex items-center gap-4">
                <div className="avatar">
                  <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={data.reviewerPhoto}
                      alt={`Avatar of ${data.reviewerName}`}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-secondary">
                    {data.reviewerName}
                  </p>
                  <p className="text-sm text-base-content/70">
                    {data.reviewerEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-actions justify-end mt-8">
              <Link
                to="/all-reviews"
                className="btn custom-gradient text-primary-content"
              >
                <FaArrowLeft />
                Back to All Reviews
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewDetails;
