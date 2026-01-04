import React from "react";
import { useForm } from "react-hook-form";
import { FaStar, FaCamera, FaUtensils, FaMapMarkerAlt } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import { useMutation } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import GeneralBtn from "../components/Buttons/GeneralBtn";
import { motion } from "framer-motion";

const AddReview = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
      foodName: "",
      restaurantName: "",
      location: "",
      foodImage: "",
    },
  });

  // Watch fields for Live Preview
  const watchedValues = watch();

  const { mutate } = useMutation({
    mutationFn: (newReview) => axiosPublic.post("/reviews", newReview),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Published!",
        text: "Your review is live.",
        confirmButtonColor: "#d96c4e",
        timer: 2000,
      }).then(() => navigate("/all-reviews"));
    },
    onError: (err) => Swal.fire("Error", err.message, "error"),
  });

  return (
    <div className="min-h-screen bg-base-200 p-4 lg:p-8 font-sans">
      <title>Write Review - TasteTribe</title>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* --- LEFT: EDITOR FORM --- */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-base-100 p-8 rounded-[2.5rem] shadow-xl border border-base-300"
        >
          <div className="mb-8">
            <h1 className="text-3xl font-black text-secondary">New Entry</h1>
            <p className="text-base-content/60">
              Share your culinary experience.
            </p>
          </div>

          <form onSubmit={handleSubmit(mutate)} className="space-y-6">
            {/* Rating Input */}
            <div className="form-control">
              <label className="label font-bold text-secondary">Rating</label>
              <div className="flex gap-4 p-4 bg-base-200 rounded-2xl w-max">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={28}
                    className={`cursor-pointer transition-transform hover:scale-110 ${
                      star <= watchedValues.rating
                        ? "text-accent"
                        : "text-base-300"
                    }`}
                    onClick={() => setValue("rating", star)}
                  />
                ))}
              </div>
              <input
                type="hidden"
                {...register("rating", { required: true, min: 1 })}
              />
              {errors.rating && (
                <span className="text-error text-sm mt-1">
                  Please rate the food.
                </span>
              )}
            </div>

            {/* Text Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label font-bold text-secondary">
                  Dish Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spicy Ramen"
                  {...register("foodName", { required: true })}
                  className="input input-lg bg-base-200 rounded-2xl focus:bg-white transition-all"
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-secondary">
                  Restaurant
                </label>
                <input
                  type="text"
                  placeholder="e.g. Noodle House"
                  {...register("restaurantName", { required: true })}
                  className="input input-lg bg-base-200 rounded-2xl focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-secondary">Location</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="text"
                  placeholder="City or District"
                  {...register("location", { required: true })}
                  className="input input-lg pl-10 bg-base-200 rounded-2xl focus:bg-white w-full transition-all"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-secondary">
                Photo URL
              </label>
              <div className="relative">
                <FaCamera className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
                <input
                  type="url"
                  placeholder="https://..."
                  {...register("foodImage", { required: true })}
                  className="input input-lg pl-10 bg-base-200 rounded-2xl focus:bg-white w-full transition-all"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-bold text-secondary">Review</label>
              <textarea
                {...register("reviewText", { required: true })}
                className="textarea w-full textarea-lg h-40 bg-base-200 rounded-3xl focus:bg-white transition-all p-6 text-base leading-relaxed"
                placeholder="Describe the flavors, texture, and atmosphere..."
              ></textarea>
            </div>

            {/* Hidden Fields */}
            <input
              type="hidden"
              value={user?.displayName}
              {...register("reviewerName")}
            />
            <input
              type="hidden"
              value={user?.email}
              {...register("reviewerEmail")}
            />
            <input
              type="hidden"
              value={user?.photoURL}
              {...register("reviewerPhoto")}
            />

            <div className="pt-4">
              <GeneralBtn type="submit">Publish Review</GeneralBtn>
            </div>
          </form>
        </motion.div>

        {/* --- RIGHT: LIVE PREVIEW --- */}
        <div className="hidden lg:block sticky top-8">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
              Live Preview
            </span>
          </div>

          <motion.div
            layout
            className="bg-base-100 rounded-[2.5rem] overflow-hidden shadow-2xl border border-base-300 max-w-md mx-auto"
          >
            {/* Preview Image */}
            <div className="h-64 bg-base-200 relative overflow-hidden flex items-center justify-center">
              {watchedValues.foodImage ? (
                <img
                  src={watchedValues.foodImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.style.display = "none")}
                />
              ) : (
                <div className="text-base-content/20 flex flex-col items-center">
                  <FaUtensils size={40} />
                  <span className="text-sm font-bold mt-2">Image Preview</span>
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-secondary shadow-sm flex items-center gap-1">
                <FaStar className="text-accent" /> {watchedValues.rating || 0}/5
              </div>
            </div>

            {/* Preview Content */}
            <div className="p-8">
              <h2 className="text-2xl font-black text-secondary mb-1 wrap-break-word">
                {watchedValues.foodName || "Dish Name"}
              </h2>
              <p className="text-sm font-bold text-primary uppercase tracking-wider mb-6 wrap-break-word">
                {watchedValues.restaurantName || "Restaurant Name"}
              </p>

              <div className="bg-base-200/50 p-4 rounded-2xl mb-6">
                <p className="text-base-content/70 italic text-sm leading-relaxed wrap-break-word line-clamp-4">
                  "
                  {watchedValues.reviewText ||
                    "Your review text will appear here..."}
                  "
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-base-200">
                <img
                  src={user?.photoURL}
                  alt="user"
                  className="w-10 h-10 rounded-full border border-base-300"
                />
                <div>
                  <p className="text-xs font-bold text-base-content/40 uppercase">
                    Reviewed By
                  </p>
                  <p className="text-sm font-bold text-secondary">
                    {user?.displayName}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AddReview;
