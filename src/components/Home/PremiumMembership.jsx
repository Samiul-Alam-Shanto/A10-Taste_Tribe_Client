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
    // Style: Clean Paper
    style: "bg-base-100 border-2 border-base-300 text-secondary",
    iconBox: "bg-base-200 text-secondary",
    btnStyle:
      "btn-outline border-secondary text-secondary hover:bg-secondary hover:text-white",
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
    // Style: Gold Gradient
    style:
      "bg-gradient-to-br from-primary to-accent text-white border-none shadow-2xl scale-105 z-10",
    iconBox: "bg-white/20 text-[#4a2c2a]", // Hardcoded contrast for the gold card
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
    // Style: Dark Luxury
    style: "bg-secondary text-secondary-content border border-white/10",
    iconBox: "bg-base-100 text-secondary",
    btnStyle:
      "btn-outline border-accent text-accent hover:bg-accent hover:text-secondary",
  },
];

const PremiumMembership = () => {
  return (
    <section className="py-32 px-4 bg-base-100 relative overflow-hidden">
      {/* Background Pattern (SVG) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%234a2c2a' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "20px 20px",
        }}
      ></div>

      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-primary font-bold tracking-widest uppercase text-sm">
            Unlock the Full Experience
          </span>
          <h2 className="text-5xl md:text-7xl font-black text-secondary mt-2">
            Join the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-600">
              Inner Circle.
            </span>
          </h2>
          <p className="text-xl text-base-content/60 mt-6 max-w-2xl mx-auto">
            Support the community and get exclusive perks. One-time payment,
            lifetime status.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, index) => {
            // ★ IMPORTANT: Create a clean object without the Icon function to pass to state
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
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className={`relative rounded-[2.5rem] p-10 flex flex-col h-full ${plan.style}`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#4a2c2a] text-white px-6 py-2 rounded-full font-bold uppercase tracking-widest text-xs shadow-lg">
                    Most Popular
                  </div>
                )}

                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl text-2xl ${plan.iconBox}`}>
                    <plan.icon />
                  </div>
                  <h3 className="text-4xl font-black tracking-tight">
                    {plan.displayPrice}
                  </h3>
                </div>

                <div className="mb-8">
                  <h4 className="text-2xl font-bold mb-1">{plan.name}</h4>
                  <p
                    className={`text-sm font-medium ${
                      plan.recommended ? "opacity-80" : "opacity-60"
                    }`}
                  >
                    {plan.tagline}
                  </p>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 font-medium">
                      <FaCheck
                        className={`flex-shrink-0 ${
                          plan.recommended ? "text-[#4a2c2a]" : "text-primary"
                        }`}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Pass the SAFE data */}
                <Link
                  to="/dashboard/payment"
                  state={{ selectedPackage: safePackageData }}
                  className={`btn btn-lg w-full rounded-full font-bold shadow-none ${plan.btnStyle}`}
                >
                  Choose {plan.name}
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PremiumMembership;
