import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle, FaArrowRight } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/Axios/useAxiosPublic";
import { errorMessage } from "../Errors/errorMessage";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = (data) => {
    signIn(data.email, data.password)
      .then(() => {
        toast.success("Welcome back!");
        const fromLocation = location.state?.from;
        const targetPath = fromLocation?.pathname || "/";
        const targetState = fromLocation?.state || null;

        navigate(targetPath, { state: targetState, replace: true });
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
            toast.success("Welcome back!");
            const fromLocation = location.state?.from;
            const targetPath = fromLocation?.pathname || "/";
            const targetState = fromLocation?.state || null;

            navigate(targetPath, { state: targetState, replace: true });
          });
      })
      .catch((err) => toast.error(errorMessage(err.code)));
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-secondary mb-2">Sign In</h2>
        <div className="h-1 w-12 bg-primary rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit(handleLogIn)} className="space-y-6">
        <div className="space-y-1">
          <label className="text-xs font-bold text-base-content/50 uppercase tracking-widest ml-4">
            Email
          </label>
          <input
            type="email"
            placeholder="chef@tastetribe.com"
            className="input input-lg w-full bg-base-200/50 border-none focus:ring-2 focus:ring-primary/50 rounded-3xl transition-all"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <span className="text-error text-xs ml-4 font-bold">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="space-y-1 relative">
          <label className="text-xs font-bold text-base-content/50 uppercase tracking-widest ml-4">
            Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            className="input input-lg w-full bg-base-200/50 border-none focus:ring-2 focus:ring-primary/50 rounded-3xl transition-all pr-12"
            {...register("password", { required: "Password is required" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-[2.2rem] text-base-content/40 hover:text-primary transition-colors"
          >
            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
          </button>
          {errors.password && (
            <span className="text-error text-xs ml-4 font-bold">
              {errors.password.message}
            </span>
          )}
          <div className="text-right mt-1 mr-2">
            <span className="text-xs font-bold text-primary cursor-pointer hover:underline">
              Forgot?
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-lg w-full rounded-full bg-secondary text-secondary-content hover:bg-primary border-none shadow-lg group"
        >
          Start Eating{" "}
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      <div className="divider my-8 text-base-content/20 font-bold text-xs">
        SOCIAL ACCESS
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-lg btn-outline w-full rounded-full border-base-300 hover:bg-base-200 hover:border-base-300 text-secondary normal-case gap-3"
      >
        <FaGoogle className="text-red-500" /> Continue with Google
      </button>
    </div>
  );
};

export default Login;
