import React from "react";
import { Link } from "react-router-dom";
import DashboardImg from "../assets/img1.png";

const HeroSection = () => {
  return (
    <div className="flex flex-row justify-between h-screen my-6">
      <div className="flex flex-col gap-8 w-full h-1/2">
        <h4 className="text-4xl font-bold  tracking-widest pt-20">
          Managing business payments has never been easier
        </h4>

        <p className="text-gray-300">
          End-to-end payments and financial management in a single solution.
          Meet the right platform to help realize.
        </p>

        <div className="flex flex-row items-center gap-4 ">
          <Link
            to="/register"
            className="px-8 py-3 bg-purple-700 rounded-md text-white text-sm flex flex-row justify-center items-center"
          >
            Get Started
          </Link>
          <Link to="#" className="text-purple-700 text-xs tracking-normal">
            See How It Works
          </Link>
        </div>

        <div className="flex flex-row items-center gap-4">
          <Link
            to="/register"
            className="text-purple-700 text-xs tracking-normal"
          >
            Free Register
          </Link>
          <Link to="#" className="text-purple-700 text-xs tracking-normal">
            Great Service
          </Link>
        </div>
      </div>
      <div className="h-1/2" style={{ marginRight: "-250px" }}>
        <img
          src={DashboardImg}
          alt=""
          style={{
            width: "2500px",
          }}
        />
      </div>
    </div>
  );
};

export default HeroSection;
