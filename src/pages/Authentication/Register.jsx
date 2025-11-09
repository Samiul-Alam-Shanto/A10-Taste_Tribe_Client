import React from "react";
import { Link } from "react-router";
import Button from "../../components/Button";

const Register = () => {
  const handleSignUp = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      {" "}
      <div>
        <form onSubmit={handleSignUp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Choose a username"
              className="input  w-full focus:ring-2 focus:ring-[#d96c4e]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo URL
            </label>
            <input
              type="url"
              placeholder="Enter your photo URL"
              className="input  w-full focus:ring-2 focus:ring-[#d96c4e]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="input  w-full focus:ring-2 focus:ring-[#d96c4e]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="input   w-full focus:ring-2 focus:ring-[#d96c4e]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Repeat password
            </label>
            <input
              type="password"
              placeholder="Repeat your password"
              className="input  w-full focus:ring-2 focus:ring-[#d96c4e]"
            />
          </div>
          <Button>Sign Up</Button>
        </form>
      </div>
      <div className=" text-center">
        <div className="divider text-base-content">OR</div>
        <button
          // onClick={handleGoogleLogIn}
          className="btn bg-primary text-primary-content w-full border-[#e5e5e5]"
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
          SignUp with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
