import React from "react";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaMapMarkerAlt,
  FaStore,
} from "react-icons/fa";
import GeneralBtn from "./Buttons/GeneralBtn";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";

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
      <span className="text-base-content/90 font-semibold ml-1">{rating}</span>
    </div>
  );
};

const ReviewCard = ({ singleReview }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { mutate } = useMutation({
    mutationFn: async (favoriteReview) => {
      const res = await axiosPublic.post("/favorite-reviews", favoriteReview);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Added to Favorites");
    },
    onError: (err) => {
      if (err.response.status === 409) {
        toast.error("This is already in your favorites.");
      } else {
        toast.error("Failed to Add in Favorites", err);
      }
    },
  });

  const {
    _id,
    foodImage,
    foodName,
    restaurantName,
    location,
    reviewerEmail,
    reviewerName,
    reviewerPhoto,
    rating,
  } = singleReview;

  const handleFavoriteClick = () => {
    const myFavoriteReview = {
      reviewId: _id,
      userEmail: user.email,
      foodImage,
      foodName,
      restaurantName,
      location,
      reviewerName,
      reviewerPhoto,
      reviewerEmail,
      rating,
    };
    mutate(myFavoriteReview);
  };

  return (
    <div className="card bg-base-100 shadow-xl rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group">
      <figure className="relative h-56">
        <img
          src={foodImage}
          alt={`Photo of ${foodName}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-4 right-4 btn btn-circle btn-sm bg-white/80 backdrop-blur-sm border-none text-red-500 hover:bg-white"
          aria-label="Add to favorites"
        >
          <FaRegHeart size={16} />
        </button>
      </figure>

      <div className="card-body p-6">
        <div className="flex justify-between pt-5 h-24 items-start">
          <h2 className="card-title text-2xl font-bold text-secondary mb-2">
            {foodName}
          </h2>
          <StarRating rating={rating} />
        </div>

        <div className="space-y-2 mt-2 text-base-content/80">
          <div className="flex items-center gap-2">
            <FaStore className="text-primary" />
            <span>{restaurantName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            <span>{location}</span>
          </div>
        </div>

        <div className="divider my-4"></div>

        <div className="card-actions flex flex-nowrap justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={reviewerPhoto} alt={`Avatar of ${reviewerName}`} />
              </div>
            </div>
            <div>
              <p className="font-semibold text-secondary">{reviewerName}</p>
            </div>
          </div>
          <Link to={`/review-details/${_id}`}>
            <GeneralBtn>View Details</GeneralBtn>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
