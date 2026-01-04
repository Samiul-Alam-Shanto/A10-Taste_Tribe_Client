import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaMapMarkedAlt,
} from "react-icons/fa";
import logo from "../assets/TasteTribe_Logo.png";
import AuthBtn from "./Buttons/AuthBtn";
import LogoutBtn from "./Buttons/LogoutBtn";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import useThemeToggle from "../hooks/useThemeToggle";

const Navbar = () => {
  const { user, logOut, userRole } = useAuth();
  const { theme, toggleTheme } = useThemeToggle();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const location = useLocation();

  // Handle Scroll Effect (Shadow & Padding)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleLogOut = () => {
    logOut()
      .then(() => toast.success("Logged Out Successfully"))
      .catch((error) => toast.error(error.message));
  };

  // --- NAV LINKS CONFIGURATION ---
  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Reviews",
      path: "/all-reviews",
      dropdown: [
        { name: "Browse All", path: "/all-reviews" },
        // Points to Dashboard Add Review (Protected)
        { name: "Add Review", path: "/dashboard/add-review" },
      ],
    },
    {
      name: "Coverage",
      path: "/coverage",
      highlight: true, // Special styling
    },
    {
      name: "Community",
      path: "/leaderboard",
      dropdown: [
        { name: "Tribe Leaders", path: "/leaderboard" },
        { name: "Foodie Blog", path: "/blog" },
        { name: "Guidelines", path: "/community-guidelines" },
      ],
    },
    { name: "About", path: "/about-us" },
    { name: "Contact", path: "/contact-us" },
  ];

  return (
    <>
      {/* --- MAIN NAVBAR --- */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            isScrolled
              ? "bg-base-100/95 backdrop-blur-md shadow-md py-3 border-b border-base-300"
              : "bg-base-100 py-5 border-b-2 border-transparent"
          }
        `}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* 1. LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={logo}
              alt="TasteTribe"
              className="w-10 h-10 object-contain transition-transform group-hover:rotate-12"
            />
            <span className="font-bold text-2xl text-secondary tracking-tight">
              Taste<span className="text-gradient">Tribe</span>
            </span>
          </Link>

          {/* 2. DESKTOP MENU */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group h-full flex items-center"
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => `
                    flex items-center gap-1 font-medium text-sm tracking-wide transition-colors duration-300
                    ${
                      link.highlight
                        ? "text-primary font-bold"
                        : "text-base-content hover:text-primary"
                    }
                    ${
                      isActive && !link.highlight
                        ? "text-primary font-semibold"
                        : ""
                    }
                  `}
                >
                  {link.highlight && <FaMapMarkedAlt className="mb-1" />}
                  {link.name}
                  {link.dropdown && (
                    <FaChevronDown
                      size={10}
                      className="mt-0.5 group-hover:rotate-180 transition-transform duration-300"
                    />
                  )}
                </NavLink>

                {/* Dropdown Menu */}
                {link.dropdown && (
                  <AnimatePresence>
                    {hoveredLink === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full -left-4 pt-4 w-48"
                      >
                        <div className="bg-base-100 rounded-xl shadow-xl border border-base-300 overflow-hidden p-2">
                          {link.dropdown.map((subItem) => (
                            <NavLink
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-2 text-sm text-base-content rounded-lg hover:bg-base-200 hover:text-primary transition-colors"
                            >
                              {subItem.name}
                            </NavLink>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* 3. RIGHT SIDE ACTIONS */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Toggle */}
            <label className="swap swap-rotate text-base-content hover:text-primary transition-colors">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <FaSun className="swap-on w-5 h-5" />
              <FaMoon className="swap-off w-5 h-5" />
            </label>

            {/* Auth State */}
            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border-2 border-primary hover:border-accent transition-colors"
                >
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-1 p-2 shadow-xl menu menu-sm dropdown-content bg-base-100 rounded-xl w-52 border border-base-300"
                >
                  <li className="menu-title text-base-content/60 uppercase text-xs tracking-wider">
                    Hello, {user.displayName?.split(" ")[0]}
                  </li>
                  <li>
                    <Link
                      to={`${
                        userRole == "admin"
                          ? "/dashboard/admin-home"
                          : "/dashboard/user-home"
                      }`}
                      className="hover:text-primary hover:bg-base-200"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/edit-profile"
                      className="hover:text-primary hover:bg-base-200"
                    >
                      Edit Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/add-review"
                      className="hover:text-primary hover:bg-base-200"
                    >
                      Add Review
                    </Link>
                  </li>
                  <div className="divider my-1 border-base-200"></div>
                  <li
                    onClick={handleLogOut}
                    className="flex justify-center pt-1"
                  >
                    <LogoutBtn />
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex">
                <Link to="/auth">
                  <AuthBtn>Login</AuthBtn>
                </Link>
              </div>
            )}
          </div>

          {/* 4. MOBILE HAMBURGER */}
          <button
            className="lg:hidden text-secondary text-2xl"
            onClick={() => setMobileMenuOpen(true)}
          >
            <FaBars />
          </button>
        </div>
      </motion.nav>

      {/* --- MOBILE DRAWER (Slide In) --- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer Content */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-base-100 z-70 shadow-2xl p-6 overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-bold text-xl text-secondary">Menu</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-secondary text-2xl hover:text-primary"
                >
                  <FaTimes />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <div
                    key={link.name}
                    className="border-b border-base-300 pb-2"
                  >
                    {link.dropdown ? (
                      <div className="collapse collapse-arrow bg-transparent">
                        <input type="checkbox" />
                        <div className="collapse-title font-bold text-lg text-secondary px-0 min-h-0 py-2">
                          {link.name}
                        </div>
                        <div className="collapse-content px-0">
                          <div className="flex flex-col gap-2 pl-4 border-l-2 border-primary/20">
                            {link.dropdown.map((sub) => (
                              <NavLink
                                key={sub.name}
                                to={sub.path}
                                className="text-base-content/80 py-2 hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {sub.name}
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) => `
                          block text-lg font-bold py-3
                          ${isActive ? "text-primary" : "text-secondary"}
                        `}
                      >
                        {link.name}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Auth & Theme */}
              <div className="mt-8 space-y-4">
                <div className="flex justify-between items-center bg-base-200 p-4 rounded-xl">
                  <span className="font-medium text-secondary">Appearance</span>
                  <label className="swap swap-rotate text-primary">
                    <input
                      type="checkbox"
                      onChange={toggleTheme}
                      checked={theme === "dark"}
                    />
                    <FaSun className="swap-on w-6 h-6" />
                    <FaMoon className="swap-off w-6 h-6" />
                  </label>
                </div>

                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 mb-2 p-2 rounded-lg bg-base-200/50">
                      <img
                        src={user.photoURL}
                        alt="user"
                        className="w-12 h-12 rounded-full border-2 border-primary"
                      />
                      <div>
                        <p className="font-bold text-secondary">
                          {user.displayName}
                        </p>
                        <Link
                          to="/dashboard/edit-profile"
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-primary font-bold underline"
                        >
                          Edit Profile
                        </Link>
                      </div>
                    </div>
                    <Link
                      to={`${
                        userRole == "admin"
                          ? "/dashboard/admin-home"
                          : "/dashboard/user-home"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn btn-outline border-primary text-primary hover:bg-primary hover:text-white w-full"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => {
                        handleLogOut();
                        setMobileMenuOpen(false);
                      }}
                      className="btn btn-error w-full text-white"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block"
                  >
                    <div className="w-full btn bg-primary text-white hover:bg-secondary border-none shadow-md">
                      Login / Signup
                    </div>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
