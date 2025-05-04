'use client'

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2, CloudCog } from 'lucide-react';
import { select } from 'framer-motion/client';

interface InvestmentFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const cropOptions = [
  'Tomatoes',
  'Habanero',
  'Sweet Potatoes',
  'Bell Pepper',
  'Other'
];

const unitOptions = [
  '1 Unit',
  '2 Units',
  '3 Units',
  '4 Units',
  '4+ Units',
  'Other'
];

export default function InvestmentFormModal({ isOpen, onClose }: InvestmentFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+233',
    selectedCrops: [] as string[],
    selectedUnits: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const airtableBaseId = 'appnXR8HBSlvBGHhX';
    const airtableTableId= 'tbloZx12SgBpb4ggr';
    const airtableApiKey='patgEqThfqkt0b5oi.c6a8ba206431f0157b489a798aa7dc4faef60342bcedfe97b1ef84216f04aec1'
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      // TODO: Connect to Airtable
     
        await fetch(`https://api.airtable.com/v0/${airtableBaseId}/${airtableTableId}`,{
          method:"POST",
          headers:{
            Authorization:`Bearer ${airtableApiKey}`,
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            fields:{
              name:formData.name,
              email:formData.email,
              phone:`${formData.countryCode} ${formData.phone}`,
              selectedCrops:formData.selectedCrops.join(', '),
              selectedUnits: formData.selectedUnits,
            }
          })
          
        })
     
      // console.log('Form submitted:', formData);
      setShowSuccess(true);
      setIsLoading(false);    
      
         
      // Reset form after 2 seconds of showing success
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+233',
          selectedCrops: [],
          selectedUnits: '',
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
        : [...prev.selectedCrops, crop]
    }));
  };

  // Success modal component
  const SuccessDialog = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-sm text-center shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">
          Your investment request has been received. We'll get back to you soon.
        </p>
      </motion.div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-3xl w-full max-w-md p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>

            {/* Form Header */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Let's Grow Together</h2>
              <p className="text-gray-600 mt-1">
                Choose your crop, tell us how many units you want, and we'll take it from there.
              </p>
            </div>

            {/* Investment Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your name? <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Michael Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your email address? <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="michael@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  What's your phone number? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={formData.countryCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="+233">🇬🇭 +233</option>
                    <option value="+234">🇳🇬 +234</option>
                    <option value="+27">🇿🇦 +27</option>
                    <option value="+254">🇰🇪 +254</option>
                    <option value="+255">🇹🇿 +255</option>
                  </select>
                  <input
                    type="tel"
                    id="phone"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="550 000 000"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Crop Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Which crop are you investing in? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {cropOptions.map((crop) => (
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

              {/* Units Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How many units would you like to invest in? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {unitOptions.map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, selectedUnits: unit }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.selectedUnits === unit
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-300 relative overflow-hidden
                  ${isLoading ? 'bg-green-600 text-transparent' : 'bg-green-600 text-white hover:bg-green-700'}`}
              >
                <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
                  ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                  <Loader2 className="w-6 h-6 animate-spin text-white" />
                </span>
                <span className={`transition-opacity duration-300
                  ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                  Send
                </span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
      
      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccess && <SuccessDialog />}
      </AnimatePresence>
    </AnimatePresence>
  );
} 