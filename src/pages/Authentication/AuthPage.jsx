import React from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 ">
      <div className="bg-white w-[90%] max-w-3xl rounded-md shadow-md flex flex-col md:flex-row overflow-hidden">
        {/* Left Side */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 text-center">
          <h1 className="text-3xl font-bold text-gradient mb-3">TasteTribe</h1>
          <p className="text-base-content text-sm max-w-sm">
            TasteTribe is your gateway to local flavors! Discover hidden gems,
            share your stories, and connect with food lovers nearby.
          </p>
        </div>

        {/* Right Side */}
        <div className="flex-1 bg-white border-t md:border-t-0 md:border-l border-gray-200 p-8">
          {/* Tabs */}
          <div role="tablist" className="tabs tabs-lifted justify-center mb-6">
            <input
              type="radio"
              name="auth_tab"
              role="tab"
              className="tab text-sm font-medium text-primary
                [--tab-border-color:transparent] 
                checked:[--tab-border-color:#a51b5c]
                checked:bg-linear-to-r from-[#d96c4e] to-[#fbbf2490]
                checked:text-white
                transition-all duration-300 rounded-xl"
              aria-label="Log in"
              defaultChecked
            />
            <div
              role="tabpanel"
              className="tab-content bg-white border-base-300 p-4 mt-2 rounded-box"
            >
              <Login />
            </div>

            <input
              type="radio"
              name="auth_tab"
              role="tab"
              className="tab text-sm font-medium text-primary
                [--tab-border-color:transparent] 
                checked:[--tab-border-color:#a51b5c]
                checked:bg-linear-to-r from-[#d96c4e] to-[#fbbf2490]
                checked:text-white
                transition-all duration-300 rounded-xl"
              aria-label="Sign up"
            />
            <div
              role="tabpanel"
              className="tab-content bg-white border-base-300 p-4 mt-2 rounded-box"
            >
              {/* Register Form */}
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
