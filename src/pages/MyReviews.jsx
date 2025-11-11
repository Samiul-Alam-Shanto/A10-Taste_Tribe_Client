import React from "react";
import useAuth from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../hooks/Axios/useAxiosPublic";
import { Link } from "react-router";
import { FaEdit, FaTrash } from "react-icons/fa";
import GeneralBtn from "../components/Buttons/GeneralBtn";
import UniversalSpinner from "../components/LoadingAnimations/UniversalSpinner";
import ComponentError from "./Errors/ComponentError";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();

  const {
    data = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["my_reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/my-reviews?email=${user.email}`);
      //   console.log(res);
      return res.data;
    },
  });

  if (isLoading) return <UniversalSpinner />;
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <div className="container mx-auto my-12 px-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-secondary">My Reviews</h2>
        <p className="mt-2 text-base-content/80">
          Manage and see all the food experiences you've shared.
        </p>
      </div>

      {data.length === 0 ? (
        <div className="text-center flex flex-col items-center my-16 bg-base-200 p-8 rounded-lg">
          <p className="text-xl text-base-content/70">
            You haven't added any reviews yet.
          </p>
          <p className="mt-2 mb-4 text-base-content/50">
            Why not share your first food experience?
          </p>
          <GeneralBtn>
            <Link to="/add-review">Add a Review</Link>
          </GeneralBtn>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 p-4 rounded-lg shadow-lg">
          <table className="table table-zebra w-full">
            <thead className="text-sm text-secondary uppercase">
              <tr>
                <th>Food</th>
                <th>Restaurant Name</th>
                <th>Posted Date</th>
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
                        <div className="font-bold">{review.foodName}</div>
                      </div>
                    </div>
                  </td>
                  <td>{review.restaurantName}</td>
                  <td>{new Date(review.postedDate).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <Link
                      className="btn btn-ghost btn-sm text-secondary"
                      aria-label="Edit review"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="btn btn-ghost btn-sm text-red-500"
                      aria-label="Delete review"
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

export default MyReviews;
