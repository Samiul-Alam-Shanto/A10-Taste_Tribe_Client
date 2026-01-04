import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaStar, FaCrown, FaUtensils, FaCheck } from "react-icons/fa";

const plans = [
  {
    id: "taster",
    name: "Taster",
    price: 4.99,
    displayPrice: "$4.99",
    tagline: "For the casual explorer.",
    features: ["Verified Badge", "Unlimited Reviews", "Basic Support"],
    icon: FaUtensils,
    style: "bg-base-100 border-2 border-base-200 text-secondary",
    iconBox: "bg-base-200 text-secondary",
    btnStyle:
      "btn-outline border-base-300 text-secondary hover:bg-secondary hover:text-white",
  },
  {
    id: "foodie",
    name: "Foodie",
    price: 9.99,
    displayPrice: "$9.99",
    tagline: "For the obsession.",
    features: [
      "Gold Badge",
      "Priority Support",
      "Early Access",
      "Review Analytics",
    ],
    icon: FaStar,
    recommended: true,
    style:
      "bg-gradient-to-br from-primary to-accent text-white border-none shadow-xl scale-105 z-10",
    iconBox: "bg-white/20 text-[#4a2c2a]",
    btnStyle:
      "bg-[#4a2c2a] text-white border-none hover:bg-white hover:text-[#4a2c2a]",
  },
  {
    id: "gourmet",
    name: "Gourmet",
    price: 19.99,
    displayPrice: "$19.99",
    tagline: "For the industry pro.",
    features: [
      "Black Badge",
      "24/7 Concierge",
      "Exclusive Events",
      "Monetization Tools",
    ],
    icon: FaCrown,
    style: "bg-secondary text-secondary-content border border-white/10",
    iconBox: "bg-base-100 text-secondary",
    btnStyle:
      "btn-outline border-accent text-accent hover:bg-accent hover:text-secondary",
  },
];

const GoPremium = () => {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center">
      <div className="text-center mb-12">
        <span className="text-primary font-bold uppercase tracking-widest text-sm">
          Upgrade
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-secondary mt-2">
          Choose Your Plan
        </h1>
        <p className="text-base-content/60 mt-2">
          Unlock the full potential of your food journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full items-center">
        {plans.map((plan, index) => {
          // Safe Data for Router State
          const safePackageData = {
            id: plan.id,
            name: plan.name,
            price: plan.price,
            displayPrice: plan.displayPrice,
            features: plan.features,
          };

          return (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-4xl p-8 flex flex-col h-full ${plan.style}`}
            >
              {plan.recommended && (
                <div className="absolute top-1 right-2 bg-white/20 backdrop-blur px-4 py-1 rounded-bl-4xl rounded-tr-4xl text-xs font-bold uppercase tracking-wider text-white">
                  Best Value
                </div>
              )}

              <div className="flex justify-between items-start mb-6">
                <div className={`p-4 rounded-2xl text-2xl ${plan.iconBox}`}>
                  <plan.icon />
                </div>
                <h3 className="text-3xl font-black">{plan.displayPrice}</h3>
              </div>

              <div className="mb-6">
                <h4 className="text-xl font-bold mb-1">{plan.name}</h4>
                <p
                  className={`text-sm font-medium ${
                    plan.recommended ? "opacity-80" : "opacity-60"
                  }`}
                >
                  {plan.tagline}
                </p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm font-medium opacity-90"
                  >
                    <FaCheck
                      className={
                        plan.recommended ? "text-[#4a2c2a]" : "text-primary"
                      }
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to="/dashboard/payment"
                state={{ selectedPackage: safePackageData }}
                className={`btn w-full rounded-xl font-bold ${plan.btnStyle}`}
              >
                Select {plan.name}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GoPremium;
