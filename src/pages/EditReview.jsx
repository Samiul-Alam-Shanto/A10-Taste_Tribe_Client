import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, Controller } from "react-hook-form";
import { FaStar, FaArrowLeft, FaSave, FaUtensils } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/Axios/useAxiosSecure"; // ★ FIXED: Use Secure Hook
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import ComponentError from "./Errors/ComponentError";
import GeneralBtn from "../components/Buttons/GeneralBtn";

const EditReview = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure(); // ★ FIXED: Secure instance for protected routes
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [hover, setHover] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // 1. Fetch Review Data (Securely)
  const {
    data: review,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`); // Changed to secure for consistency
      return res.data;
    },
  });

  // 2. Pre-fill form when data loads
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

  // 3. Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedReview) => {
      // Backend expects integer for rating
      updatedReview.rating = parseInt(updatedReview.rating, 10);
      const res = await axiosSecure.patch(`/reviews/${id}`, updatedReview);
      return res.data;
    },
    onSuccess: (res) => {
      if (res.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Updated!",
          text: "Your review has been polished.",
          timer: 1500,
          showConfirmButton: false,
          confirmButtonColor: "#d96c4e",
        }).then(() => {
          queryClient.invalidateQueries(["my_reviews"]);
          navigate("/dashboard/my-reviews"); // ★ FIXED: Redirects correctly
        });
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes",
          text: "You didn't change anything.",
          confirmButtonColor: "#d96c4e",
        }).then(() => navigate("/dashboard/my-reviews"));
      }
    },
    onError: (err) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message,
      });
    },
  });

  const onSubmit = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) return <UniversalSpinner />;
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <div className="min-h-screen py-12 px-4 font-sans">
      <title>Edit Review - TasteTribe</title>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary font-bold uppercase tracking-widest text-sm">
            Refine Your Taste
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-secondary mt-2 mb-2">
            Edit <span className="text-gradient">Review</span>
          </h1>
          <p className="text-xl text-base-content/60">
            Updating: {review.foodName}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-base-100 p-8 md:p-12 rounded-[3rem] shadow-xl border border-base-200"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Rating Section (Centered) */}
            <div className="flex flex-col items-center justify-center space-y-4 py-6 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
              <label className="text-sm font-bold uppercase tracking-widest text-base-content/40">
                Adjust Rating
              </label>
              <Controller
                name="rating"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <div className="flex gap-2">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label
                          key={index}
                          className="cursor-pointer transition-transform hover:scale-110"
                        >
                          <input
                            type="radio"
                            className="hidden"
                            value={ratingValue}
                            onClick={() => field.onChange(ratingValue)}
                          />
                          <FaStar
                            size={40}
                            className="transition-colors duration-200"
                            color={
                              ratingValue <= (hover || field.value)
                                ? "#fbbf24"
                                : "#e5e7eb"
                            }
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(0)}
                          />
                        </label>
                      );
                    })}
                  </div>
                )}
              />
              {errors.rating && (
                <span className="text-error font-bold">Rating is required</span>
              )}
            </div>

            {/* Form Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="form-control">
                <label className="label font-bold text-secondary">
                  Dish Name
                </label>
                <input
                  type="text"
                  className="input input-lg bg-base-200 rounded-2xl focus:bg-base-100 transition-all font-bold text-secondary"
                  {...register("foodName", { required: "Required" })}
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-secondary">
                  Photo URL
                </label>
                <input
                  type="url"
                  className="input input-lg bg-base-200 rounded-2xl focus:bg-base-100 transition-all"
                  {...register("foodImage", { required: "Required" })}
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-secondary">
                  Restaurant
                </label>
                <input
                  type="text"
                  className="input input-lg bg-base-200 rounded-2xl focus:bg-base-100 transition-all"
                  {...register("restaurantName", { required: "Required" })}
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-secondary">
                  Location
                </label>
                <input
                  type="text"
                  className="input input-lg bg-base-200 rounded-2xl focus:bg-base-100 transition-all"
                  {...register("location", { required: "Required" })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-secondary">
                Your Review
              </label>
              <textarea
                className="textarea w-full textarea-lg h-40 bg-base-200 rounded-3xl focus:bg-base-100 transition-all p-6 text-lg leading-relaxed"
                {...register("reviewText", { required: "Required" })}
              ></textarea>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 pt-6 border-t border-base-200">
              {/* ★ FIXED: Cancel button explicitly navigates back to My Reviews */}
              <button
                type="button"
                onClick={() => navigate("/dashboard/my-reviews")}
                className="btn btn-ghost rounded-full text-base-content/60 hover:bg-base-200 gap-2 pl-2"
              >
                <FaArrowLeft /> Cancel
              </button>

              <div className="w-full md:w-auto">
                <GeneralBtn type="submit" disabled={updateMutation.isPending}>
                  {updateMutation.isPending ? "Updating..." : "Save Changes"}
                </GeneralBtn>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default EditReview;
