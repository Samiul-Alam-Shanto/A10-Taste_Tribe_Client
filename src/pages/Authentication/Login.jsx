import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogIn = (data) => {
    const { email, password } = data;

    signIn(email, password)
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("SignIn  Successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("SignIn with Google Successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div>
      <title>Authentication - TasteTribe</title>
      <div>
        <form onSubmit={handleSubmit(handleLogIn)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative mb-0">
            <label className="block text-sm font-medium text-base-content mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
              {...register("password", { required: "Password is required" })}
            />
            <span
              className="cursor-pointer right-5 bottom-3 absolute z-5"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Link className="text-sm text-base-content hover:text-primary">
              Forgot Password?
            </Link>
          </div>
          <Button>Login</Button>
        </form>
      </div>

      <div className="text-center">
        <div className="divider text-secondary">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn custom-gradient text-primary-content w-full border-base-300"
        >
          <FaGoogle />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
