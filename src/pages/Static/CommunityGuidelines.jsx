import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes, FaBalanceScale } from "react-icons/fa";

const CommunityGuidelines = () => {
  return (
    <div className="bg-base-100 min-h-screen py-24 px-4 font-sans">
      <title>Guidelines - TasteTribe</title>
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary text-primary-content rounded-full flex items-center justify-center text-3xl mx-auto mb-6 shadow-xl"
          >
            <FaBalanceScale />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-black text-secondary mb-4">
            The <span className="text-primary">Code.</span>
          </h1>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            To keep TasteTribe a helpful and happy place, we ask everyone to
            follow these simple rules.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* THE DOs */}
          <div className="bg-success/5 border border-success/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
            <h2 className="text-3xl font-black text-success mb-8 flex items-center gap-3">
              <FaCheck className="border-4 border-success rounded-full p-1" />{" "}
              Do This
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="font-bold text-success/50 text-xl">01</span>
                <p className="text-base-content/80 font-medium text-lg">
                  Be honest and specific. "It was good" is boring. Tell us about
                  the texture, the spice, the service.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-success/50 text-xl">02</span>
                <p className="text-base-content/80 font-medium text-lg">
                  Post photos that make us hungry. Good lighting is your best
                  friend.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-success/50 text-xl">03</span>
                <p className="text-base-content/80 font-medium text-lg">
                  Respect the businesses. If you had a bad experience, critique
                  the food, don't attack the person.
                </p>
              </li>
            </ul>
          </div>

          {/* THE DONTs */}
          <div className="bg-error/5 border border-error/20 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
            <h2 className="text-3xl font-black text-error mb-8 flex items-center gap-3">
              <FaTimes className="border-4 border-error rounded-full p-1" /> Not
              This
            </h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="font-bold text-error/50 text-xl">01</span>
                <p className="text-base-content/80 font-medium text-lg">
                  No hate speech, profanity, or harassment. We have zero
                  tolerance for toxicity.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-error/50 text-xl">02</span>
                <p className="text-base-content/80 font-medium text-lg">
                  No fake reviews. If you are the owner, don't review your own
                  place. We will catch you.
                </p>
              </li>
              <li className="flex gap-4">
                <span className="font-bold text-error/50 text-xl">03</span>
                <p className="text-base-content/80 font-medium text-lg">
                  Don't post photos of strangers without consent.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommunityGuidelines;
