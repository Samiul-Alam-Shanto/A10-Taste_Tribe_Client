import React from "react";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import GeneralBtn from "../Buttons/GeneralBtn";
import { Slide } from "react-awesome-reveal";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    headline: "Discover Amazing Local Flavors",
    subhead:
      "Join a community of food lovers to find and share the best dishes near you.",
    button1_text: "Explore Now",
    button1_link: "/all-reviews",
    button2_text: "Learn More",
  },
  {
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1981&auto=format&fit=crop",
    headline: "Share Your Favorite Dish",
    subhead:
      "Found a hidden gem? Post a review and let the community know what's great.",
    button1_text: "Add a Review",
    button1_link: "/add-review",
  },
  {
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1887&auto=format&fit=crop",
    headline: "Connect with Fellow Foodies",
    subhead:
      "From home cooks to street food fanatics, find your people and share your passion.",
    button1_text: "Join the Community",
    button1_link: "/add-review",
  },
  {
    image: "https://i.ibb.co.com/ym9Lp4q7/noodles-5252012-1280.jpg",
    headline: "Uncover Hidden Gems",
    subhead:
      "Go beyond the popular spots. Discover the best-kept secrets in your neighborhood.",
    button1_text: "Start Exploring",
    button1_link: "/all-reviews",
  },
];

const HeroSlider = () => {
  return (
    <Slide direction="down" triggerOnce duration={1200}>
      <section className="h-[650px] container mx-auto mt-1 mb-16">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-full rounded-lg"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="bg-cover bg-center  h-full w-full relative"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute  inset-0 bg-linear-to-r from-black/90 to-black/30"></div>
                <div className="absolute flex items-center h-full left-0 lg:left-5 top-0 text-white">
                  <div className="space-y-7 pl-4 md:pl-24 w-full md:w-3/d4 lg:w-3/5">
                    <h1
                      className="text-5xl lg:text-6xl font-bold"
                      style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
                    >
                      {slide.headline}
                    </h1>
                    <p className="text-lg">{slide.subhead}</p>
                    <div className="flex flex-wrap gap-4">
                      <GeneralBtn>
                        <Link to={slide.button1_link}>
                          {slide.button1_text}
                        </Link>
                      </GeneralBtn>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </Slide>
  );
};

export default HeroSlider;
