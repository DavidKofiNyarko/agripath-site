'use client'

import { Gochi_Hand } from "next/font/google";
import Link from 'next/link';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvestmentFormModal from '../components/InvestmentFormModal';

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const investmentOpportunities = [
  {
    id: 1,
    title: "Invest in Staple Crop Farms with High Returns",
    description: "We grow essential crops like cassava, sweet potatoes, and High-value vegetables like tomatoes and peppers with expert agronomic support. Each cycle lasts 4-5 months, and produce is already under off-take agreements with buyers and processors.",
    idealFor: "Investors looking for short-to-mid-term ROI with real social impact.",
    image: "/investments/cassava.png",
    category: "Crop Farming"
  },
  {
    id: 2,
    title: "Livestock Investment Program",
    description: "Invest in our modern pig farming operations with proven track records. We use advanced breeding techniques and maintain high health standards. Each cycle offers competitive returns with managed risks.",
    idealFor: "Investors seeking diversified agricultural portfolios with steady returns.",
    image: "/investments/pigs.jpg",
    category: "Livestock (Pigs)"
  },
  {
    id: 3,
    title: "High-Value Agricultural Projects",
    description: "Premium agricultural projects including greenhouse farming, aquaculture, and specialized crop production. These projects offer higher returns with managed risk profiles.",
    idealFor: "Sophisticated investors looking for premium returns in agriculture.",
    image: "/investments/project.png",
    category: "High-Value Projects"
  }
];

const InvestmentOpportunitiesSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const handleInvestClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" w-full p-4 sm:p-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="text-center p-2 py-4 sm:py-8 mb-8"
          >
            <h2 className={`text-3xl sm:text-4xl text-primary font-semibold ${gochiHand.className}`}>
              Investment <span className="text-primary-foreground"> Opportunities</span>
            </h2>
            <motion.p 
              className="font-sans font-medium text-lg leading-7 tracking-normal text-center text-[#828282] max-w-3xl mx-auto px-4 sm:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Explore exclusive investment opportunities in agriculture, designed for sustainable growth and high returns.
            </motion.p>
          </motion.div>

          <motion.div 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
            className="flex justify-center gap-8 mb-8 relative"
          >
            {['Crop Farming', 'Livestock (Pigs)', 'High-Value Projects'].map((category, index) => (
              <button
                key={category}
                onClick={() => goToSlide(index)}
                className={`px-4 py-2 text-sm font-medium transition-colors relative ${
                  activeIndex === index 
                    ? 'text-primary' 
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {category}
                {activeIndex === index && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ 
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                    damping: 20
                  }}
                  className="relative"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-8">
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.2,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="space-y-6"
                    >
                      <h3 className="text-2xl font-bold text-gray-900">
                        {investmentOpportunities[activeIndex].title}
                      </h3>
                      <motion.p 
                        className="text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {investmentOpportunities[activeIndex].description}
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="font-medium text-gray-900 mb-2">Ideal For:</h4>
                        <p className="text-gray-600">
                          {investmentOpportunities[activeIndex].idealFor}
                        </p>
                      </motion.div>
                      <motion.div 
                        className="flex gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div>
                          <button 
                            onClick={handleInvestClick}
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                          >
                            Invest Now
                          </button>
                        </div>
                        <div>
                          <Link
                            href="/learn-more"
                            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            Learn More
                          </Link>
                        </div>
                      </motion.div>
                    </motion.div>
                    
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: 0.3,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                      className="relative h-[400px] overflow-hidden"
                    >
                      <img
                        src={investmentOpportunities[activeIndex].image}
                        alt={investmentOpportunities[activeIndex].title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>

      <InvestmentFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default InvestmentOpportunitiesSection;