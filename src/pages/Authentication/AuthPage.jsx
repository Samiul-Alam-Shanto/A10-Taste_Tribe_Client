import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Login";
import Register from "./Register";
import logo from "../../assets/TasteTribe_Logo.png";
import { Link } from "react-router";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuth = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <title>{isLogin ? "Login" : "Join"} - TasteTribe</title>

      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 bg-texture opacity-30 pointer-events-none"></div>
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] animate-pulse delay-1000"></div>

      {/* THE MAIN CARD */}
      <div className="relative w-full max-w-[1000px] min-h-[650px] bg-base-100 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-base-300">
        {/* --- MOBILE TOGGLE (Visible only on small screens) --- */}
        <div className="md:hidden absolute top-6 right-6 z-50">
          <button
            onClick={toggleAuth}
            className="text-sm font-bold text-primary underline"
          >
            {isLogin ? "Need an account?" : "Have an account?"}
          </button>
        </div>

        {/* --- FORM SECTION (Left for Login, Right for Register - conceptually) --- */}
        {/* We use absolute positioning and motion to slide the content */}

        {/* LEFT PANEL (LOGIN FORM) */}
        <motion.div
          className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center absolute top-0 bottom-0 left-0 z-10 transition-all duration-700 ease-in-out ${
            isLogin
              ? "opacity-100 translate-x-0 z-20"
              : "opacity-0 -translate-x-full z-0 pointer-events-none"
          }`}
        >
          <div className="h-full flex flex-col justify-center">
            <Link to="/" className="w-12 mb-8 md:hidden">
              <img src={logo} alt="logo" />
            </Link>
            <Login />
          </div>
        </motion.div>

        {/* RIGHT PANEL (REGISTER FORM) */}
        <motion.div
          className={`w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center absolute top-0 bottom-0 left-0 md:left-1/2 z-10 transition-all duration-700 ease-in-out ${
            !isLogin
              ? "opacity-100 translate-x-0 z-20"
              : "opacity-0 translate-x-full z-0 pointer-events-none"
          }`}
        >
          <div className="h-full flex flex-col justify-center">
            <Link to="/" className="w-12 mb-8 md:hidden">
              <img src={logo} alt="logo" />
            </Link>
            <Register />
          </div>
        </motion.div>

        {/* --- THE SLIDING ART PANEL (OVERLAY) --- */}
        <motion.div
          initial={false}
          animate={{ x: isLogin ? "100%" : "0%" }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="hidden md:flex absolute top-2 bottom-2 w-[calc(50%-8px)] rounded-[2.5rem] bg-secondary z-30 overflow-hidden text-secondary-content flex-col items-center justify-center text-center p-12 shadow-2xl"
          style={{ left: "4px" }} // Initial offset for padding look
        >
          {/* Background Image inside the slider */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <motion.div
            animate={{ scale: isLogin ? 1 : 1.1 }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1974')",
            }}
          />

          {/* Content that changes based on state */}
          <div className="relative z-20">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div
                  key="login-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-5xl font-black tracking-tight text-white">
                    Hello,
                    <br />
                    Foodie!
                  </h2>
                  <p className="text-white/80 text-lg">
                    New to our community? Start your journey to delicious
                    discoveries today.
                  </p>
                  <button
                    onClick={toggleAuth}
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary rounded-full px-10"
                  >
                    Create Account
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="register-text"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-5xl font-black tracking-tight text-white">
                    Welcome
                    <br />
                    Back!
                  </h2>
                  <p className="text-white/80 text-lg">
                    Already a member of the tribe? Log in to see what's
                    trending.
                  </p>
                  <button
                    onClick={toggleAuth}
                    className="btn btn-outline border-white text-white hover:bg-white hover:text-secondary rounded-full px-10"
                  >
                    Sign In
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
