import React from "react";
import GeneralBtn from "../Buttons/GeneralBtn";
import { FaEnvelopeOpenText } from "react-icons/fa";

const Newsletter = () => {
  return (
    <section className="py-24 px-4 bg-primary text-primary-content relative overflow-hidden">
      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent opacity-10 rounded-full translate-x-1/3 translate-y-1/3"></div>

      <div className="container mx-auto relative z-10 max-w-4xl">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-[3rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-12">
          {/* Icon Side */}
          <div className="hidden md:flex w-1/3 justify-center">
            <div className="w-32 h-32 bg-white text-primary rounded-full flex items-center justify-center text-6xl shadow-inner rotate-12">
              <FaEnvelopeOpenText />
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-2/3 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Don't Eat Alone.
            </h2>
            <p className="mb-8 text-white/90 text-lg leading-relaxed font-medium">
              Join 10,000+ foodies. Get the "Hidden Gem of the Week" delivered
              to your inbox every Friday.
            </p>

            <form className="flex flex-col gap-4">
              {/* THEME SAFE INPUT: Explicitly white bg, dark text to ensure contrast on the orange background */}
              <input
                type="email"
                placeholder="your.email@example.com"
                className="input input-lg h-16 rounded-full bg-white text-gray-800 placeholder:text-gray-400 focus:ring-4 focus:ring-accent/50 border-none w-full shadow-lg text-lg px-8"
              />
              <div className="flex justify-center md:justify-start">
                <GeneralBtn>Join the List</GeneralBtn>
              </div>
            </form>
            <p className="mt-4 text-xs opacity-70 uppercase tracking-widest font-bold">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
