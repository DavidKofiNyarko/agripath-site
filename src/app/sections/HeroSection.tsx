import React from "react";
import { Gochi_Hand } from "next/font/google";
import InfiniteScrollCrops from "../components/InfiniteScrollCrops";
import Navbar from "../components/Navbar";
// Google Font Setup
const Gothic = Gochi_Hand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const HeroSection = () => {
  return (
    <>
    <Navbar />
    
    <div className="relative mb-8 min-h-[500px] sm:min-h-[650px] flex justify-center items-center overflow-hidden">
      {/* Background Image/Video Placeholder */}
      <div className="absolute inset-0">
        <img
          src="/placeholder-video.png"
          alt="Hero Background"
          className="w-full h-full object-cover" />

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-gray-400/50 via-white to-white"
          style={{ mixBlendMode: "multiply" }} />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4 py-8 sm:py-0">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-sans font-semibold tracking-normal mb-4 drop-shadow-xs">
          Invest in{" "}
          <span
            className={`text-background decoration-green-400 font-extrabold ${Gothic.className}`}
          >
            Sustainable <br />
          </span>
          <span className={`text-background ${Gothic.className}`}>
            Agriculture
          </span>{" "}
          with AgriPath
        </h1>

        <p className="font-sans md:text-lg sm:text-2xl md:text-3xl leading-6 sm:leading-9 max-w-3xl mb-8 sm:mb-12 drop-shadow-sm md:font-medium px-2">
          Join a network of impact-driven investors funding profitable and
          sustainable farms across Africa
        </p>

        {/* Stacked Avatars + Investor Count */}
        <div className="flex flex-col items-center justify-center space-y-4 mb-8 sm:mb-10 w-full px-4">
          <div className="flex flex-col sm:flex-row items-center justify-center rounded-full py-2 space-y-3 sm:space-y-0">
            <div className="flex -space-x-2 sm:-space-x-3">
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-200"
                src="https://picsum.photos/seed/avatar1/40"
                alt="Avatar 1" />
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-gray-300"
                src="https://picsum.photos/seed/avatar2/40"
                alt="Avatar 2" />
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                src="https://picsum.photos/seed/avatar3/40"
                alt="Avatar 3" />
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                src="https://picsum.photos/seed/avatar4/40"
                alt="Avatar 4" />
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white"
                src="https://picsum.photos/seed/avatar5/40"
                alt="Avatar 5" />
            </div>
            <span className="text-center sm:text-left ml-0 sm:ml-4 text-black text-sm sm:text-base font-medium">
              <span className="text-background font-bold">200+</span> investors
              and maybe you 🫵
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <button className="bg-primary hover:bg-green-700 text-primary-foreground font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-2xl transition duration-300 shadow-lg transform hover:scale-105 text-sm sm:text-base">
          Start Investing
        </button>
      </div>
    </div><div className="relative z-6">
        <InfiniteScrollCrops />
      </div></>
  );
};

export default HeroSection;
