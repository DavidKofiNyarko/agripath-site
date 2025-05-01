'use client';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth';

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoading } = useAuth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'success' | 'failed' | 'pending'>('pending');
  const [paymentData, setPaymentData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Get reference from URL params
  const reference = searchParams.get('reference');

  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !user) {
      router.push(`/login?redirect=/investments/verify?reference=${reference}`);
      return;
    }

    if (isLoading || !reference || !user) {
      return;
    }

    const verifyPayment = async () => {
      setIsVerifying(true);
      try {
        const response = await fetch(`/api/payments/verify?reference=${reference}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to verify payment');
        }

        setPaymentData(data.data);
        setVerificationStatus('success');
      } catch (err) {
        console.error('Verification error:', err);
        setVerificationStatus('failed');
        setError(err instanceof Error ? err.message : 'Failed to verify payment');
      } finally {
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [reference, router, isLoading, user]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="px-4 py-5 sm:p-6">
          <div className="text-center">
            {isLoading || isVerifying ? (
              <div className="py-12">
                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-green-600"></div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">
                  {isLoading ? 'Loading...' : 'Verifying Payment'}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Please wait...
                </p>
              </div>
            ) : verificationStatus === 'success' ? (
              <div className="py-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900">Payment Successful!</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Thank you for your investment. Your transaction has been completed successfully.
                </p>
                <div className="mt-8 rounded-md bg-gray-50 p-6">
                  <div className="mb-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500">Amount Paid</p>
                      <p className="text-lg font-bold text-gray-900">
                        ${paymentData?.amount.toFixed(2)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Reference</p>
                      <p className="font-medium text-gray-900">{paymentData?.reference}</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-center space-x-4">
                  <Link
                    href="/investments"
                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    View My Investments
                  </Link>
                  <Link
                    href="/crops"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    Explore More Crops
                  </Link>
                </div>
              </div>
            ) : verificationStatus === 'failed' ? (
              <div className="py-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h3 className="mt-6 text-2xl font-bold text-gray-900">Payment Verification Failed</h3>
                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                  We couldn't verify your payment. This could be due to a network issue or the payment was not completed.
                </p>
                {error && (
                  <div className="mx-auto mt-4 max-w-md rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <div className="mt-8 flex justify-center space-x-4">
                  <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center rounded-md border border-transparent bg-green-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700"
                  >
                    Try Again
                  </button>
                  <Link
                    href="/investments"
                    className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    View My Investments
                  </Link>
                </div>
              </div>
            ) : (
              <div className="py-12">
                <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-green-600"></div>
                <h3 className="mt-6 text-lg font-medium text-gray-900">Initializing Verification</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Please wait...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 