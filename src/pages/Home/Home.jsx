import React from "react";
import HowItWorks from "../../components/Home/HowItWorks";
import HeroSlider from "../../components/Home/HeroSlider";
import Manifesto from "../../components/Home/Manifesto";
import FeaturedReviews from "../../components/Home/FeaturedReviews";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <FeaturedReviews />
      <HowItWorks />
      <Manifesto />
    </div>
  );
};

export default Home;
