import React from "react";
import { Slide } from "react-awesome-reveal";
import { FaStore, FaUtensils, FaComments } from "react-icons/fa";

const manifestoPoints = [
  {
    icon: <FaStore />,
    tagline: "Our Mission",
    title: "Support Your Neighbors",
    description:
      "Every review shines a spotlight on a local business, helping our community's most passionate chefs and owners thrive.",
    imageUrl:
      "https://i.ibb.co.com/7NKkK7GD/photo-1539056276907-dc946d5098c9.jpg",
    align: "left",
  },
  {
    icon: <FaUtensils />,
    tagline: "Our Philosophy",
    title: "Discover Authentic Taste",
    description:
      "Forget the big chains. We're here to celebrate the real, passionate cooking that makes our city's food scene unique.",
    imageUrl:
      "https://i.ibb.co.com/k26zZj41/premium-photo-1663858367001-89e5c92d1e0e.jpg",
    align: "right",
  },
  {
    icon: <FaComments />,
    tagline: "Our Community",
    title: "Share Honest Opinions",
    description:
      "Your voice matters. Help fellow food lovers find their next great meal by sharing your genuine experience.",
    imageUrl:
      "https://i.ibb.co.com/GfbcDK9p/photo-1578474846511-04ba529f0b88.jpg",
    align: "left",
  },
];

const Manifesto = () => {
  return (
    <section className="mb-16 lg:mb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-secondary">
            Why We Love Local
          </h2>
          <p className="max-w-2xl mx-auto text-base-content/80 mt-4">
            We're a community built on a shared passion for authentic food and
            the stories behind it.
          </p>
        </div>

        <div className="space-y-12">
          {manifestoPoints.map((point, index) => (
            <Slide
              key={index}
              direction={point.align === "left" ? "left" : "right"}
              triggerOnce
              duration={800}
            >
              <div className="flex flex-col md:flex-row bg-base-100 rounded-lg shadow-xl overflow-hidden ">
                <div
                  className={`w-full md:w-5/12 ${
                    point.align === "right" ? "md:order-2" : ""
                  }`}
                >
                  <img
                    src={point.imageUrl}
                    alt={point.title}
                    className="w-full object-cover h-[300px] md:h-[400px]"
                  />
                </div>

                <div className="w-full md:w-7/12 flex flex-col justify-center p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-primary">{point.icon}</span>
                    <p className="font-semibold text-primary">
                      {point.tagline}
                    </p>
                  </div>
                  <h3 className="text-3xl font-bold text-secondary mb-4">
                    {point.title}
                  </h3>
                  <p className="text-base-content/90 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </Slide>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Manifesto;
