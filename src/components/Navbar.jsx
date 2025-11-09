import React from "react";
import { FaLeaf } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import logo from "../assets/TasteTribe_Logo.png";

const Navbar = () => {
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/auth">LogIn</NavLink>
      </li>
    </>
  );

  return (
    <div className="fixed z-10 w-full bg-[#FEFBF3] text-[#383838]">
      <div className="navbar container  mx-auto  text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
              className="navLinks menu menu-sm dropdown-content mt-3 z-1 p-2 shadow  bg-linear-to-b from-[#1a2419] to-[#151a14] rounded-box w-52 text-[#383838]"
            >
              {links}
            </ul>
          </div>
          <Link
            to="/"
            className="flex items-center text-[#383838] normal-case text-xl animate__animated animate__fadeInLeft"
          >
            <img src={logo} alt="logo" className="w-10" />
            TasteTribe
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex animate__animated animate__fadeInDown">
          <ul className="navLinks menu menu-horizontal px-1 text-[#383838]">
            {links}
          </ul>
        </div>

        <div className="navbar-end">
          {/* {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={user.photoURL} alt={user.displayName} />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-linear-to-b from-[#1a2419] to-[#151a14] mt-1 z-1 p-2 shadow  rounded-b-xl w-52 text-white "
              >
                <li>
                  <Link
                    to="/profile"
                    className="justify-between hover:bg-[#7fb069]"
                  >
                    {user.displayName}
                  </Link>
                </li>
                <li>
                  <button onClick={handleLogOut} className="hover:bg-[#7fb069]">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : ( */}
          <div className="animate__animated animate__fadeInRight flex">
            <Link
              to="/auth"
              className="btn btn-outline text-white bg-[#D96C4E] mr-2"
            >
              Login
            </Link>
          </div>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
