import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUserEdit,
  FaCamera,
  FaIdCard,
  FaCrown,
  FaUserShield,
  FaUtensils,
} from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/Axios/useAxiosSecure";
import toast from "react-hot-toast";
import GeneralBtn from "../../../components/Buttons/GeneralBtn";
import UniversalSpinner from "../../../components/LoadingAnimations/UniversalSpinner";

const EditProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // 1. Fetch Mongo User Data (To get Role & Package info)
  const { data: dbUser, isLoading } = useQuery({
    queryKey: ["user_profile", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  // Local state for live preview (Visual only)
  const [previewImage, setPreviewImage] = useState(user?.photoURL);
  const [previewName, setPreviewName] = useState(user?.displayName);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      photoURL: user?.photoURL || "",
    },
  });

  // Watch inputs for live preview updates
  const watchedPhoto = watch("photoURL");
  const watchedName = watch("name");

  useEffect(() => {
    if (watchedPhoto) setPreviewImage(watchedPhoto);
    if (watchedName) setPreviewName(watchedName);
  }, [watchedPhoto, watchedName]);

  const mutation = useMutation({
    mutationFn: async (data) => {
      // 1. Update Firebase Auth (Client Side)
      await updateUserProfile(data.name, data.photoURL);

      // 2. Update Database (Server Side)
      const res = await axiosSecure.patch(`/users/${user.email}`, {
        name: data.name,
        photoURL: data.photoURL,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Identity updated successfully!");
      queryClient.invalidateQueries(["user_profile"]);
    },
    onError: (err) => {
      toast.error("Failed to update profile.", err);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  // --- BADGE LOGIC ---
  const getBadgeConfig = () => {
    if (dbUser?.role === "admin")
      return { label: "Admin", color: "badge-error", icon: <FaUserShield /> };
    if (dbUser?.role === "premium")
      return {
        label: dbUser?.package || "Premium",
        color: "badge-warning",
        icon: <FaCrown />,
      };
    return { label: "Foodie", color: "badge-ghost", icon: <FaUtensils /> };
  };

  const badge = getBadgeConfig();

  if (isLoading) return <UniversalSpinner />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 font-sans">
      <title>Edit Profile - TasteTribe</title>

      <div className="w-full max-w-5xl bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden border border-base-200 flex flex-col lg:flex-row">
        {/* --- LEFT: THE ID CARD PREVIEW --- */}
        <div className="lg:w-2/5 bg-secondary text-secondary-content p-12 flex flex-col items-center justify-center relative overflow-hidden">
          {/* Background Texture */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)",
              backgroundSize: "20px 20px",
            }}
          ></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center w-full">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-6 block">
              Live Preview
            </span>

            {/* ID Card Visual */}
            <motion.div
              layout
              className="bg-base-100/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl shadow-xl w-full max-w-sm mx-auto"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="w-full h-full rounded-full object-cover border-4 border-primary shadow-lg bg-base-300"
                  onError={(e) => {
                    e.target.src = "https://i.ibb.co/5GzXkwq/user.png";
                  }} // Fallback
                />
                <div className="absolute bottom-0 right-0 bg-accent text-secondary p-2 rounded-full shadow-md">
                  <FaIdCard size={14} />
                </div>
              </div>

              <h2 className="text-2xl font-black text-white truncate px-2">
                {previewName || "Your Name"}
              </h2>
              <p className="text-white/60 text-sm font-medium mt-1 truncate px-2">
                {user?.email}
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 flex justify-center gap-2">
                {/* DYNAMIC ROLE BADGE */}
                <span
                  className={`badge badge-lg gap-2 ${badge.color} border-none text-secondary font-bold`}
                >
                  {badge.icon} {badge.label}
                </span>
                <span className="badge badge-outline text-white/80 badge-lg">
                  Verified
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* --- RIGHT: THE EDIT FORM --- */}
        <div className="lg:w-3/5 p-8 md:p-12 bg-base-100">
          <div className="mb-10">
            <h1 className="text-4xl font-black text-secondary mb-2 flex items-center gap-3">
              <FaUserEdit className="text-primary" /> Edit Profile
            </h1>
            <p className="text-base-content/60 text-lg">
              Update your public persona.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-secondary text-sm uppercase tracking-wider">
                  Display Name
                </span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                placeholder="What should we call you?"
                className="input input-lg bg-base-200 border-transparent focus:border-primary focus:bg-base-100 rounded-2xl w-full transition-all text-secondary font-medium"
              />
              {errors.name && (
                <span className="text-error text-xs mt-2 font-bold">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Photo Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold text-secondary text-sm uppercase tracking-wider">
                  Profile Picture URL
                </span>
              </label>
              <div className="relative">
                <input
                  {...register("photoURL", {
                    required: "Photo URL is required",
                  })}
                  type="url"
                  placeholder="https://..."
                  className="input input-lg bg-base-200 border-transparent focus:border-primary focus:bg-base-100 rounded-2xl w-full transition-all pr-12 text-secondary font-medium"
                />
                <FaCamera className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30" />
              </div>
              {errors.photoURL && (
                <span className="text-error text-xs mt-2 font-bold">
                  {errors.photoURL.message}
                </span>
              )}
              <label className="label">
                <span className="label-text-alt text-base-content/50">
                  Paste a direct link to an image (Unsplash, ImgBB, etc.)
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="pt-6 flex items-center justify-end gap-4">
              <button
                type="button"
                onClick={() => {
                  setPreviewName(user?.displayName);
                  setPreviewImage(user?.photoURL);
                }}
                className="btn btn-ghost rounded-full text-base-content/60 hover:bg-base-200 font-bold"
              >
                Reset
              </button>

              <div className="w-auto">
                <GeneralBtn type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Saving..." : "Save Profile"}
                </GeneralBtn>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
