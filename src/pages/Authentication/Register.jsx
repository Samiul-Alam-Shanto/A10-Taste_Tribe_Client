import React from "react";
import { useNavigate } from "react-router";
import AuthBtn from "../../components/Buttons/AuthBtn";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const { createUser, updateUserProfile, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const handleSignUp = (data) => {
    const { name, email, photoURL, password } = data;
    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              placeholder="Enter your photo URL"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
              {...register("photoURL", { required: "Photo URL is required" })}
            />
            {errors.photoURL && (
              <p className="text-red-500 text-xs mt-1">
                {errors.photoURL.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[a-z])/,
                  message:
                    "Password must include one uppercase and lowercase letter",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "The passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <AuthBtn>Sign Up</AuthBtn>
        </form>
      </div>

      <div className="text-center">
        <div className="divider text-base-content">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn custom-gradient rounded-xl text-primary-content w-full border-[#e5e5e5]"
        >
          <FaGoogle />
          SignUp with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
