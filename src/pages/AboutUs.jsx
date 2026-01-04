import React from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaUtensils,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter,
  FaArrowRight,
  FaStar,
  FaHeart,
  FaFire,
} from "react-icons/fa";
import GeneralBtn from "../components/Buttons/GeneralBtn";

// Data
const founders = [
  {
    name: "Shanto",
    role: "Chief Eating Officer",
    quote: "Flavor is the only currency that matters.",
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=800&q=80",
    specialty: "Street Food",
  },
  {
    name: "Samiul",
    role: "Head of Flavor",
    quote: "We don't eat to live. We live to eat.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    specialty: "Fine Dining",
  },
];

const values = [
  {
    icon: FaStar,
    title: "Radical Honesty",
    desc: "No paid reviews. No bots. If it's bad, we say it's bad. If it's good, we shout it.",
  },
  {
    icon: FaHeart,
    title: "Local First",
    desc: "We champion the mom-and-pop shops over the big chains. Real food is made by people, not factories.",
  },
  {
    icon: FaFire,
    title: "Taste Everything",
    desc: "From Michelin stars to street carts. Good food has no dress code.",
  },
];

const stats = [
  { value: "10K+", label: "Food Lovers" },
  { value: "5K+", label: "Reviews" },
  { value: "500+", label: "Restaurants" },
  { value: "15+", label: "Cities" },
];

const AboutUs = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  return (
    <div className="bg-base-100 min-h-screen font-sans overflow-x-hidden">
      <title>Our Story - TasteTribe</title>

      {/* --- HERO SECTION WITH PARALLAX --- */}
      {/* Used base-100 and secondary for text to match theme */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-base-100">
        {/* Floating Food Elements (Theme Safe Opacity) */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-[10%] text-6xl opacity-10 text-secondary"
        >
          🍕
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-40 right-[15%] text-7xl opacity-10 text-secondary"
        >
          🍜
        </motion.div>
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className="absolute bottom-32 left-[15%] text-5xl opacity-10 text-secondary"
        >
          🍔
        </motion.div>
        <motion.div
          animate={{ y: [0, 25, 0], rotate: [0, -8, 0] }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          className="absolute bottom-40 right-[12%] text-6xl opacity-10 text-secondary"
        >
          🍱
        </motion.div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 text-center px-4 container mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-6 py-2 text-sm font-bold uppercase tracking-widest text-primary mb-8 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Est. 2024
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-7xl md:text-8xl lg:text-[10rem] font-black text-secondary tracking-tighter leading-[0.85] mb-8"
          >
            DRIVEN BY <br />
            <span className="text-gradient">TASTE.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl md:text-2xl text-base-content/60 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Where real foodies find real food. No filters, no fake reviews, just
            pure flavor.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <Link
              className="flex justify-center items-center"
              to="/all-reviews"
            >
              <GeneralBtn>Start Your Journey</GeneralBtn>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-base-content/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-base-content/30 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- STATS SECTION (Dark Theme Contrast) --- */}
      <section className="py-24 px-4 bg-secondary text-secondary-content">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-linear-to-r from-primary to-accent mb-3">
                  {stat.value}
                </div>
                <div className="text-secondary-content/60 text-sm md:text-base uppercase tracking-wider font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- HERO IMAGE (Full Width Container) --- */}
      <section className="py-24 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative w-full aspect-21/9 rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2000"
              alt="Feast"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8 md:bottom-12 md:left-12">
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4">
                Every meal tells a story
              </h3>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                We're here to make sure yours is worth telling.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STORY SECTION --- */}
      <section className="py-32 px-4 bg-base-200">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-6">
                <span className="text-sm font-bold uppercase tracking-widest text-primary bg-primary/10 px-4 py-2 rounded-full">
                  Our Story
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-secondary mb-8 leading-tight">
                Born from frustration. <br />{" "}
                <span className="text-primary">Built with passion.</span>
              </h2>
              <div className="h-1.5 w-24 bg-linear-to-r from-primary to-accent rounded-full mb-8"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300">
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  The Problem
                </h3>
                <p className="text-lg text-base-content/70 leading-relaxed">
                  We were tired of scrolling through fake reviews and sponsored
                  listings. We wanted the real deal. The hole-in-the-wall noodle
                  shop. The burger van with no sign.
                </p>
              </div>
              <div className="bg-base-100 p-8 rounded-3xl shadow-sm border border-base-300">
                <h3 className="text-2xl font-bold text-secondary mb-4">
                  The Solution
                </h3>
                <p className="text-lg text-base-content/70 leading-relaxed">
                  So we built TasteTribe. A community where flavor is the only
                  currency that matters. We verify our users, we spot the bots,
                  and we celebrate the people who actually care.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- VALUES SECTION --- */}
      <section className="py-32 px-4 bg-secondary text-secondary-content">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-accent mb-4 block">
              What We Stand For
            </span>
            <h2 className="text-5xl md:text-6xl font-black mb-6">Our Values</h2>
            <p className="text-xl text-secondary-content/60 max-w-2xl mx-auto">
              The principles that guide every recommendation we make
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group bg-white/5 p-10 rounded-3xl border border-white/10 hover:border-primary transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-linear-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <val.icon className="text-2xl text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">
                  {val.title}
                </h3>
                <p className="text-secondary-content/70 leading-relaxed">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOUNDERS SECTION --- */}
      <section className="py-32 px-4 bg-base-100">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <span className="text-sm font-bold uppercase tracking-widest text-primary mb-4 block">
              Meet The Team
            </span>
            <h2 className="text-5xl md:text-6xl font-black text-secondary mb-6">
              The Founders
            </h2>
            <p className="text-xl text-base-content/60 max-w-2xl">
              The palates behind the platform. The taste-makers who started it
              all.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
            {founders.map((founder, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group"
              >
                <div className="relative w-full aspect-4/5 rounded-[2.5rem] overflow-hidden mb-8 bg-base-200">
                  <img
                    src={founder.img}
                    alt={founder.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  <div className="absolute bottom-6 left-6 bg-base-100/95 backdrop-blur px-5 py-3 rounded-full text-sm font-bold text-secondary flex items-center gap-2 shadow-lg">
                    <FaUtensils className="text-primary" /> {founder.specialty}
                  </div>

                  <div className="absolute top-6 right-6 flex gap-3">
                    <div className="w-10 h-10 bg-base-100/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-lg text-secondary">
                      <FaLinkedin className="text-sm" />
                    </div>
                    <div className="w-10 h-10 bg-base-100/90 backdrop-blur rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-lg text-secondary">
                      <FaTwitter className="text-sm" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-4xl font-black text-secondary mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-sm font-bold text-primary uppercase tracking-wider mb-6">
                    {founder.role}
                  </p>
                  <div className="flex gap-4 items-start bg-base-200 p-6 rounded-2xl">
                    <FaQuoteLeft className="text-3xl text-primary/40 shrink-0 mt-1" />
                    <p className="text-lg text-base-content/80 italic font-medium leading-relaxed">
                      {founder.quote}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-32 px-4 bg-linear-to-br from-primary/20 to-accent/50 text-secondary text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              Ready to Eat Better?
            </h2>
            <p className="text-xl md:text-2xl opacity-80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 10,000+ food lovers who have stopped settling for mediocre
              meals.
            </p>
            <Link to="/auth" className="inline-block">
              <GeneralBtn>Join the Tribe</GeneralBtn>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
