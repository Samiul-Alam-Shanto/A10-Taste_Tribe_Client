import React from "react";
import { FaGoogle, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/Axios/useAxiosPublic";
import { errorMessage } from "../Errors/errorMessage";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const handleSignUp = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        updateUserProfile(data.name, data.photoURL).then(() => {
          axiosPublic
            .post("/users", {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
            })
            .then(() => {
              toast.success("Account created successfully!");
              navigate("/");
            });
        });
      })
      .catch((err) => toast.error(errorMessage(err.code)));
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then((res) => {
        axiosPublic
          .post("/users", {
            name: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL,
          })
          .then(() => {
            toast.success("Welcome to the Tribe!");
            navigate("/");
          });
      })
      .catch((err) => toast.error(errorMessage(err.code)));
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-8">
        <h2 className="text-4xl font-black text-secondary mb-2">
          Create Account
        </h2>
        <div className="h-1 w-12 bg-accent rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
        <div className="space-y-1">
          <input
            type="text"
            placeholder="Full Name"
            className="input input-lg w-full bg-base-200/50 border-none focus:ring-2 focus:ring-accent/50 rounded-3xl"
            {...register("name", { required: "Required" })}
          />
          {errors.name && (
            <span className="text-error text-xs ml-4 font-bold">
              {errors.name.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="url"
            placeholder="Photo URL"
            className="input input-lg w-full bg-base-200/50 border-none focus:ring-2 focus:ring-accent/50 rounded-3xl"
            {...register("photoURL", { required: "Required" })}
          />
          {errors.photoURL && (
            <span className="text-error text-xs ml-4 font-bold">
              {errors.photoURL.message}
            </span>
          )}
        </div>

        <div className="space-y-1">
          <input
            type="email"
            placeholder="Email Address"
            className="input input-lg w-full bg-base-200/50 border-none focus:ring-2 focus:ring-accent/50 rounded-3xl"
            {...register("email", { required: "Required" })}
          />
          {errors.email && (
            <span className="text-error text-xs ml-4 font-bold">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="password"
            placeholder="Password"
            className="input input-lg w-full bg-base-200/50 border-none focus:ring-2 focus:ring-accent/50 rounded-3xl"
            {...register("password", {
              required: "Required",
              minLength: { value: 6, message: "Min 6" },
            })}
          />

          <input
            type="password"
            placeholder="Confirm"
            className="input input-lg w-full bg-base-200/50 border-none focus:ring-2 focus:ring-accent/50 rounded-3xl"
            {...register("confirmPassword", {
              required: "Required",
              validate: (val) => val === password || "No match",
            })}
          />
        </div>

        <button
          type="submit"
          className="btn btn-lg w-full rounded-full bg-primary text-primary-content hover:bg-secondary border-none shadow-lg group mt-2"
        >
          Join the Tribe{" "}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="divider my-6 text-base-content/20 font-bold text-xs">
        OR
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-lg btn-outline w-full rounded-full border-base-300 hover:bg-base-200 hover:border-base-300 text-secondary normal-case gap-3"
      >
        <FaGoogle className="text-red-500" /> Google
      </button>
    </div>
  );
};

export default Register;
