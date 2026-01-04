import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import GeneralBtn from "../Buttons/GeneralBtn";
import { FaMapMarkedAlt, FaLocationArrow } from "react-icons/fa";

const CoveragePreview = () => {
  return (
    <section className="py-32 px-4 bg-secondary overflow-hidden relative flex items-center justify-center">
      {/* Dynamic Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#ffffff 2px, transparent 2px)",
          backgroundSize: "30px 30px",
        }}
      ></div>

      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-16 relative z-10">
        {/* Text Content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left text-secondary-content">
          <span className="inline-block py-1 px-3 rounded-full bg-accent text-secondary font-bold text-sm uppercase tracking-widest mb-6">
            Expansion
          </span>
          <h2 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            We Are <br />{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
              Everywhere.
            </span>
          </h2>
          <p className="text-xl opacity-80 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
            From the busy streets of Downtown to the quiet corners of the
            Suburbs. Check if your district is covered by TasteTribe.
          </p>
          <Link to="/coverage">
            <GeneralBtn>Explore Active Zones</GeneralBtn>
          </Link>
        </div>

        {/* The 3D Map Card */}
        <motion.div
          initial={{ rotateY: 20, rotateX: 10, opacity: 0 }}
          whileInView={{ rotateY: -10, rotateX: 5, opacity: 1 }}
          whileHover={{ rotateY: 0, rotateX: 0, scale: 1.02 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          <div className="relative bg-base-100 p-2 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-base-100/20 backdrop-blur-sm">
            {/* Browser Header Visual */}
            <div className="h-12 bg-base-200 rounded-t-4xl flex items-center px-6 gap-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 flex-1 bg-base-100 h-6 rounded-full opacity-50 text-[10px] flex items-center px-3 text-base-content/40 font-mono">
                tastetribe.com/map
              </div>
            </div>

            {/* Map Image */}
            <div className="relative overflow-hidden rounded-3xl group">
              <img
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80"
                alt="Map Coverage"
                className="w-full h-[400px] object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Floating Pins */}
              <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                <FaMapMarkedAlt size={24} />
              </div>
              <div className="absolute top-1/3 right-1/4 w-8 h-8 bg-accent rounded-full shadow-lg animate-pulse delay-75"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoveragePreview;
