import React from "react";
import { Link } from "react-router";
import { Fade, Slide, Zoom } from "react-awesome-reveal";
import { FaStore, FaUtensils, FaComments } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import GeneralBtn from "../components/Buttons/GeneralBtn";

const AboutUs = () => {
  const { user } = useAuth();
  return (
    <div className="bg-base-100 pt-1">
      <title>About Us - TasteTribe</title>
      <div
        className="hero container rounded-xl mx-auto  min-h-[650px]"
        style={{
          backgroundImage:
            "url('https://i.ibb.co.com/qY8tpMBH/photo-1552566626-52f8b828add9.jpg')",
        }}
      >
        <div className="hero-overlay rounded-xl bg-black/70  "></div>
        <div className="hero-content text-center text-neutral-content">
          <Fade direction="down" triggerOnce>
            <div className="max-w-md">
              <h1 className="mb-5 text-5xl font-bold">Welcome to the Tribe.</h1>
              <p className="mb-5">
                We're a community of food lovers dedicated to discovering and
                sharing the most authentic local flavors. This is our story.
              </p>
            </div>
          </Fade>
        </div>
      </div>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <Slide direction="left" triggerOnce>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="w-full md:w-1/2">
                <img
                  src="https://i.ibb.co.com/ymnVCBhJ/photo-1517248135467-4c7edcad34c4.jpg"
                  alt="A bustling local restaurant"
                  className="rounded-lg shadow-xl"
                />
              </div>
              <div className="w-full md:w-1/2">
                <p className="font-semibold text-gradient text-xl mb-2">
                  Our Mission
                </p>
                <h2 className="text-4xl font-bold text-secondary mb-4">
                  Celebrating the Entire Food Scene
                </h2>
                <p className="text-base-content/80 leading-relaxed">
                  TasteTribe was born from a simple idea: to create a trusted
                  space where real people share honest opinions about the food
                  they love. We're here to champion the entire local food
                  ecosystem—from the fine-dining restaurant downtown, to the
                  vibrant street food stall,{" "}
                  <strong className="strong">
                    to the talented home cook sharing their passion from their
                    own kitchen.
                  </strong>
                </p>
              </div>
            </div>
          </Slide>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-base-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-secondary mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Fade cascade damping={0.1} direction="up" triggerOnce>
              <div className="card bg-base-100 p-8 shadow-lg">
                <FaComments className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-secondary mb-2">
                  Honest Opinions
                </h3>
                <p>
                  Real reviews from real people. No sponsored content, just
                  genuine experiences.
                </p>
              </div>
              <div className="card bg-base-100 p-8 shadow-lg">
                <FaStore className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-secondary mb-2">
                  Support Local
                </h3>
                <p>
                  Every review you share helps support a local business and its
                  community.
                </p>
              </div>
              <div className="card bg-base-100 p-8 shadow-lg">
                <FaUtensils className="text-5xl text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-secondary mb-2">
                  Passionate Eating
                </h3>
                <p>
                  We believe food is more than fuel—it's culture, connection,
                  and joy. Let's celebrate it.
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-secondary mb-12">
            Meet the Founders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <Fade cascade damping={0.1} direction="left" triggerOnce>
              <div className="text-center">
                <div className="avatar mb-4">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img
                      src="https://i.ibb.co.com/hFMcXsDR/rsz-jurica-koletic-7yvzyzeitc8-unsplash.jpg"
                      alt="Founder Jane Doe"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-secondary">
                  Shanto
                </h3>
                <p className="text-primary font-medium">Chief Eating Officer</p>
                <p className="mt-2 text-base-content/80">
                  "My quest for the perfect taco is what started it all. I
                  wanted to build a community that values authenticity as much
                  as I do."
                </p>
              </div>
              <div className="text-center">
                <div className="avatar mb-4">
                  <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                    <img
                      src="https://i.ibb.co.com/sp3D6fnf/photo-1507003211169-0a1dd7228f2d.jpg"
                      alt="Founder John Smith"
                    />
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-secondary">
                  Samiul
                </h3>
                <p className="text-primary font-medium">
                  Head of Flavor Discovery
                </p>
                <p className="mt-2 text-base-content/80">
                  "I believe the best meals are the ones shared. TasteTribe is
                  our way of sharing those amazing discoveries with everyone."
                </p>
              </div>
            </Fade>
          </div>
        </div>
      </section>

      <section className="bg-base-200">
        <div className="container mx-auto px-4 flex flex-col items-center py-20 text-center">
          <Zoom triggerOnce>
            <h2 className="text-4xl font-bold text-secondary mb-4">
              Join the TasteTribe Today
            </h2>
            <p className="max-w-xl mx-auto text-base-content/80 mb-8">
              Ready to find and share the best local food? Your next great meal
              is just a click away.
            </p>
            <Link to={`${user ? "#" : "/auth"}`}>
              <GeneralBtn>Become a Member</GeneralBtn>
            </Link>
          </Zoom>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
