'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Loader2 } from 'lucide-react';

interface OfftakerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const [page, setPage] = useState(1);
const [isOpen,setIsOpen] = useState(true)
const openModal = () => {
  setPage(1); // Reset to page 1 whenever the modal opens
  setIsOpen(true); // Open the modal
};

const closeModal = () => {
  setPage(1); // Reset to page 1 whenever the modal closes
  setIsOpen(false); // Close the modal
};



const cropOptions = [
  'Tomatoes',
  'Sweet Potatoes',
  'Maize',
  'Bell Pepper',
  'Habanero',
  'Cassava',
  'Other',
];

export default function OfftakerFormModal({ isOpen, onClose }: OfftakerFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+233',
    selectedCrops: [] as string[],
    quantity: '',
    frequency: '',
    paymentTerms: '',
    deliveryOption: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const airtableBaseId = 'appnXR8HBSlvBGHhX';
    const airtableTableId= 'tblRWZ7Mszj6PGh5P';
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
            email:formData.email,
            phone:`${formData.countryCode} ${formData.phone}`,
            selectedCrops:formData.selectedCrops.join(', '),
            quantity:formData.quantity,
            frequency:formData.frequency,
            paymentTerms:formData.paymentTerms,
            deliveryOption:formData.deliveryOption
          }
        })
        
      })
      setShowSuccess(true);
      setIsLoading(false);

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+233',
          selectedCrops: [],
          quantity: '',
          frequency: '',
          paymentTerms: '',
          deliveryOption: '',
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
          onClick={()=>}
         
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-white rounded-3xl w-full max-w-lg p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${page === 1 ? 'border-green-900' : 'border-gray-300'} bg-green-900 text-lg font-bold text-yellow-600`}>1</div>
                <div className="w-25 h-1 bg-green-900 mx-0"></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${page === 2 ? 'border-green-900' : 'border-green-800'} bg-white text-lg font-bold text-green-700`}>2</div>
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
                    What’s your name or company name? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Michael Doe / Micky Ltd."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
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
                    What’s your phone number? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={e => setFormData({ ...formData, countryCode: e.target.value })}
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
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="550 000 000"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    What crops are you looking to buy? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {cropOptions.map(crop => (
                      <button
                        key={crop}
                        type="button"
                        onClick={() => handleCropSelection(crop)}
                        className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
                          formData.selectedCrops.includes(crop)
                            ? 'bg-green-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {crop}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={onClose}
                    className="py-3 px-23 border-1 border-green-950 bg-white-500  text-green-950 rounded-lg font-bold hover:bg-green-700 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPage(2)}
                    className="py-3 px-23 bg-green-900 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
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
                    How much do you need? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="10 tons, 500 bags"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    How often do you buy? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['One-time', 'Weekly', 'Monthly', 'When available', 'Other'].map(frequency => (
                      <button
                        key={frequency}
                        type="button"
                        onClick={() => setFormData({ ...formData, frequency })}
                        className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
                          formData.frequency === frequency
                            ? 'bg-green-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {frequency}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Do you have preferred payment terms?
                  </label>
                  <input
                    type="text"
                    value={formData.paymentTerms}
                    onChange={e => setFormData({ ...formData, paymentTerms: e.target.value })}
                    placeholder="Tell us what you have in mind."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-900 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">
                    Delivery or Pick up? <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['Delivery', 'Pick up'].map(option => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setFormData({ ...formData, deliveryOption: option })}
                        className={`px-4 py-2 rounded-2xl text-sm font-medium transition-colors ${
                          formData.deliveryOption === option
                            ? 'bg-green-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center">
            
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={!isLoading ? { scale: 1.02 } : {}}
                    whileTap={!isLoading ? { scale: 0.98 } : {}}
                    className={`py-3 px-18 rounded-lg font-bold transition-all duration-300 relative overflow-hidden
                    ${isLoading ? 'bg-green-700 text-transparent' : 'bg-green-950 text-yellow-500 font-bold hover:bg-green-700'}`}
                  >
                    <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300
                      ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
                      <Loader2 className="w-6 h-6 animate-spin text-white" />
                    </span>
                    <span className={`transition-opacity duration-300
                      ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                      Submit Request
                    </span>
                  </motion.button>
                </div>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* Success Dialog */}
      <AnimatePresence>
        {showSuccess && (
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
                transition={{ type: 'spring', delay: 0.1 }}
                className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 text-green-900" />
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Your request has been received. We'll get back to you soon.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
}
