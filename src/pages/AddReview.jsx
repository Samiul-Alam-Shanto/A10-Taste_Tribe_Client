import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import AuthBtn from "../components/Buttons/AuthBtn";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

const StarRating = ({ register, setValue, watch }) => {
  const [hover, setHover] = useState(0);
  const rating = watch("rating") || 0;

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              value={ratingValue}
              {...register("rating", { required: true })}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer transition-colors"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={30}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setValue("rating", ratingValue)}
            />
          </label>
        );
      })}
    </div>
  );
};

const AddReview = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: async (newReview) => {
      const res = await axiosPublic.post("/reviews", newReview);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("✅ Review added successfully!");
      reset();
    },
    onError: (err) => {
      Swal.fire("❌ Error adding review:", err);
    },
  });

  const onSubmit = (data) => {
    mutate(data);
  };

  return (
    <section className="py-12 lg:py-20 bg-base-100">
      <title>Add Review - TasteTribe</title>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row bg-base-100 rounded-2xl shadow-xl overflow-hidden">
          {/* Left Side */}
          <div
            data-aos="flip-right"
            className="w-full relative lg:w-2/5 p-8 bg-cover bg-center h-[400px] lg:h-auto"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1484980972926-edee96e0960d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687')",
            }}
          >
            <div className="absolute inset-0 bg-black/50 text-white space-y-4 p-8 flex flex-col justify-center">
              <h1 className="text-4xl font-bold">Share Your Experience</h1>
              <p className="text-lg">
                Your opinion helps others discover the best local food. Fill out
                the details to add your review.
              </p>
            </div>
          </div>

          {/* Right Side */}
          <div data-aos="flip-left" className="w-full lg:w-3/5 p-8 lg:p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Food Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Margherita Pizza"
                    {...register("foodName", { required: true })}
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                  />
                  {errors.foodName && (
                    <p className="text-red-500 text-sm mt-1">
                      Food name is required
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Food Image URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://..."
                    {...register("foodImage", { required: true })}
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                  />
                  {errors.foodImage && (
                    <p className="text-red-500 text-sm mt-1">
                      Image URL is required
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
                    placeholder="e.g., Tony's Pizzeria"
                    {...register("restaurantName", { required: true })}
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-base-content mb-1">
                    Restaurant Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 123 Market St, Downtown"
                    {...register("location", { required: true })}
                    className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  Your Rating
                </label>
                <StarRating
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">
                    Rating is required
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-1">
                  Your Review
                </label>
                <textarea
                  placeholder="Tell us what you thought..."
                  {...register("reviewText", { required: true })}
                  className="textarea w-full h-32 focus:ring-2 focus:ring-[#d96c4e]"
                ></textarea>
              </div>

              <div className="divider"></div>

              <div>
                <label className="block text-sm font-medium text-base-content mb-2">
                  Reviewing as:
                </label>
                <div className="space-y-4">
                  <input
                    type="text"
                    defaultValue={user.displayName}
                    {...register("reviewerName")}
                    readOnly
                    className="input w-full bg-base-200 cursor-not-allowed"
                  />
                  <input
                    type="email"
                    defaultValue={user.email}
                    {...register("reviewerEmail")}
                    readOnly
                    className="input w-full bg-base-200 cursor-not-allowed"
                  />
                  <input
                    type="text"
                    defaultValue={user.photoURL}
                    {...register("reviewerPhoto")}
                    readOnly
                    className="input w-full bg-base-200 cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <AuthBtn>Submit Your Review</AuthBtn>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddReview;
