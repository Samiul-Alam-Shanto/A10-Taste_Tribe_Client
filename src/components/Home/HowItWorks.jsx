import React from "react";
import { FaSearch, FaPencilAlt, FaUsers } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <section className="my-16 lg:my-24 container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold text-secondary mb-4">How It Works</h2>
      <p className="max-w-2xl mx-auto text-base-content/80 mb-12">
        Joining our foodie community is as easy as one, two, three.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="card bg-base-200 shadow-md p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div className="flex justify-center mb-4">
            <div className="custom-gradient text-primary-content rounded-full p-4">
              <FaSearch size={32} />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-secondary">
            1. Discover
          </h3>
          <p className="text-base-content/90">
            Browse hundreds of reviews from local food enthusiasts to find your
            next favorite meal.
          </p>
        </div>

        <div className="card bg-base-200 shadow-md p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div className="flex justify-center mb-4">
            <div className="custom-gradient  text-primary-content rounded-full p-4">
              <FaPencilAlt size={32} />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-secondary">
            2. Share
          </h3>
          <p className="text-base-content/90">
            Loved a dish? Add your own review with photos and ratings to help
            guide the community.
          </p>
        </div>

        <div className="card bg-base-200 shadow-md p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
          <div className="flex justify-center mb-4">
            <div className="custom-gradient  text-primary-content rounded-full p-4">
              <FaUsers size={32} />
            </div>
          </div>
          <h3 className="text-2xl font-semibold mb-2 text-secondary">
            3. Connect
          </h3>
          <p className="text-base-content/90">
            Save your favorite finds and connect with others who share your
            passion for great food.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
