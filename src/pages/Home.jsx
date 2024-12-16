import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

const Home = () => {
  return (
    <div className="py-4 px-28 overflow-hidden">
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
