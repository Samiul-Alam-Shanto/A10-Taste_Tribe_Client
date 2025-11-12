import React from "react";
import useAuth from "../hooks/useAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import ComponentError from "./Errors/ComponentError";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router";
import GeneralBtn from "../components/Buttons/GeneralBtn";
import Swal from "sweetalert2";

const MyFavorites = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["favorites"],
    queryFn: async () => {
      const res = await axiosPublic.get(
        `/my-favorite-reviews?email=${user.email}`
      );
      return res.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (id) => {
      const result = await axiosPublic.delete(`/favorite-reviews/${id}`);
      return result.data;
    },
    onSuccess: (res) => {
      if (res.deletedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your review has been deleted successfully.",
          timer: 1500,
          showConfirmButton: false,
        });
        queryClient.invalidateQueries(["favorites"]);
      }
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the review.",
      });
    },
  });

  const handleDeleteReview = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d96c4e",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate(id);
      }
    });
  };
  //   console.log(data);
  if (isLoading) return <UniversalSpinner />;
  if (isError) return <ComponentError error={error} refetch={refetch} />;
  return (
    <div
      data-aos="zoom-in-up"
      className="container mx-auto my-12 lg:my-20 px-4"
    >
      <title>My Favorites - TasteTribe</title>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-secondary">My Favorites</h2>
        <p className="mt-2 text-base-content/80">
          A collection of the best dishes you've saved.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center flex flex-col items-center my-16 bg-base-200 p-8 rounded-lg">
          <p className="text-xl text-base-content/70">
            You haven't added any favorites yet.
          </p>
          <p className="mt-2 mb-4 text-base-content/50">
            Click the heart icon on a review to save it here!
          </p>
          <Link to="/all-reviews">
            <GeneralBtn>Find Reviews to Love</GeneralBtn>
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 p-4 rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="text-sm text-secondary uppercase">
              <tr>
                <th>Food</th>
                <th>Restaurant</th>
                <th>Original Reviewer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((review) => (
                <tr key={review._id} className="hover">
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={review.foodImage} alt={review.foodName} />
                        </div>
                      </div>
                      <div>
                        <Link
                          to={`/review-details/${review.reviewId}`}
                          className="font-bold hover:text-primary"
                        >
                          {review.foodName}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td>{review.restaurantName}</td>
                  <td>{review.reviewerName}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="btn btn-ghost btn-sm text-red-500"
                      aria-label="Remove from favorites"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyFavorites;
