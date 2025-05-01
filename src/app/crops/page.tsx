
import React from 'react';
import Navbar from '../components/Navbar';
import AgripathFooter from '../sections/footer';
import CropCard from '../components/CropCard';
import { crops } from '../data/crops';
import Link from 'next/link';

const AllCropsPage = () => {
  const availableCrops = crops.filter(crop => crop.status === 'Available');
  const comingSoonCrops = crops.filter(crop => crop.status === 'Coming soon');

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-green-700 h-40 sm:h-48 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/crops/hero/banner-collage.jpg" 
            alt="Agricultural crops collage"
            className="w-full h-full object-cover opacity-30"
            onError={(e) => {
              e.currentTarget.src = "/crops/Tomatoes.png";
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-green-600 opacity-60 z-10"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">Available Investments</h1>
        </div>
      </div>
      
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-4 bg-white border-b">
        <div className="flex text-sm text-gray-600">
          <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">All Investments</span>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Available Crops */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Now</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {availableCrops.map(crop => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
        
        {/* Coming Soon Crops */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Coming Soon</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {comingSoonCrops.map(crop => (
              <CropCard key={crop.id} crop={crop} />
            ))}
          </div>
        </div>
      </div>
      
      <AgripathFooter />
    </div>
  );
};

export default AllCropsPage; 