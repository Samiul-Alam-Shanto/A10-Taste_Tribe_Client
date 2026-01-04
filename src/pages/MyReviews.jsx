import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaEdit, FaUtensils } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/Axios/useAxiosSecure";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import GeneralBtn from "../components/Buttons/GeneralBtn";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["my_reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-reviews?email=${user.email}`);
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Your review has been removed.", "success");
      queryClient.invalidateQueries(["my_reviews"]);
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You can't restore this memory.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) deleteMutation.mutate(id);
    });
  };

  if (isLoading) return <UniversalSpinner />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-secondary text-secondary-content p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/food.png')] opacity-10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black mb-2">My Food Journal</h1>
          <p className="opacity-70 text-lg">
            You have shared <strong>{reviews.length}</strong> culinary
            experiences.
          </p>
        </div>
        <div className="relative z-10">
          <Link to="/dashboard/add-review">
            <GeneralBtn>+ Add New Memory</GeneralBtn>
          </Link>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid gap-6">
        {reviews.length === 0 ? (
          <div className="text-center py-20 bg-base-100 rounded-[2.5rem] border-2 border-dashed border-base-300">
            <FaUtensils className="mx-auto text-4xl text-base-300 mb-4" />
            <h3 className="text-xl font-bold text-secondary">
              Your plate is empty.
            </h3>
            <p className="text-base-content/60">Go eat something tasty!</p>
          </div>
        ) : (
          reviews.map((review, i) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-base-100 p-2 rounded-4xl shadow-sm border border-base-200 flex flex-col md:flex-row gap-4 group"
            >
              {/* Image */}
              <div className="w-full md:w-48 h-48 rounded-[1.5rem] overflow-hidden relative">
                <img
                  src={review.foodImage}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-secondary shadow-md">
                  {review.rating}/5 ★
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 p-4 flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-secondary mb-1">
                  {review.foodName}
                </h3>
                <p className="text-sm font-bold text-primary uppercase tracking-wide mb-4">
                  {review.restaurantName}
                </p>
                <p className="text-base-content/70 italic line-clamp-2 mb-4">
                  "{review.reviewText}"
                </p>
                <div className="mt-auto pt-4 border-t border-base-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-base-content/40">
                    {new Date(review.postedDate).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      to={`/dashboard/edit-review/${review._id}`}
                      className="btn btn-sm btn-ghost text-secondary"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="btn btn-sm btn-ghost text-error"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReviews;
