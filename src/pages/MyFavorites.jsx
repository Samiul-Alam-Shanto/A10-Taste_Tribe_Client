import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaTrashAlt, FaHeartBroken, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/Axios/useAxiosSecure";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import GeneralBtn from "../components/Buttons/GeneralBtn";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: favorites = [], isLoading } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-favorite-reviews?email=${user.email}`
      );
      return res.data;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/favorite-reviews/${id}`),
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Removed",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
      queryClient.invalidateQueries(["favorites"]);
    },
  });

  if (isLoading) return <UniversalSpinner />;

  return (
    <div className="space-y-10">
      <div className="text-center">
        <span className="text-primary font-bold uppercase tracking-widest text-sm">
          Collections
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-secondary mt-2">
          My Cookbook
        </h1>
        <p className="text-base-content/60 mt-2">
          The dishes you want to eat again.
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-24 h-24 bg-base-200 rounded-full flex items-center justify-center mx-auto mb-6 text-base-300 text-4xl">
            <FaHeartBroken />
          </div>
          <h3 className="text-xl font-bold text-secondary">
            No favorites yet.
          </h3>
          <p className="text-base-content/60 mb-8">
            Start exploring to build your collection.
          </p>
          <Link className="flex items-center justify-center" to="/all-reviews">
            <GeneralBtn>Explore Food</GeneralBtn>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {favorites.map((fav, i) => (
            <motion.div
              key={fav._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="group bg-base-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl border border-base-200 transition-all duration-300 flex flex-col"
            >
              {/* Image Top */}
              <div className="h-56 relative overflow-hidden">
                <img
                  src={fav.foodImage}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-60"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{fav.foodName}</h3>
                  <p className="text-sm opacity-90">{fav.restaurantName}</p>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(fav._id)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur p-2 rounded-full text-white hover:bg-red-500 hover:text-white transition-colors"
                >
                  <FaTrashAlt size={14} />
                </button>
              </div>

              {/* Footer Info */}
              <div className="p-6 flex items-center justify-between bg-base-100 mt-auto">
                <div className="flex items-center gap-2">
                  <img
                    src={fav.reviewerPhoto}
                    alt="user"
                    className="w-8 h-8 rounded-full border border-base-300"
                  />
                  <span className="text-xs font-bold text-base-content/60">
                    By {fav.reviewerName}
                  </span>
                </div>
                <Link
                  to={`/review-details/${fav.reviewId}`}
                  className="btn btn-circle btn-sm btn-ghost text-secondary hover:bg-primary hover:text-white transition-colors"
                >
                  <FaArrowRight />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
