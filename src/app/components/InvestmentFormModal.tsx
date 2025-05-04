'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Loader2 } from 'lucide-react'

interface InvestmentFormModalProps {
  isOpen: boolean
  onClose: () => void
}

const cropOptions = ['Tomatoes', 'Habanero', 'Sweet Potatoes', 'Bell Pepper', 'Other']
const unitOptions = ['1 Unit', '2 Units', '3 Units', '4 Units', '4+ Units', 'Other']

export default function InvestmentFormModal({ isOpen, onClose }: InvestmentFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+233',
    selectedCrops: [] as string[],
    selectedUnits: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 2000)) // Fake API
      console.log('Form submitted:', formData)

      setShowSuccess(true)
      setIsLoading(false)

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          countryCode: '+233',
          selectedCrops: [],
          selectedUnits: '',
        })
        setShowSuccess(false)
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setIsLoading(false)
    }
  }

  const handleCropSelection = (crop: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCrops: prev.selectedCrops.includes(crop)
        ? prev.selectedCrops.filter(c => c !== crop)
        : [...prev.selectedCrops, crop],
    }))
  }

  // Success modal component
  const SuccessDialog = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/30"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="w-full max-w-sm p-6 bg-white rounded-2xl text-center shadow-xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1 }}
          className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full"
        >
          <Check className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="mb-2 text-xl font-semibold text-gray-900">Thank You!</h3>
        <p className="text-gray-600">
          Your investment request has been received. We'll get back to you soon.
        </p>
      </motion.div>
    </motion.div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full bg-white rounded-3xl p-4 xs:p-6 sm:p-8 md:p-10 max-w-[95vw] xs:max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute text-gray-400 transition-colors right-3 top-3 hover:text-gray-600 sm:right-4 sm:top-4"
            >
              <X size={24} />
            </button>

            {/* Form Header */}
            <div className="mb-6 text-center">
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                Let's Grow Together
              </h2>
              <p className="mt-1 text-sm text-gray-600 sm:text-base">
                Choose your crop, tell us how many units you want, and we'll take it from there.
              </p>
            </div>

            {/* Investment Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block mb-1 text-sm font-medium text-gray-700">
                    What's your name? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Michael Doe"
                    className="w-full px-4 py-2 transition border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
                    What's your email address? <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="michael@example.com"
                    className="w-full px-4 py-2 transition border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block mb-1 text-sm font-medium text-gray-700">
                  What's your phone number? <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <select
                    value={formData.countryCode}
                    onChange={e => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                    className="w-full px-3 py-2 transition border rounded-lg sm:w-36 border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="550 000 000"
                    className="flex-1 px-4 py-2 transition border rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Crop Selection */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Which crop are you investing in? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {cropOptions.map(crop => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => handleCropSelection(crop)}
                      className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
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
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  How many units would you like to invest in? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                  {unitOptions.map(unit => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, selectedUnits: unit }))}
                      className={`px-4 py-2 text-sm font-medium transition-colors rounded-full ${
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
                className={`relative w-full px-4 py-3 font-medium transition-all duration-300 rounded-lg overflow-hidden ${
                  isLoading
                    ? 'bg-green-600 text-transparent cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                <span
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                    isLoading ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Loader2 className="w-6 h-6 text-white animate-spin" />
                </span>
                <span
                  className={`transition-opacity duration-300 ${
                    isLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  Send
                </span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}

      {/* Success Dialog */}
      <AnimatePresence>{showSuccess && <SuccessDialog />}</AnimatePresence>
    </AnimatePresence>
  )
}