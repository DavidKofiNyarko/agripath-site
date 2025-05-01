import React from "react";
import CropCard from "../components/CropCard";
import { crops } from "../data/crops";
import Link from "next/link";

const AvailableInvestments = () => {
  return (
    <div id="investments" className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Header */}
      <h2 className="text-3xl sm:text-4xl font-bold text-green-600 text-center mb-2 sm:mb-3">
        Available Investments
      </h2>
      <p className="text-gray-600 text-center mb-6 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base">
        Explore exclusive investment opportunities in agriculture, designed for
        sustainable growth and high returns.
      </p>

      {/* Investment Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {crops.map((crop) => (
          <CropCard key={crop.id} crop={crop} />
        ))}
      </div>

      {/* View All button */}
      <div className="flex justify-center mt-4 sm:mt-6">
        <Link href="/crops" className="border border-green-600 text-green-600 hover:bg-green-50 py-1.5 sm:py-2 px-8 sm:px-12 rounded-full text-sm sm:text-base transition duration-300">
          View All
        </Link>
      </div>
    </div>
  );
};

export default AvailableInvestments;
