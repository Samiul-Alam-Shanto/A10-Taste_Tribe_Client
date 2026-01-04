import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserShield, FaUser, FaTrashAlt, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import UniversalSpinner from "../../../components/LoadingAnimations/UniversalSpinner";
import ComponentError from "../../Errors/ComponentError";

const ManageUsers = () => {
  const { user: currentUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Mutations (Keep existing logic, just cleaner)
  const roleMutation = useMutation({
    mutationFn: ({ id, role }) => axiosSecure.patch(`/users/${role}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosSecure.delete(`/users/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
      Swal.fire({
        icon: "success",
        title: "User Deleted",
        timer: 1500,
        showConfirmButton: false,
      });
    },
  });

  const handleRoleChange = (user) => {
    const newRole = user.role === "admin" ? "user" : "admin";
    Swal.fire({
      title: `Make ${newRole}?`,
      text: `Change role for ${user.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d96c4e",
    }).then((res) => {
      if (res.isConfirmed) roleMutation.mutate({ id: user._id, role: newRole });
    });
  };

  if (isLoading) return <UniversalSpinner />;
  if (isError) return <ComponentError error={error} refetch={refetch} />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 border-b border-base-300 pb-6">
        <div>
          <h1 className="text-4xl font-black text-secondary">Tribe Members</h1>
          <p className="text-base-content/60 mt-1">
            Manage permissions and access.
          </p>
        </div>
        <div className="bg-base-200 px-4 py-2 rounded-full font-bold text-secondary text-sm">
          Total Users: {users.length}
        </div>
      </div>

      {/* Roster Table */}
      <div className="overflow-x-auto bg-base-100 rounded-4xl shadow-sm border border-base-200">
        <table className="table w-full">
          {/* Head */}
          <thead className="bg-base-200/50 text-base-content/50 uppercase text-xs tracking-widest font-bold">
            <tr>
              <th className="py-6 pl-8">User Profile</th>
              <th>Current Role</th>
              <th>Status</th>
              <th className="text-right pr-8">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-base-200/30 transition-colors border-b border-base-100 last:border-none group"
              >
                <td className="pl-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={user.photoURL}
                          alt={user.name}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-secondary text-lg">
                        {user.name}
                      </div>
                      <div className="text-sm opacity-50 font-mono">
                        {user.email}
                      </div>
                    </div>
                  </div>
                </td>

                <td>
                  <button
                    onClick={() =>
                      currentUser?.email !== user.email &&
                      handleRoleChange(user)
                    }
                    className={`badge badge-lg gap-2 border-none font-bold text-white shadow-md cursor-pointer hover:scale-105 transition-transform ${
                      user.role === "admin" ? "bg-primary" : "bg-gray-400"
                    }`}
                    disabled={currentUser?.email === user.email}
                  >
                    {user.role === "admin" ? <FaUserShield /> : <FaUser />}
                    {user.role === "admin" ? "Admin" : "User"}
                  </button>
                </td>

                <td>
                  <span className="text-xs font-bold text-success bg-success/10 px-3 py-1 rounded-full">
                    Active
                  </span>
                </td>

                <td className="text-right pr-8">
                  <button
                    onClick={() => deleteMutation.mutate(user._id)}
                    disabled={currentUser?.email === user.email}
                    className="btn btn-ghost btn-circle text-error hover:bg-error/10 disabled:opacity-20"
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
