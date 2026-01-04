import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPencilAlt, FaUsers, FaArrowRight } from "react-icons/fa";

const steps = [
  {
    id: 1,
    icon: FaSearch,
    title: "Discover",
    desc: "Stop guessing. Browse thousands of honest reviews to find the hidden gems in your neighborhood.",
    // Theme-safe colors (using standard Tailwind colors that look good in both modes, or opacity)
    color: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  },
  {
    id: 2,
    icon: FaPencilAlt,
    title: "Share",
    desc: "Ate something amazing? Or terrible? Snap a photo and tell the tribe. Your opinion matters.",
    color: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  },
  {
    id: 3,
    icon: FaUsers,
    title: "Connect",
    desc: "Follow top foodies, build your reputation, and join exclusive meetups with the community.",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-base-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black text-secondary mb-6"
          >
            Eat. Review.{" "}
            <span className="underline decoration-wavy decoration-accent text-primary">
              Repeat.
            </span>
          </motion.h2>
          <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
            Join the ecosystem of food lovers in three simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -15 }}
              className={`p-8 rounded-[2.5rem] border-2 border-base-300 bg-base-100 shadow-sm hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 relative group`}
            >
              {/* Giant Number Background */}
              <span className="absolute -right-4 -top-6 text-[10rem] font-black opacity-5 select-none font-outline-2 text-base-content">
                {step.id}
              </span>

              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl mb-6 ${step.color} border-2`}
              >
                <step.icon />
              </div>

              <h3 className="text-3xl font-bold text-secondary mb-4">
                {step.title}
              </h3>
              <p className="text-base-content/70 leading-relaxed mb-6">
                {step.desc}
              </p>

              <div className="flex items-center gap-2 font-bold text-sm uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-all transform -translate-x-2.5 group-hover:translate-x-0 duration-300">
                Learn More <FaArrowRight />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
