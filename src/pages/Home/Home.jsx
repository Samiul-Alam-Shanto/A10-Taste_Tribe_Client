import React from "react";
import HowItWorks from "../../components/Home/HowItWorks";
import HeroSlider from "../../components/Home/HeroSlider";
import Manifesto from "../../components/Home/Manifesto";

const Home = () => {
  return (
    <div>
      <HeroSlider />
      <HowItWorks />
      <Manifesto />
    </div>
  );
};

export default Home;
