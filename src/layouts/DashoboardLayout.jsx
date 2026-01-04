import React from "react";
import { NavLink, Outlet, Link } from "react-router";
import {
  FaHome,
  FaUsers,
  FaPlus,
  FaList,
  FaHeart,
  FaTachometerAlt,
  FaBook,
  FaSignOutAlt,
  FaSun,
  FaMoon,
  FaBars,
  FaCrown,
} from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import useThemeToggle from "../hooks/useThemeToggle";
import { motion } from "framer-motion";
import logo from "../assets/TasteTribe_Logo.png";

const DashboardLayout = () => {
  const { user, isAdmin, logOut, userRole } = useAuth();
  const { theme, toggleTheme } = useThemeToggle();

  // Custom Link Component with "Glow Bar"
  const NavItem = ({ to, icon: Icon, label }) => (
    <NavLink
      to={to}
      className={({ isActive }) => `
      group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
      ${
        isActive
          ? "text-primary bg-primary/5 font-bold"
          : "text-base-content/70 hover:bg-base-200 hover:text-secondary"
      }
    `}
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator Line */}
          {isActive && (
            <motion.div
              layoutId="active-pill"
              className="absolute left-0 w-1 h-8 bg-primary rounded-r-full"
            />
          )}
          <Icon
            className={`text-xl transition-colors ${
              isActive ? "text-primary" : "group-hover:text-secondary"
            }`}
          />
          <span className="tracking-wide">{label}</span>
        </>
      )}
    </NavLink>
  );

  const sidebarContent = (
    <>
      <div className="p-6 flex items-center gap-3 mb-6">
        <img src={logo} alt="Logo" className="w-10" />
        <span className="font-black text-2xl text-secondary tracking-tight">
          Taste<span className="text-primary">Tribe</span>
        </span>
      </div>

      {/* User Mini Profile */}
      <div className="mx-4 mb-8 p-4 bg-base-200/50 rounded-2xl flex items-center gap-3 border border-base-300">
        <div className="avatar">
          <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
            <img src={user?.photoURL} alt="profile" />
          </div>
        </div>
        <div className="overflow-hidden">
          <h3 className="font-bold text-secondary truncate">
            {user?.displayName?.split(" ")[0]}
          </h3>
          <p className="text-xs text-base-content/50 uppercase tracking-wider font-bold">
            {isAdmin
              ? "Admin"
              : userRole === "premium"
              ? "Premium Member"
              : "Foodie"}
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <p className="px-4 text-xs font-bold text-base-content/40 uppercase tracking-widest mb-2 mt-4">
          Menu
        </p>

        {isAdmin ? (
          <>
            <NavItem
              to="/dashboard/admin-home"
              icon={FaTachometerAlt}
              label="Overview"
            />
            <NavItem
              to="/dashboard/manage-users"
              icon={FaUsers}
              label="Users"
            />
            <NavItem
              to="/dashboard/manage-reviews"
              icon={FaBook}
              label="Reviews"
            />
          </>
        ) : (
          <>
            <NavItem
              to="/dashboard/user-home"
              icon={FaTachometerAlt}
              label="Overview"
            />
            <NavItem
              to="/dashboard/add-review"
              icon={FaPlus}
              label="Write Review"
            />
            <NavItem
              to="/dashboard/my-reviews"
              icon={FaList}
              label="My Reviews"
            />
            <NavItem
              to="/dashboard/my-favorites"
              icon={FaHeart}
              label="Favorites"
            />
          </>
        )}

        <div className="divider my-4 px-4 opacity-50"></div>

        <NavItem to="/" icon={FaHome} label="Back Home" />
        <NavItem to="/all-reviews" icon={FaBook} label="The Feed" />
      </nav>

      {/* Footer Actions */}
      <div className="p-4 mt-auto">
        {/* Go Premium CTA - Hidden for Admins & Premium Users */}
        {!isAdmin && userRole !== "premium" && (
          <Link to="/dashboard/go-premium">
            <div className="bg-gradient-to-r from-secondary to-[#2a1a19] rounded-2xl p-4 mb-4 text-white relative overflow-hidden group cursor-pointer shadow-lg">
              <div className="relative z-10 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full">
                  <FaCrown />
                </div>
                <div>
                  <p className="font-bold text-sm">Go Premium</p>
                  <p className="text-xs text-white/70">Unlock features</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
          </Link>
        )}

        <div className="flex items-center justify-between gap-2 bg-base-100 p-2 rounded-xl border border-base-200 shadow-sm">
          <label className="swap swap-rotate btn btn-sm btn-ghost btn-circle text-secondary">
            <input
              type="checkbox"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
            <FaSun className="swap-on w-4 h-4" />
            <FaMoon className="swap-off w-4 h-4" />
          </label>
          <button
            onClick={logOut}
            className="btn btn-sm btn-ghost text-error flex-1 justify-start gap-2 hover:bg-error/10"
          >
            <FaSignOutAlt /> <span className="text-xs font-bold">Logout</span>
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="drawer lg:drawer-open font-poppins bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Page Content */}
      <div className="drawer-content flex flex-col items-center justify-start">
        {/* Mobile Header */}
        <div className="w-full navbar bg-base-100 lg:hidden shadow-sm sticky top-0 z-20 px-4">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost text-secondary"
            >
              <FaBars size={20} />
            </label>
          </div>
          <div className="flex-1 text-center">
            <span className="font-bold text-xl text-secondary">Dashboard</span>
          </div>
          <div className="flex-none">
            <div className="avatar w-8 h-8 rounded-full border border-primary">
              <img src={user?.photoURL} alt="user" className="rounded-full" />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="w-full max-w-7xl p-4 md:p-8 lg:p-10">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-30">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
        <aside className="menu p-0 w-72 min-h-full bg-base-100 text-base-content border-r border-base-200 flex flex-col">
          {sidebarContent}
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
