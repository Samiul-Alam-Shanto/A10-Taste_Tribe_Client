import React from "react";
import { motion } from "framer-motion";

const Manifesto = () => {
  return (
    <section className="py-32 overflow-hidden bg-base-100 bg-texture text-base-content/5">
      <div className="container mx-auto px-4">
        {/* ROW 1 */}
        <div className="flex flex-col md:flex-row items-center gap-12 mb-32 relative">
          <div className="w-full md:w-1/2 relative z-10">
            <motion.img
              initial={{ rotate: -5 }}
              whileInView={{ rotate: 0 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800"
              className="rounded-[3rem] border-4 border-base-100 shadow-2xl w-full max-w-md mx-auto"
            />
            {/* Sticker */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent rounded-full flex items-center justify-center font-black text-secondary rotate-12 shadow-lg border-4 border-base-100">
              100% <br /> REAL
            </div>
          </div>

          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-6xl font-black text-secondary mb-6">
              Support <br />
              <span className="text-primary">Local Heroes.</span>
            </h2>
            <p className="text-xl text-base-content/80 leading-relaxed">
              Every review you write shines a spotlight on the chef, the server,
              and the family behind the counter. We are not just eating; we are
              building a community.
            </p>
          </div>
        </div>

        {/* ROW 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 relative">
          <div className="w-full md:w-1/2 relative z-10">
            <motion.img
              initial={{ rotate: 5 }}
              whileInView={{ rotate: 0 }}
              transition={{ duration: 0.8 }}
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800"
              className="rounded-[3rem] border-4 border-base-100 shadow-2xl w-full max-w-md mx-auto"
            />
          </div>

          <div className="w-full md:w-1/2 text-center md:text-right">
            <h2 className="text-6xl font-black text-secondary mb-6">
              No Fake <br />
              <span className="text-gradient">Reviews.</span>
            </h2>
            <p className="text-xl text-base-content/80 leading-relaxed">
              We verify our users. We spot the bots. This is a safe space for
              honest opinions, whether you're raving about a taco or critiquing
              a curry.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
