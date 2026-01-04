import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import GeneralBtn from "../Buttons/GeneralBtn";
import { motion } from "framer-motion";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    headline: "Taste the Local Magic",
    subhead: "Join the tribe of food lovers discovering hidden gems near you.",
    button_text: "Start Exploring",
    link: "/all-reviews",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2070&auto=format&fit=crop",
    headline: "Share Your Cravings",
    subhead: "Found a dish that blew your mind? Tell the world about it.",
    button_text: "Add a Review",
    link: "/dashboard/add-review",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    headline: "Real Food, Real People",
    subhead: "No bots, no paid ads. Just honest opinions from your neighbors.",
    button_text: "Join Community",
    link: "/auth",
  },
];

const HeroSlider = () => {
  return (
    <section className="h-[85vh] w-full relative">
      <Swiper
        effect={"fade"}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        modules={[Autoplay, Pagination, EffectFade]}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Image Background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                <div className="max-w-4xl space-y-6">
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold text-[#fefbf3] tracking-tight leading-tight"
                  >
                    {slide.headline}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-lg md:text-2xl text-[#fefbf3]/90 max-w-2xl mx-auto"
                  >
                    {slide.subhead}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="pt-4 flex justify-center"
                  >
                    <Link to={slide.link}>
                      <GeneralBtn>{slide.button_text}</GeneralBtn>
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
