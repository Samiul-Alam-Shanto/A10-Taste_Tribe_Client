import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";
import AuthBtn from "../../components/Buttons/AuthBtn";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { errorMessage } from "../Errors/errorMessage";

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
        const errorCode = error.code;
        toast.error(errorMessage(errorCode));
      });
  };

  const handleGoogleSignIn = () => {
    googleSignIn()
      .then(() => {
        navigate(`${location.state ? location.state : "/"}`);
        toast.success("SignIn with Google Successfully");
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorMessage(errorCode));
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

          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                    message:
                      "Password must include both uppercase and lowercase letters",
                  },
                })}
              />
              <span
                className="cursor-pointer right-5 bottom-3 absolute z-5"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
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
          <AuthBtn>Login</AuthBtn>
        </form>
      </div>

      <div className="text-center">
        <div className="divider text-secondary">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn custom-gradient text-primary-content rounded-xl w-full border-base-300"
        >
          <FaGoogle />
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
