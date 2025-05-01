'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Crop } from '@/lib/supabase';

enum InvestmentStep {
  SELECT_UNITS = 0,
  REVIEW = 1,
  PAYMENT = 2,
  CONFIRMATION = 3,
}

interface InvestmentFlowProps {
  crop: Crop;
  onClose: () => void;
}

export default function InvestmentFlow({ crop, onClose }: InvestmentFlowProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [currentStep, setCurrentStep] = useState(InvestmentStep.SELECT_UNITS);
  const [units, setUnits] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentUrl, setPaymentUrl] = useState<string | null>(null);
  const [transactionReference, setTransactionReference] = useState<string | null>(null);

  // Calculate values
  const totalInvestment = units * crop.price_per_unit;
  const estimatedReturns = totalInvestment * (1 + crop.expected_roi / 100);

  // Check if user is logged in
  const isLoggedIn = status === 'authenticated' && session?.user;

  // Handle unit change
  const handleUnitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value < 1) {
      setUnits(1);
    } else if (value > crop.available_units) {
      setUnits(crop.available_units);
    } else {
      setUnits(value);
    }
  };

  // Go to next step
  const goToNextStep = () => {
    if (currentStep < InvestmentStep.CONFIRMATION) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Go to previous step
  const goToPreviousStep = () => {
    if (currentStep > InvestmentStep.SELECT_UNITS) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Initialize payment
  const initializePayment = async () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/crops/${crop.id}`);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cropId: crop.id,
          units,
          email: session?.user?.email,
          callbackUrl: `${window.location.origin}/investments/verify`,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment');
      }

      setPaymentUrl(data.data.authorizationUrl);
      setTransactionReference(data.data.reference);
      goToNextStep();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect to Paystack payment page
  const redirectToPayment = () => {
    if (paymentUrl) {
      window.location.href = paymentUrl;
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case InvestmentStep.SELECT_UNITS:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Select Investment Units</h3>
            
            <div>
              <label htmlFor="units" className="block text-sm font-medium text-gray-700">
                Number of Units
              </label>
              <div className="mt-1 flex max-w-md rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setUnits(Math.max(1, units - 1))}
                  className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <input
                  type="number"
                  name="units"
                  id="units"
                  min="1"
                  max={crop.available_units}
                  value={units}
                  onChange={handleUnitChange}
                  className="block w-full border-gray-300 p-2 text-center focus:border-green-500 focus:ring-green-500"
                />
                <button
                  type="button"
                  onClick={() => setUnits(Math.min(crop.available_units, units + 1))}
                  className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 py-2 text-gray-500 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Available: {crop.available_units} units
              </p>
            </div>

            <div className="rounded-lg bg-gray-50 p-4">
              <div className="mb-3 flex justify-between">
                <span className="text-sm text-gray-600">Price per unit:</span>
                <span className="font-medium">${crop.price_per_unit.toFixed(2)}</span>
              </div>
              <div className="mb-3 flex justify-between">
                <span className="text-sm text-gray-600">Number of units:</span>
                <span className="font-medium">{units}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">Total investment:</span>
                  <span className="font-medium text-green-600">${totalInvestment.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg bg-green-50 p-4">
              <h4 className="mb-2 font-medium text-green-800">Estimated Returns</h4>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">After {crop.duration_months} months:</span>
                <span className="font-medium text-green-800">${estimatedReturns.toFixed(2)}</span>
              </div>
              <div className="mt-1 flex justify-between">
                <span className="text-sm text-gray-600">ROI:</span>
                <span className="font-medium text-green-800">{crop.expected_roi}%</span>
              </div>
            </div>
          </div>
        );

      case InvestmentStep.REVIEW:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Review Your Investment</h3>
            
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Crop</dt>
                    <dd className="mt-1 text-sm text-gray-900">{crop.name}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="mt-1 text-sm text-gray-900">{crop.location}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Duration</dt>
                    <dd className="mt-1 text-sm text-gray-900">{crop.duration_months} months</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Expected ROI</dt>
                    <dd className="mt-1 text-sm text-green-600">{crop.expected_roi}%</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Units</dt>
                    <dd className="mt-1 text-sm text-gray-900">{units}</dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Price per Unit</dt>
                    <dd className="mt-1 text-sm text-gray-900">${crop.price_per_unit.toFixed(2)}</dd>
                  </div>
                  <div className="sm:col-span-2 border-t border-gray-200 pt-4">
                    <dt className="text-sm font-medium text-gray-500">Total Investment</dt>
                    <dd className="mt-1 text-lg font-bold text-green-600">${totalInvestment.toFixed(2)}</dd>
                  </div>
                  <div className="sm:col-span-2 border-t border-gray-200 pt-4">
                    <dt className="text-sm font-medium text-gray-500">Estimated Returns (after {crop.duration_months} months)</dt>
                    <dd className="mt-1 text-lg font-bold text-green-600">${estimatedReturns.toFixed(2)}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                By proceeding, you agree to our Investment Terms & Conditions.
              </p>
            </div>

            {error && (
              <div className="rounded-lg bg-red-50 p-4 text-sm text-red-800">
                <p className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}
          </div>
        );

      case InvestmentStep.PAYMENT:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900">Complete Your Payment</h3>
            
            <div className="rounded-lg bg-green-50 p-4 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <h4 className="mt-2 text-lg font-medium text-green-800">Secure Payment</h4>
              <p className="mt-1 text-sm text-green-600">
                You will be redirected to Paystack to complete your payment of ${totalInvestment.toFixed(2)}
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center space-x-3">
                <img 
                  src="/assets/paystack-logo.png" 
                  alt="Paystack" 
                  className="h-8"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <span className="text-sm font-medium">Secure payment powered by Paystack</span>
              </div>
              <p className="text-sm text-gray-600">
                Transaction Reference: {transactionReference}
              </p>
            </div>
          </div>
        );

      case InvestmentStep.CONFIRMATION:
        return (
          <div className="space-y-6 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-bold text-gray-900">Payment Initiated</h3>
            <p className="text-gray-600">
              You will be redirected to Paystack to complete your payment.
            </p>
            <p className="text-sm text-gray-500">
              After payment, you will be redirected back to AgriPath.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Render footer actions
  const renderFooterActions = () => {
    switch (currentStep) {
      case InvestmentStep.SELECT_UNITS:
        return (
          <>
            <button
              type="button"
              onClick={onClose}
              className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={goToNextStep}
              disabled={units < 1}
              className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              Continue
            </button>
          </>
        );

      case InvestmentStep.REVIEW:
        return (
          <>
            <button
              type="button"
              onClick={goToPreviousStep}
              className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={initializePayment}
              disabled={isLoading}
              className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
            >
              {isLoading ? 'Processing...' : 'Proceed to Payment'}
            </button>
          </>
        );

      case InvestmentStep.PAYMENT:
        return (
          <>
            <button
              type="button"
              onClick={goToPreviousStep}
              className="mr-2 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              type="button"
              onClick={redirectToPayment}
              className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Complete Payment
            </button>
          </>
        );

      case InvestmentStep.CONFIRMATION:
        return (
          <button
            type="button"
            onClick={redirectToPayment}
            className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Proceed to Paystack
          </button>
        );

      default:
        return null;
    }
  };

  // Render step indicator
  const renderStepIndicator = () => {
    const steps = [
      { name: 'Units', status: currentStep >= InvestmentStep.SELECT_UNITS ? 'current' : 'upcoming' },
      { name: 'Review', status: currentStep >= InvestmentStep.REVIEW ? 'current' : 'upcoming' },
      { name: 'Payment', status: currentStep >= InvestmentStep.PAYMENT ? 'current' : 'upcoming' },
    ];

    return (
      <nav aria-label="Progress" className="mb-8">
        <ol className="flex items-center">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className={`${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} relative`}>
              {stepIdx !== steps.length - 1 && (
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className={`h-0.5 w-full ${currentStep > stepIdx ? 'bg-green-600' : 'bg-gray-200'}`} />
                </div>
              )}
              <div className="relative flex items-center justify-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full ${
                    currentStep > stepIdx
                      ? 'bg-green-600 text-white'
                      : currentStep === stepIdx
                      ? 'border-2 border-green-600 bg-white text-green-600'
                      : 'border-2 border-gray-300 bg-white text-gray-500'
                  }`}
                >
                  {currentStep > stepIdx ? (
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span>{stepIdx + 1}</span>
                  )}
                </span>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep >= stepIdx ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </nav>
    );
  };

  return (
    <div className="relative bg-white px-4 pb-8 pt-5 sm:p-6 sm:pb-4">
      <div className="sm:flex sm:items-start">
        <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Invest in {crop.name}
          </h2>
          
          {renderStepIndicator()}
          
          {renderStepContent()}
          
          <div className="mt-8 flex justify-end space-x-3">
            {renderFooterActions()}
          </div>
        </div>
      </div>
    </div>
  );
} 