
import React from 'react';
import Link from 'next/link';
import { Crop } from '../data/crops';

interface CropCardProps {
  crop: Crop;
  showButton?: boolean;
}

const CropCard: React.FC<CropCardProps> = ({ crop, showButton = true }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
      {/* Image with status badge */}
      <Link href={`/crops/${crop.slug}`} className="relative rounded-t-lg overflow-hidden block">
        <img
          src={crop.image}
          alt={crop.name}
          className="w-full h-28 sm:h-32 md:h-36 lg:h-40 object-cover"
        />
        <div
          className={`absolute top-2 right-2 px-2 sm:px-3 py-1 rounded-full text-xs font-medium text-white ${
            crop.status === "Available"
              ? "bg-green-600"
              : "bg-red-500"
          }`}
        >
          {crop.status}
        </div>
      </Link>

      {/* Investment details */}
      <div className="px-2 sm:px-3 pb-3 pt-2 flex-grow flex flex-col">
        <Link href={`/crops/${crop.slug}`} className="hover:text-green-600 transition-colors">
          <h3 className="font-bold text-sm sm:text-base text-gray-800">{crop.name}</h3>
        </Link>
        <div className="text-xs sm:text-sm text-gray-600 mb-1">
          <span>{crop.price}</span> <span>{crop.unit}</span>
        </div>
        <div className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{crop.roi}</div>

        {/* Invest button */}
        {showButton && (
          <Link href={`/crops/${crop.slug}`} className="mt-auto">
            <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-1.5 sm:py-2 px-2 sm:px-4 rounded text-xs sm:text-sm transition duration-300">
              {crop.status === "Available" ? "Invest Now" : "Learn More"}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CropCard; 