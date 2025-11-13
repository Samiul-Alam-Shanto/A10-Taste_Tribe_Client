import React from "react";
import { FaLeaf, FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../assets/TasteTribe_Logo.png";
import AuthBtn from "./Buttons/AuthBtn";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import LogoutBtn from "./Buttons/LogoutBtn";
import { Slide } from "react-awesome-reveal";
import useThemeToggle from "../hooks/useThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { theme, toggleTheme } = useThemeToggle();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logged Out Successfully");
      })
      .catch((error) => toast.error(error.message));
  };

  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-reviews">All Reviews</NavLink>
      </li>
      <li>
        <NavLink to="/add-review">Add Review</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed z-10 w-full bg-base-300 ">
      <Slide direction="down" triggerOnce duration={1200}>
        <div className="navbar container  mx-auto  text-white">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn  custom-gradient lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="navLinks menu menu-sm dropdown-content mt-3 z-1 space-y-1  p-2 shadow  bg-linear-to-br from-[#d96c4e] to-[#fbbf2490] rounded-box w-52 text-primary-content"
              >
                {links}
                <label className="swap px-2 sm:hidden flex justify-start items-start swap-rotate">
                  <input
                    type="checkbox"
                    onChange={toggleTheme}
                    checked={theme === "dark"}
                  />
                  <FaSun className="swap-on fill-current w-6 h-6" />
                  <FaMoon className="swap-off text-black w-6 h-6 -ml-6" />
                </label>
              </ul>
            </div>
            <Link
              to="/"
              className="flex items-center text-primary normal-case text-xl animate__animated animate__fadeInLeft"
            >
              <img src={logo} alt="logo" className="w-10 " />
              <span className="font-bold text-2xl text-gradient">
                TasteTribe
              </span>
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex animate__animated animate__fadeInDown">
            <ul className="navLinks menu menu-horizontal space-x-1 px-1 text-base-content">
              {links}
            </ul>
          </div>

          <div className="navbar-end">
            <label className="swap px-2 hidden sm:flex swap-rotate">
              <input
                type="checkbox"
                onChange={toggleTheme}
                checked={theme === "dark"}
              />
              <FaSun className="swap-on fill-current w-6 h-6" />
              <FaMoon className="swap-off text-black w-6 h-6 -ml-6" />
            </label>
            {user ? (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                    <img src={user.photoURL} alt={user.displayName} />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-linear-to-br from-[#d96c4e] to-[#fbbf2490] mt-1 z-1 p-2 shadow  rounded-xl w-52 text-primary-content "
                >
                  <li>
                    <Link
                      to="/add-review"
                      className="justify-between hover:bg-linear-to-r from-[#d96c4e] to-[#fbbf2490]"
                    >
                      Add Review
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-reviews"
                      className="justify-between hover:bg-linear-to-r from-[#d96c4e] to-[#fbbf2490]"
                    >
                      My Reviews
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-favorites"
                      className="justify-between hover:bg-linear-to-r from-[#d96c4e] to-[#fbbf2490]"
                    >
                      My Favorites
                    </Link>
                  </li>

                  <span className="w-5" onClick={handleLogOut}>
                    <LogoutBtn />
                  </span>
                </ul>
              </div>
            ) : (
              <div className="animate__animated animate__fadeInRight flex">
                <Link to="/auth">
                  <AuthBtn>Login</AuthBtn>
                </Link>
              </div>
            )}
          </div>
        </div>
      </Slide>
    </div>
  );
};

export default Navbar;
