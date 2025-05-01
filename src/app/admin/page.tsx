'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDashboardStats, getCrops } from '@/lib/api';
import { Crop } from '@/lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalInvestments: 0,
    totalAmount: 0,
    activeCrops: 0,
    totalUsers: 0
  });
  const [recentCrops, setRecentCrops] = useState<Crop[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch dashboard stats
        const { data: statsData, error: statsError } = await getDashboardStats();
        if (statsError) throw new Error(statsError.message || 'Failed to fetch dashboard stats');
        if (statsData) setStats(statsData);

        // Fetch recent crops
        const { data: cropsData, error: cropsError } = await getCrops();
        if (cropsError) throw new Error(cropsError.message || 'Failed to fetch recent crops');
        if (cropsData) setRecentCrops(cropsData.slice(0, 5)); // Get the first 5 crops
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-5rem)] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-green-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-800">
        <h2 className="text-lg font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <Link 
          href="/admin/crops/new" 
          className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Add New Crop
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Investments */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Investments</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalInvestments}</h3>
            </div>
          </div>
        </div>

        {/* Total Amount */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Amount</p>
              <h3 className="text-2xl font-bold text-gray-800">${stats.totalAmount.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Active Crops */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Crops</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.activeCrops}</h3>
            </div>
          </div>
        </div>

        {/* Total Users */}
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-800">{stats.totalUsers}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Crops */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800">Recent Crops</h2>
          <Link 
            href="/admin/crops" 
            className="text-sm font-medium text-green-600 hover:underline"
          >
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Crop
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Price/Unit
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Available Units
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {recentCrops.length > 0 ? (
                recentCrops.map((crop) => (
                  <tr key={crop.id}>
                    <td className="whitespace-nowrap px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-md bg-gray-100">
                          {crop.image_url ? (
                            <img 
                              src={crop.image_url} 
                              alt={crop.name} 
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full p-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{crop.name}</div>
                          <div className="text-sm text-gray-500">{crop.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      ${crop.price_per_unit}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                      {crop.available_units}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span 
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          crop.status === 'active' ? 'bg-green-100 text-green-800' :
                          crop.status === 'coming_soon' ? 'bg-yellow-100 text-yellow-800' :
                          crop.status === 'sold_out' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {crop.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                      <Link 
                        href={`/admin/crops/${crop.id}/edit`} 
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-sm text-gray-500">
                    No crops found. <Link href="/admin/crops/new" className="text-green-600 hover:underline">Add your first crop</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 