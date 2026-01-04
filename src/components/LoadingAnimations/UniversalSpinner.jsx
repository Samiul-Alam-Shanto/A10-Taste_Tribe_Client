import React from "react";
import { motion } from "framer-motion";

const UniversalSpinner = () => {
  return (
    <div
      className="flex flex-col justify-center items-center min-h-[50vh] bg-transparent"
      aria-live="polite"
      role="status"
    >
      <div className="relative flex justify-center items-center w-24 h-24">
        <motion.span
          className="absolute w-full h-full border-4 border-[#d96c4e] rounded-full opacity-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.span
          className="absolute w-3/4 h-3/4 border-4 border-[#fbbf24] rounded-full opacity-40"
          animate={{ scale: [1, 1.1, 1], rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />

        <motion.div
          className="w-1/2 h-1/2 bg-[#d96c4e] rounded-full shadow-lg"
          animate={{ scale: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        className="mt-8 text-lg font-medium text-[#4a2c2a] tracking-widest uppercase"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Gathering flavors...
      </motion.p>
    </div>
  );
};

export default UniversalSpinner;
