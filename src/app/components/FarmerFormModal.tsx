'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, X } from 'lucide-react';

interface FarmerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cropOptions = [
  'Tomatoes',
  'Sweet Potatoes',
  'Maize',
  'Bell Pepper',
  'Habanero',
  'Cassava',
  'Other',
];

export default function FarmerFormModal({ isOpen, onClose }: FarmerFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: '',
    farmingYears: '',
    acresAvailable: '',
    selectedCrops: [] as string[],
    irrigationAccess: '',
    farmInputsNeeded: '',
  });
  const [page, setPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);




   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      console.log("Request Payload:", formData);
      
       
      const airtableBaseId = 'appnXR8HBSlvBGHhX';
      const airtableTableId= 'tblM421tN99zjvSE5'
      const airtableApiKey='patgEqThfqkt0b5oi.c6a8ba206431f0157b489a798aa7dc4faef60342bcedfe97b1ef84216f04aec1'
  
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,{
          method:"POST",
          headers:{
            Authorization:`Bearer ${airtableApiKey}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            fields:{
              name:formData.name,
              phone:formData.phone,
              email:formData.email,
              location:formData.location,
              farmingYears:formData.farmingYears,
              acresAvailable:formData.acresAvailable,
              selectedCrops:formData.selectedCrops.join(', '),
              irrigationAccess:formData.irrigationAccess,
              farmInputsNeeded:formData.farmInputsNeeded
  
            }
          })
          
        })
        setShowSuccess(true);
        setIsLoading(false);
  
        setTimeout(() => {
          setFormData({
            name:'',
            phone:'',
            email:'',
            location:'',
            farmingYears:'',
            acresAvailable:'',
            selectedCrops:[],
            irrigationAccess:'',
            farmInputsNeeded:''
             
          });
          setShowSuccess(false);
          onClose();
        }, 2000);
      } catch (error) {
        console.error('Error submitting form:', error);
        setIsLoading(false);
      }
    };
  

  const handleCropSelection = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCrops: prev.selectedCrops.includes(crop)
        ? prev.selectedCrops.filter(c => c !== crop)
        : [...prev.selectedCrops, crop],
    }));
  };

 
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => {
            setPage(1); // Reset to page 1
            onClose(); // Close the modal
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white border-2 border-green-600 rounded-3xl w-full max-w-lg p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Rounded Indicators */}
            <div className="flex justify-center items-center mb-6">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    page === 1 ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-green-600'
                  }`}
                >
                  1
                </div>
                <div className="w-10 h-0.5 bg-green-600"></div>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    page === 2 ? 'bg-green-600 text-white' : 'bg-white text-green-600 border-green-600'
                  }`}
                >
                  2
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Ready to Farm With Us?</h2>
              <p className="text-gray-600 mt-1">
                We’re looking for passionate farmers to grow with AgriPath. Let’s start with a few
                questions.
              </p>
            </div>

            {/* Form Pages */}
            {page === 1 && (
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    What’s your name? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Michael Doe"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    What’s your phone number? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="55 567 8905"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    What’s your email address? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="michael@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Where is your farm located? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Eastern Region"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    How long have you been farming? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.farmingYears}
                    onChange={e => setFormData({ ...formData, farmingYears: e.target.value })}
                    placeholder="2 years"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3 px-4 border-green-900 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all w-32"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage(2)}
                    className="py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all w-32"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}

            {page === 2 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    How many acres do you have available? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.acresAvailable}
                    onChange={e => setFormData({ ...formData, acresAvailable: e.target.value })}
                    placeholder="3 Acres"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    What crops are you interested in growing? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cropOptions.map(crop => (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => handleCropSelection(crop)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          formData.selectedCrops.includes(crop)
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Do you have access to irrigation? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    {['Yes', 'No'].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, irrigationAccess: option })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.irrigationAccess === option
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Will you need farm inputs (seeds, fertilizer, etc.)? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    {['Yes', 'No'].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, farmInputsNeeded: option })}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.farmInputsNeeded === option
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setPage(1)}
                    className="py-3 px-4 bg-gray-500 text-white rounded-lg font-medium hover:bg-gray-600 transition-all w-32"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="py-3 px-4 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all w-32"
                  >
                    Apply to Join
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
