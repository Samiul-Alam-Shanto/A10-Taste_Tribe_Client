import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Button from "../../components/Button";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleLogIn = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <div>
        <form onSubmit={handleLogIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-base-content mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
            />
          </div>
          <div className="relative mb-0">
            <label className="block text-sm font-medium text-base-content mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="input w-full focus:ring-2 focus:ring-[#d96c4e]"
            />
            <span
              className="cursor-pointer right-5 bottom-3  absolute z-10"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div>
            <Link className="text-sm text-base-content hover:text-primary">
              Forgot Password?
            </Link>
          </div>
          <Button>Login</Button>
        </form>
      </div>
      <div className=" text-center">
        <div className="divider text-secondary">OR</div>
        <button
          // onClick={handleGoogleLogIn}
          className="btn custom-gradient  text-primary-content w-full border-base-300"
        >
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
