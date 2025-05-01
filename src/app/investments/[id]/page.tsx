import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createClient } from "../../utils/server";
import { notFound } from 'next/navigation';

// Indicate this is a dynamic route that should not be cached
export const dynamic = 'force-dynamic';

// Define investment interface
interface Investment {
  id: string;
  project: string;
  category: string;
  location: string;
  amount: number;
  date: string;
  status: 'active' | 'completed' | 'pending';
  returns: number;
  progress: number;
  dueDate: string;
  image: string;
  description?: string;
}

// Mock database function to get investment by ID
function getInvestmentById(id: string): Investment | null {
  // This would be replaced with an actual database query
  const investments = [
    {
      id: '1',
      project: 'Organic Maize Farm',
      category: 'Crop Farming',
      location: 'Northern Region, Ghana',
      amount: 500,
      date: '2023-07-15',
      status: 'active' as const,
      returns: 50,
      progress: 65,
      dueDate: '2023-12-15',
      image: '/projects/maize.jpg',
      description: 'This organic maize farm focuses on sustainable farming practices to produce high-quality maize while preserving soil health and biodiversity. The project employs local farmers and provides fair wages.',
    },
    {
      id: '2',
      project: 'Coffee Plantation',
      category: 'Cash Crops',
      location: 'Highland Region, Kenya',
      amount: 1000,
      date: '2023-05-22',
      status: 'completed' as const,
      returns: 120,
      progress: 100,
      dueDate: '2023-11-22',
      image: '/projects/coffee.jpg',
      description: 'Our Highland Coffee Plantation produces premium Arabica coffee beans at high altitudes, resulting in exceptional flavor profiles. The project supports sustainable farming and fair trade practices.',
    },
    {
      id: '3',
      project: 'Rice Farm',
      category: 'Crop Farming',
      location: 'Wetlands, Nigeria',
      amount: 750,
      date: '2023-08-05',
      status: 'active' as const,
      returns: 90,
      progress: 45,
      dueDate: '2024-02-05',
      image: '/projects/rice.jpg',
      description: 'This rice farm implements innovative irrigation systems to maximize yield while minimizing water usage. The project focuses on producing high-quality rice varieties suited to local conditions.',
    },
    {
      id: '4',
      project: 'Urban Vegetable Greenhouse',
      category: 'Urban Farming',
      location: 'Lagos, Nigeria',
      amount: 250,
      date: '2023-06-12',
      status: 'pending' as const,
      returns: 35,
      progress: 10,
      dueDate: '2023-12-12',
      image: '/projects/greenhouse.jpg',
      description: 'Our urban greenhouse project brings fresh vegetable production closer to city consumers, reducing transportation costs and carbon footprint. The project employs advanced hydroponic systems for efficient growing.',
    }
  ];
  
  return investments.find(inv => inv.id === id) || null;
}

export default async function InvestmentDetailPage({ params }: { params: { id: string } }) {
  // Get the current user
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  
  // We only need to know if the user exists, not pass the whole user object
  const isAuthenticated = !!data.user?.id;
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please sign in to view investment details</p>
          <Link 
            href="/login" 
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Get investment by ID from our mock function
  const investment = getInvestmentById(params.id);
  
  // If investment not found, show 404
  if (!investment) {
    notFound();
  }

  // Calculate additional metrics (these would be real calculations in a production app)
  const returnPercentage = ((investment.returns / investment.amount) * 100).toFixed(1);
  const daysRemaining = Math.max(0, Math.floor((new Date(investment.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)));
  const isMatureInvestment = investment.progress >= 30;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link 
            href="/investments" 
            className="inline-flex items-center text-sm text-green-600 hover:text-green-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Back to Investments
          </Link>
        </div>
        
        {/* Investment Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:flex-shrink-0 md:w-1/3 h-64 relative">
              <div className="h-full w-full relative">
                <img
                  src={investment.image}
                  alt={investment.project}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x400?text=AgriPath';
                  }}
                />
              </div>
            </div>
            <div className="p-8 md:w-2/3">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{investment.project}</h1>
                  <div className="flex items-center mt-1">
                    <p className="text-sm text-gray-500">{investment.category}</p>
                    <span className="mx-2 text-gray-500">•</span>
                    <p className="text-sm text-gray-500">{investment.location}</p>
                  </div>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full 
                    ${investment.status === 'active' ? 'bg-green-100 text-green-800' : 
                      investment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                      'bg-yellow-100 text-yellow-800'}`}
                  >
                    {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                  </span>
                </div>
              </div>
              
              <p className="mt-4 text-gray-600">
                {investment.description || 'No description available for this investment.'}
              </p>
              
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Investment Amount</p>
                  <p className="mt-1 text-lg font-semibold text-gray-900">${investment.amount}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Expected Returns</p>
                  <p className="mt-1 text-lg font-semibold text-green-600">${investment.returns} <span className="text-sm text-gray-500">({returnPercentage}%)</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Investment Progress */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Progress Tracking</h2>
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <p className="text-sm font-medium text-gray-500">Current Progress</p>
                <p className="text-sm font-medium text-gray-700">{investment.progress}%</p>
              </div>
              <div className="overflow-hidden h-4 text-xs flex rounded bg-gray-200">
                <div
                  style={{ width: `${investment.progress}%` }}
                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded-l
                    ${investment.status === 'active' ? 'bg-green-500' : 
                      investment.status === 'completed' ? 'bg-blue-500' : 
                      'bg-yellow-500'}`}
                ></div>
              </div>
            </div>
            
            <div className="text-sm">
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Investment Date:</span>
                <span className="font-medium">{new Date(investment.date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Due Date:</span>
                <span className="font-medium">{new Date(investment.dueDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-500">Days Remaining:</span>
                <span className="font-medium">{daysRemaining} days</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Financial Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">Initial Investment</span>
                <span className="font-medium">${investment.amount}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">Expected ROI</span>
                <span className="font-medium">{returnPercentage}%</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-gray-100">
                <span className="text-gray-600">Expected Return</span>
                <span className="font-medium text-green-600">${investment.returns}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-600 font-medium">Total Value at Maturity</span>
                <span className="font-semibold">${investment.amount + investment.returns}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            <div className="space-y-4">
              <button
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                View Updates
              </button>
              
              {isMatureInvestment && investment.status === 'active' && (
                <button
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Request Partial Withdrawal
                </button>
              )}
              
              <button
                className="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Contact Project Manager
              </button>
            </div>
          </div>
        </div>
        
        {/* Project Updates */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Project Updates</h2>
          
          <div className="border-l-2 border-green-500 pl-4 mb-6">
            <div className="relative mb-4">
              <div className="absolute -left-6 mt-1 rounded-full bg-green-500 w-2 h-2"></div>
              <div className="flex justify-between">
                <h3 className="text-md font-medium text-gray-900">Phase 3 Complete</h3>
                <span className="text-sm text-gray-500">2 weeks ago</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">All crops have been planted and initial growth is on track. Irrigation systems are functioning correctly.</p>
            </div>
            
            <div className="relative mb-4">
              <div className="absolute -left-6 mt-1 rounded-full bg-green-500 w-2 h-2"></div>
              <div className="flex justify-between">
                <h3 className="text-md font-medium text-gray-900">Phase 2 Complete</h3>
                <span className="text-sm text-gray-500">1 month ago</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Land preparation is complete and fertilization has been done according to soil analysis results.</p>
            </div>
            
            <div className="relative">
              <div className="absolute -left-6 mt-1 rounded-full bg-green-500 w-2 h-2"></div>
              <div className="flex justify-between">
                <h3 className="text-md font-medium text-gray-900">Project Launch</h3>
                <span className="text-sm text-gray-500">{new Date(investment.date).toLocaleDateString()}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">Project has officially launched. Initial funding secured and work has begun.</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="text-sm text-green-600 hover:text-green-900 font-medium">
              View All Updates
            </button>
          </div>
        </div>
        
        {/* Similar Investments */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Similar Investment Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full relative">
                <img
                  src="/projects/wheat.jpg"
                  alt="Wheat Farm"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=AgriPath';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900">Wheat Farm</h3>
                <p className="text-sm text-gray-500 mb-2">Eastern Region, Ghana</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">$750</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">18% ROI</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full relative">
                <img
                  src="/projects/dairy.jpg"
                  alt="Dairy Farm"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=AgriPath';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900">Dairy Farm</h3>
                <p className="text-sm text-gray-500 mb-2">Central Region, Kenya</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">$1,200</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">22% ROI</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-40 w-full relative">
                <img
                  src="/projects/poultry.jpg"
                  alt="Poultry Farm"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=AgriPath';
                  }}
                />
              </div>
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-900">Poultry Farm</h3>
                <p className="text-sm text-gray-500 mb-2">Lagos State, Nigeria</p>
                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-medium">$850</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">20% ROI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 