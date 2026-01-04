import React from "react";
import HeroSlider from "../../components/Home/HeroSlider";
import CravingsGrid from "../../components/Home/CravingsGrid";
import FeaturedReviews from "../../components/Home/FeaturedReviews";
import HowItWorks from "../../components/Home/HowItWorks";
import TrendingMarquee from "../../components/Home/TrendingMarquee";
import Manifesto from "../../components/Home/Manifesto";
import TribeLeaders from "../../components/Home/TribeLeaders";
import CoveragePreview from "../../components/Home/CoveragePreview";
import BlogPreview from "../../components/Home/BlogPreview";
import Newsletter from "../../components/Home/Newsletter";
import PremiumMembership from "../../components/Home/PremiumMembership";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <title>Home - TasteTribe</title>

      <HeroSlider />
      <CravingsGrid />
      <FeaturedReviews />
      <HowItWorks />
      <TrendingMarquee />
      <Manifesto />
      <TribeLeaders />
      <CoveragePreview />
      <BlogPreview />
      <PremiumMembership />
      <Newsletter />
    </div>
  );
};

export default Home;
