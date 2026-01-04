import React from "react";
import { motion } from "framer-motion";
import { FaSignOutAlt } from "react-icons/fa";

const LogoutBtn = ({ onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.9 }}
      animate="rest"
      className="
        relative flex items-center justify-center
        h-10 bg-red-500 text-white
        rounded-full shadow-md overflow-hidden
        hover:bg-red-600 transition-colors
      "
    >
      <motion.div
        className="flex items-center justify-center gap-2 px-3"
        variants={{
          rest: { width: "40px" },
          hover: { width: "110px" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <FaSignOutAlt className="text-lg shrink-0" />

        <motion.span
          variants={{
            rest: { opacity: 0, x: -10, display: "none" },
            hover: { opacity: 1, x: 0, display: "block" },
          }}
          className="whitespace-nowrap font-medium text-sm"
        >
          Logout
        </motion.span>
      </motion.div>
    </motion.button>
  );
};

export default LogoutBtn;
