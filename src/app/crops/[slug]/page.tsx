'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import CropProgressBar from '../../components/CropProgressBar';
import CropCard from '../../components/CropCard';
import AgripathFooter from '../../sections/footer';
import { getCropBySlug, getRelatedCrops, Crop } from '../../data/crops';

const CropDetailPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  const crop = getCropBySlug(slug);
  const relatedCrops = getRelatedCrops(slug, 5);
  
  const [unitQuantity, setUnitQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Redirect to 404 if crop not found
  if (!crop) {
    notFound();
  }

  // Calculate values
  const basePrice = parseInt(crop.price.replace(/[^0-9]/g, ''));
  const totalInvest = basePrice * unitQuantity;
  const roiPercent = 7;
  const profit = totalInvest * (roiPercent / 100);
  const totalWithProfit = totalInvest + profit;
  
  // Handle quantity changes
  const decreaseQuantity = () => {
    if (unitQuantity > 1) {
      setUnitQuantity(unitQuantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setUnitQuantity(unitQuantity + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }
    alert(`Investment submitted for ${unitQuantity} units of ${crop.name}`);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
     
      {/* Hero Banner - Refined with proper spacing and visual hierarchy */}
      <div className="bg-green-700 h-48 sm:h-64 md:h-72 relative overflow-hidden">
        {/* Base image layer with improved opacity */}
        <div className="absolute inset-0 z-0">
          <img 
            src={crop.image} 
            alt={crop.name}
            className="w-full h-full object-cover opacity-50" 
          />
        </div>
        
        {/* Refined gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900 via-green-800/90 to-green-transparent z-10"></div>
        
        {/* Text container with better positioning and spacing */}
        <div className="container mx-auto px-6 h-full p-8 container flex items-center relative z-20">
          <div className="max-w-3xl">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md">
              {crop.name}
            </h1>
            <p className="text-white text-lg md:text-xl mt-3 opacity-90 max-w-2xl leading-relaxed">
              {crop.description || "Sustainable farming for a better tomorrow"}
            </p>
          </div>
        </div>
      </div>
      
      {/* Main Content - Improved spacing and visual organization */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Breadcrumbs - Better spacing and visual distinction */}
          <div className="bg-gray-50 py-4 px-6 border-b border-gray-200">
            <div className="flex text-sm text-gray-600">
              <Link href="/" className="hover:text-green-600 transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/#investments" className="hover:text-green-600 transition-colors">Investments</Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">{crop.name}</span>
            </div>
          </div>
          
          {/* Crop Details Grid - Proper spacing and hierarchy */}
          <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Crop Overview - Wider on large screens */}
            <div className="lg:col-span-2 space-y-10">
              {/* Crop Overview Section - Better spacing and card-like presentation */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Crop Overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-1">ROI</div>
                    <div className="font-bold text-gray-900 text-lg">{crop.roiValue}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-1">Duration</div>
                    <div className="font-bold text-gray-900 text-lg">{crop.duration}</div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-gray-500 text-sm font-medium mb-1">Remaining Units</div>
                    <div className="font-bold text-gray-900 text-lg">
                      {(parseInt(crop.totalUnits.replace(/,/g, '')) - parseInt(crop.unitsSold.replace(/,/g, ''))).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-gray-500 text-sm font-medium mb-2">Investment Progress</div>
                  <CropProgressBar unitsSold={crop.unitsSold} totalUnits={crop.totalUnits} />
                </div>
              </div>
              
              {/* About This Project - Better typography and spacing */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Project</h2>
                <p className="text-gray-700 leading-relaxed mb-6 text-base">{crop.about}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 pl-2">
                  {crop.benefits.slice(0, 2).map((benefit, index) => (
                    <li key={index} className="pl-2">{benefit}</li>
                  ))}
                </ul>
              </div>
              
              {/* Project Benefits - Better visual separation and spacing */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Benefits</h2>
                <p className="text-gray-700 mb-6 text-base">
                  Investors will benefit from season returns, enjoying stable yields from horticulture practices that promote sustainability and biodiversity.
                </p>
                <ul className="space-y-4 pl-2">
                  {crop.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
                        </svg>
                      </div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Right Column: Investment Calculator - Professional card design */}
            <div>
              <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden sticky top-8">
                {/* Header with enhanced styling */}
                <div className="bg-green-600 p-4 text-white">
                  <h3 className="font-bold text-lg">Investment Summary</h3>
                </div>
                
                {/* Top Investment Summary - Better visual design */}
                <div className="p-5 border-b border-gray-200">
                  <div className="flex items-center justify-between bg-green-50 rounded-lg p-4">
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Total Investment</div>
                      <div className="font-bold text-gray-900 text-lg">GHS {totalInvest.toLocaleString()}</div>
                    </div>
                    <div className="text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14"/>
                        <path d="m12 5 7 7-7 7"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 font-medium">Expected Returns</div>
                      <div className="font-bold text-gray-900 text-lg">GHS {totalWithProfit.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
                
                {/* Unit Quantity Control - Better spacing and control design */}
                <div className="p-5 border-b border-gray-200">
                  <div className="mb-4 flex justify-between items-center">
                    <label className="block text-gray-700 font-medium">Unit Quantity</label>
                    <div className="flex border border-gray-300 rounded-md shadow-sm">
                      <button 
                        type="button"
                        onClick={decreaseQuantity}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        −
                      </button>
                      <div className="px-4 py-2 border-x border-gray-300 min-w-[40px] text-center font-medium">
                        {unitQuantity}
                      </div>
                      <button 
                        type="button"
                        onClick={increaseQuantity}
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  {/* Toggle Details Button - Better styling */}
                  <button
                    type="button"
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full flex items-center justify-between text-green-600 font-medium py-2 px-3 border border-green-200 rounded-md hover:bg-green-50 transition-colors"
                  >
                    <span>{showDetails ? "Hide Investment Details" : "Show Investment Details"}</span>
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                      className={`transition-transform ${showDetails ? "rotate-180" : ""}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </button>
                </div>
                
                {/* Details Section (Collapsible) - Better spacing and organization */}
                {showDetails && (
                  <div className="p-5 border-b border-gray-200 space-y-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 font-medium">Unit Price</div>
                      <div className="font-bold">GHS {basePrice.toLocaleString()}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 font-medium">Total Investment</div>
                      <div className="font-bold">GHS {totalInvest.toLocaleString()}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 font-medium">Earning ROI (%)</div>
                      <div className="font-bold text-green-600">{roiPercent}%</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 font-medium">Return Timespan</div>
                      <div className="font-bold">6 Months</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 font-medium">Return Type</div>
                      <div className="font-bold">Repeat</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 font-medium">Capital Back</div>
                      <div className="font-bold text-green-600">Yes</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-gray-600 font-medium">Maturity Time</div>
                      <div className="font-bold flex items-center">
                        {crop.maturityTime}
                        <button 
                          type="button" 
                          className="inline-block ml-1 text-gray-500 hover:text-gray-700"
                          title="Information about maturity time"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"/>
                            <path d="M12 8v4"/>
                            <path d="M12 16h.01"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Terms and Conditions - Better visual presentation */}
                <div className="p-5 border-b border-gray-200">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="mt-0.5 h-5 w-5 text-green-600 rounded" 
                      checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                    />
                    <div className="text-sm">
                      I accept all <a href="#" className="text-green-600 hover:underline font-medium">terms and conditions</a> for this investment
                    </div>
                  </label>
                </div>
                
                {/* Warning Note - Better visual distinction */}
                <div className="p-5 border-b border-gray-200 bg-amber-50 text-sm text-amber-800">
                  <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <p>Agricultural investments come with inherent risks such as weather, pests, and market changes. While AgriPath will do its best to manage these, returns can be affected.</p>
                  </div>
                </div>
                
                {/* Invest Now Button - Better styling and prominence */}
                <div className="p-5">
                  <button 
                    type="submit"
                    disabled={!acceptTerms}
                    className={`w-full py-3 px-4 rounded-md text-white font-medium text-lg ${
                      acceptTerms ? 'bg-green-600 hover:bg-green-700' : 'bg-green-300 cursor-not-allowed'
                    } transition-colors duration-300 shadow-md`}
                  >
                    Invest Now
                  </button>
                  <p className="text-xs text-center mt-3 text-gray-500">
                    Secure investment platform with 24/7 support
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
        
        {/* Available Investment Section - Better spacing and organization */}
        <div className="mt-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Similar Investments</h2>
            <Link href="/crops" className="text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
              See All
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedCrops.map(relatedCrop => (
              <CropCard key={relatedCrop.id} crop={relatedCrop} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/crops" className="inline-block bg-green-600 text-white py-3 px-8 rounded-md transition-colors duration-300 hover:bg-green-700 shadow-md font-medium">
              Browse All Investments
            </Link>
          </div>
        </div>
      </div>
      
      <AgripathFooter />
    </div>
  );
};

export default CropDetailPage;