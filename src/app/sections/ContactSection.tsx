'use client';

import React, { useState } from "react";
import OffTakerFormModal from '../components/OffTakerFormModal';
import FarmerFormModal from "../components/FarmerFormModal";

const ContactSection = () => {
  const [isFarmerModalOpen, setIsFarmerModalOpen] = useState(false);
  const [isOffTakerModalOpen, setIsOffTakerModalOpen] = useState(false);

  const handleFarmerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsFarmerModalOpen(true);
  };

  const handleOffTakerClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOffTakerModalOpen(true);
  };

  {isFarmerModalOpen && <FarmerFormModal isOpen={isFarmerModalOpen} onClose={() => setIsFarmerModalOpen(false)} />}
{isOffTakerModalOpen && <OffTakerFormModal isOpen={isOffTakerModalOpen} onClose={() => setIsOffTakerModalOpen(false)} />}


  return (
    <>
      <div className="w-full h-full">
        <div className="relative z-10 w-full text-center py-24 contact-section overflow-hidden">
          <div className="absolute -z-10 inset-0 bg-gradient-to-t from-background via-background/95 to-background/60 bg-opacity-85"></div>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">
            Partner Us!
          </h1>
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-10">
            Join as a Farmer or Buyer
          </h1>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleFarmerClick}
              className="bg-white text-primary font-medium py-2 px-6 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
            >
              I am a Farmer
            </button>
            <button
              onClick={handleOffTakerClick}
              className="bg-primary-foreground text-white font-medium py-2 px-6 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
            >
              I am a Buyer
            </button>
          </div>
        </div>
      </div>

      {/* Farmer Modal */}
      <FarmerFormModal
        isOpen={isFarmerModalOpen}
        onClose={() => setIsFarmerModalOpen(false)}
      />

      {/* OffTaker Modal */}
      <OffTakerFormModal
        isOpen={isOffTakerModalOpen}
        onClose={() => setIsOffTakerModalOpen(false)}
      />
    </>
  );
};

export default ContactSection;
