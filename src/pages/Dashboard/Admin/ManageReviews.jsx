import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FaTrashAlt,
  FaEdit,
  FaStar,
  FaShieldAlt,
  FaTimes,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import UniversalSpinner from "../../../components/LoadingAnimations/UniversalSpinner";
import GeneralBtn from "../../../components/Buttons/GeneralBtn";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingReview, setEditingReview] = useState(null);

  // Form handling for the Modal
  const { register, handleSubmit, setValue } = useForm();

  // 1. Fetch All Reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["all-admin-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/all-reviews");
      return res.data;
    },
  });

  // 2. Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/reviews/${id}`), // Admin uses the standard delete endpoint which handles both collections
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        showConfirmButton: false,
        timer: 1500,
      });
      queryClient.invalidateQueries(["all-admin-reviews"]);
    },
  });

  // 3. Update Mutation (The Admin Patch)
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        foodName: data.foodName,
        restaurantName: data.restaurantName,
        reviewText: data.reviewText,
        rating: parseInt(data.rating),
      };
      const res = await axiosSecure.patch(
        `/admin/reviews/${editingReview._id}`,
        payload
      );
      return res.data;
    },
    onSuccess: (res) => {
      if (res.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Content Moderated",
          showConfirmButton: false,
          timer: 1500,
        });
        queryClient.invalidateQueries(["all-admin-reviews"]);
        document.getElementById("edit_modal").close();
        setEditingReview(null);
      }
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Remove Content?",
      text: "This will delete the review permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
    }).then((res) => {
      if (res.isConfirmed) deleteMutation.mutate(id);
    });
  };

  const openEditModal = (review) => {
    setEditingReview(review);
    // Pre-fill form
    setValue("foodName", review.foodName);
    setValue("restaurantName", review.restaurantName);
    setValue("rating", review.rating);
    setValue("reviewText", review.reviewText);
    document.getElementById("edit_modal").showModal();
  };

  if (isLoading) return <UniversalSpinner />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-base-300 pb-6 flex items-end gap-4">
        <div className="p-4 bg-primary/10 rounded-2xl text-primary text-3xl">
          <FaShieldAlt />
        </div>
        <div>
          <h1 className="text-4xl font-black text-secondary">
            Content Moderation
          </h1>
          <p className="text-base-content/60 mt-1">
            Review, Edit, or Delete community posts.
          </p>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid gap-4">
        {reviews.map((review, i) => (
          <motion.div
            key={review._id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-base-100 p-4 rounded-3xl shadow-sm border border-base-200 flex flex-col md:flex-row items-center gap-6 group hover:border-primary/20 transition-all"
          >
            {/* Image Thumbnail */}
            <div className="w-full md:w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-base-200">
              <img
                src={review.foodImage}
                alt=""
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-secondary">
                  {review.foodName}
                </h3>
                <span className="flex items-center gap-1 text-accent font-bold bg-base-200 px-2 py-1 rounded-lg text-sm">
                  {review.rating} <FaStar />
                </span>
              </div>
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                {review.restaurantName}
              </p>
              <p className="text-base-content/70 text-sm line-clamp-2 italic">
                "{review.reviewText}"
              </p>

              {/* Meta */}
              <div className="mt-4 flex items-center justify-center md:justify-start gap-3 text-xs font-bold text-base-content/40">
                <span>Posted by {review.reviewerName}</span>
                <span>•</span>
                <span>{new Date(review.postedDate).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 flex gap-3">
              <button
                onClick={() => openEditModal(review)}
                className="btn btn-circle btn-outline border-base-300 text-secondary hover:bg-secondary hover:text-white"
                title="Edit Content"
              >
                <FaEdit />
              </button>

              <button
                onClick={() => handleDelete(review._id)}
                className="btn btn-circle btn-outline border-base-300 text-error/70 hover:bg-error hover:border-error hover:text-white"
                title="Delete Content"
              >
                <FaTrashAlt />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- EDIT MODAL --- */}
      <dialog id="edit_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-base-100 rounded-4xl p-8 max-w-2xl border border-base-300 shadow-2xl">
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-black text-2xl text-secondary">Edit Review</h3>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost text-base-content/50 hover:bg-base-200">
                <FaTimes />
              </button>
            </form>
          </div>

          <form
            onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
            className="space-y-5"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-bold text-sm text-secondary">
                  Dish Name
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl bg-base-200 focus:bg-base-100"
                  {...register("foodName")}
                />
              </div>
              <div className="form-control">
                <label className="label font-bold text-sm text-secondary">
                  Restaurant
                </label>
                <input
                  type="text"
                  className="input input-bordered rounded-xl bg-base-200 focus:bg-base-100"
                  {...register("restaurantName")}
                />
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label font-bold text-sm text-secondary">
                Rating (1-5)
              </label>
              <input
                type="number"
                max="5"
                min="1"
                className="input w-full  input-bordered rounded-xl bg-base-200 focus:bg-base-100  font-bold"
                {...register("rating")}
              />
            </div>

            <div className="form-control">
              <label className="label font-bold text-sm text-secondary">
                Review Content
              </label>
              <textarea
                className="textarea w-full textarea-bordered h-32 rounded-2xl bg-base-200 focus:bg-base-100 text-base"
                {...register("reviewText")}
              ></textarea>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-ghost rounded-full">Cancel</button>
              </form>
              <GeneralBtn type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? "Saving..." : "Save Changes"}
              </GeneralBtn>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default ManageReviews;
