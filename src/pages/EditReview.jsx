import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { FaStar, FaArrowLeft } from "react-icons/fa";
import { Slide, Fade } from "react-awesome-reveal";
import Swal from "sweetalert2";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic"; // Your custom hook
import ComponentError from "./Errors/ComponentError"; // Your error component
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import AuthBtn from "../components/Buttons/AuthBtn";

const StarRating = ({ control }) => {
  const [hover, setHover] = useState(0);

  return (
    <Controller
      name="rating"
      control={control}
      rules={{ required: "A rating is required" }}
      render={({ field }) => (
        <div className="flex space-x-1">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  className="hidden"
                  value={ratingValue}
                  checked={field.value === ratingValue}
                  onChange={() => field.onChange(ratingValue)}
                />
                <FaStar
                  className="cursor-pointer transition-colors"
                  color={
                    ratingValue <= (hover || field.value || 0)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  size={30}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(0)}
                />
              </label>
            );
          })}
        </div>
      )}
    />
  );
};

const EditReview = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm();

  const {
    data: review,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews/${id}`);
      return res.data;
    },
  });

  useEffect(() => {
    if (review) {
      setValue("foodName", review.foodName);
      setValue("foodImage", review.foodImage);
      setValue("restaurantName", review.restaurantName);
      setValue("location", review.location);
      setValue("rating", review.rating);
      setValue("reviewText", review.reviewText);
    }
  }, [review, setValue]);

  const updateMutation = useMutation({
    mutationFn: (updatedReview) =>
      axiosPublic.patch(`/reviews/${id}`, updatedReview),
    onSuccess: (res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your review has been successfully updated.",
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["my_reviews"]);
        navigate("/my-reviews");
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "You didn't change anything.",
        });
        navigate("/my-reviews");
      }
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Something went wrong: ${err.message}`,
      });
    },
  });
  const onSubmit = (data) => {
    const updatedData = { ...data, rating: parseInt(data.rating, 10) };
    updateMutation.mutate(updatedData);
  };

  if (isLoading) return <UniversalSpinner />;
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <section className="py-12 lg:py-20 bg-base-100">
      <title>{`Edit ${review.foodName} Review - TasteTribe`}</title>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto bg-base-100 p-8 lg:p-12 rounded-2xl shadow-2xl">
          <Slide direction="down" triggerOnce>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-secondary">
                Edit Your Review
              </h1>
              <p className="mt-2 text-base-content/70">
                Make changes to your review for{" "}
                <span className="font-bold text-gradient">
                  {review.foodName}
                </span>
                .
              </p>
            </div>
          </Slide>

          <Fade direction="up" delay={200} triggerOnce>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Food Name
                  </label>
                  <input
                    type="text"
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                    {...register("foodName", {
                      required: "Food name is required",
                    })}
                  />
                  {errors.foodName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.foodName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Food Image URL
                  </label>
                  <input
                    type="url"
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                    {...register("foodImage", {
                      required: "Image URL is required",
                    })}
                  />
                  {errors.foodImage && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.foodImage.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Restaurant Name
                  </label>
                  <input
                    type="text"
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                    {...register("restaurantName", {
                      required: "Restaurant name is required",
                    })}
                  />
                  {errors.restaurantName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.restaurantName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Restaurant Location
                  </label>
                  <input
                    type="text"
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                    {...register("location", {
                      required: "Location is required",
                    })}
                  />
                  {errors.location && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  Your Rating
                </label>
                <StarRating control={control} />
                {errors.rating && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.rating.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Your Review
                </label>
                <textarea
                  className="textarea w-full h-32 focus:ring-2 focus:ring-[#d96c4e]"
                  {...register("reviewText", {
                    required: "Review text is required",
                  })}
                ></textarea>
                {errors.reviewText && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.reviewText.message}
                  </p>
                )}
              </div>

              <div className="flex flex-col-reverse justify-between sm:flex-row gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/my-reviews")}
                  className="btn text-primary-content custom-gradient w-full sm:w-auto"
                >
                  <FaArrowLeft /> Cancel
                </button>
                <AuthBtn>
                  <div type="submit" disabled={updateMutation.isPending}>
                    {updateMutation.isPending ? "Saving..." : "Save Changes"}
                  </div>
                </AuthBtn>
              </div>
            </form>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default EditReview;
