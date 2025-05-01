import React from 'react';
import Link from 'next/link';
import { createClient } from "../utils/server";


export default async function InvestmentsPage() {
  // Get the current user
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h1>
          <p className="text-gray-600 mb-6">Please sign in to view your investments</p>
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

  // Mock investment data - would be fetched from the database in a real application
  const investments = [
    {
      id: '1',
      project: 'Organic Maize Farm',
      category: 'Crop Farming',
      location: 'Northern Region, Ghana',
      amount: 500,
      date: '2023-07-15',
      status: 'active',
      returns: 50,
      progress: 65,
      dueDate: '2023-12-15',
      image: '/projects/maize.jpg'
    },
    {
      id: '2',
      project: 'Coffee Plantation',
      category: 'Cash Crops',
      location: 'Highland Region, Kenya',
      amount: 1000,
      date: '2023-05-22',
      status: 'completed',
      returns: 120,
      progress: 100,
      dueDate: '2023-11-22',
      image: '/projects/coffee.jpg'
    },
    {
      id: '3',
      project: 'Rice Farm',
      category: 'Crop Farming',
      location: 'Wetlands, Nigeria',
      amount: 750,
      date: '2023-08-05',
      status: 'active',
      returns: 90,
      progress: 45,
      dueDate: '2024-02-05',
      image: '/projects/rice.jpg'
    },
    {
      id: '4',
      project: 'Urban Vegetable Greenhouse',
      category: 'Urban Farming',
      location: 'Lagos, Nigeria',
      amount: 250,
      date: '2023-06-12',
      status: 'pending',
      returns: 35,
      progress: 10,
      dueDate: '2023-12-12',
      image: '/projects/greenhouse.jpg'
    }
  ];

  // Calculate totals
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalReturns = investments.reduce((sum, inv) => sum + inv.returns, 0);
  const activeInvestments = investments.filter(inv => inv.status === 'active').length;
  const pendingInvestments = investments.filter(inv => inv.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Investments</h1>
          <p className="mt-2 text-gray-600">Track and manage your agricultural investments</p>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Invested</h2>
            <p className="mt-2 text-3xl font-semibold text-gray-900">${totalInvested}</p>
            <p className="mt-1 text-green-600 text-sm">Across {investments.length} projects</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Returns</h2>
            <p className="mt-2 text-3xl font-semibold text-gray-900">${totalReturns}</p>
            <p className="mt-1 text-green-600 text-sm">Earned & pending</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Investments</h2>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{activeInvestments}</p>
            <p className="mt-1 text-green-600 text-sm">In progress</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Pending Investments</h2>
            <p className="mt-2 text-3xl font-semibold text-gray-900">{pendingInvestments}</p>
            <p className="mt-1 text-green-600 text-sm">Awaiting start</p>
          </div>
        </div>
        
        {/* Filter Options */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <label htmlFor="filter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Status</label>
            <select
              id="filter"
              name="filter"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
            >
              <option value="all">All Investments</option>
              <option value="active">Active Only</option>
              <option value="completed">Completed Only</option>
              <option value="pending">Pending Only</option>
            </select>
          </div>
          
          <Link
            href="/projects"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Browse New Projects
          </Link>
        </div>
        
        {/* Investments List */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {investments.map((investment) => (
              <li key={investment.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                          {/* <img
                            src={investment.image}
                            alt={investment.project}
                            className="h-12 w-12 object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/48x48?text=AgriPath';
                            }}
                          /> */}
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-green-600">{investment.project}</p>
                          <div className="flex items-center">
                            <p className="text-xs text-gray-500">{investment.category}</p>
                            <span className="mx-1 text-gray-500">•</span>
                            <p className="text-xs text-gray-500">{investment.location}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${investment.status === 'active' ? 'bg-green-100 text-green-800' : 
                            investment.status === 'completed' ? 'bg-blue-100 text-blue-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                        >
                          {investment.status.charAt(0).toUpperCase() + investment.status.slice(1)}
                        </p>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500">Investment Amount</p>
                        <p className="mt-1 text-sm text-gray-900">${investment.amount}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Expected Returns</p>
                        <p className="mt-1 text-sm text-gray-900">${investment.returns}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Investment Date</p>
                        <p className="mt-1 text-sm text-gray-900">{new Date(investment.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs font-medium text-gray-500">Progress</p>
                        <p className="text-xs font-medium text-gray-500">{investment.progress}%</p>
                      </div>
                      <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                        <div
                          style={{ width: `${investment.progress}%` }}
                          className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center 
                            ${investment.status === 'active' ? 'bg-green-500' : 
                              investment.status === 'completed' ? 'bg-blue-500' : 
                              'bg-yellow-500'}`}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-gray-500">Due date: {new Date(investment.dueDate).toLocaleDateString()}</p>
                      <Link 
                        href={`/investments/${investment.id}`}
                        className="inline-flex items-center text-xs text-green-600 hover:text-green-900"
                      >
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" className="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Pagination */}
        <div className="mt-8 flex justify-between items-center">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{investments.length}</span> of <span className="font-medium">{investments.length}</span> investments
          </p>
          
          <div className="flex-1 flex justify-end">
            <button
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-not-allowed opacity-50"
              disabled
            >
              Previous
            </button>
            <button
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 cursor-not-allowed opacity-50"
              disabled
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 