'use client';
import { useState, useRef, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createCrop, getFarmers } from '@/lib/api';
import { uploadImage } from '@/lib/api';
import { Farmer } from '@/lib/supabase';
import { useEffect } from 'react';

export default function NewCropPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [farmers, setFarmers] = useState<Farmer[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    // Fetch farmers for dropdown
    async function loadFarmers() {
      const { data, error } = await getFarmers();
      if (error) {
        setError('Failed to load farmers. Please try again.');
        return;
      }
      if (data) setFarmers(data);
    }
    
    loadFarmers();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview the image
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const pricePerUnit = parseFloat(formData.get('pricePerUnit') as string);
      const minInvestment = parseFloat(formData.get('minInvestment') as string);
      const expectedRoi = parseFloat(formData.get('expectedRoi') as string);
      const durationMonths = parseInt(formData.get('durationMonths') as string);
      const availableUnits = parseInt(formData.get('availableUnits') as string);
      const location = formData.get('location') as string;
      const category = formData.get('category') as string;
      const status = formData.get('status') as string;
      const farmerId = formData.get('farmerId') as string;
      const imageFile = fileInputRef.current?.files?.[0];

      let imageUrl = '';
      
      // Upload image if provided
      if (imageFile) {
        const uniqueFileName = `crops/${Date.now()}-${imageFile.name.replace(/\s+/g, '-')}`;
        const { data: uploadedUrl, error: uploadError } = await uploadImage(imageFile, uniqueFileName);
        
        if (uploadError) {
          throw new Error('Failed to upload image. Please try again.');
        }
        
        imageUrl = uploadedUrl as string;
      }
      
      // Create crop
      const { data, error: cropError } = await createCrop({
        name,
        description,
        image_url: imageUrl,
        price_per_unit: pricePerUnit,
        min_investment: minInvestment,
        expected_roi: expectedRoi,
        duration_months: durationMonths,
        available_units: availableUnits,
        location,
        category,
        status: status as 'active' | 'coming_soon' | 'sold_out' | 'completed',
        farmer_id: farmerId
      });
      
      if (cropError) {
        throw new Error(cropError.message || 'Failed to create crop');
      }
      
      // Redirect to crops page
      router.push('/admin/crops');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Add New Crop</h1>
        <Link 
          href="/admin/crops" 
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>
      
      {error && (
        <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-800">
          <h2 className="font-bold">Error</h2>
          <p>{error}</p>
        </div>
      )}
      
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Crop Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="Enter crop name"
              />
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                rows={4}
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="Describe the crop and investment opportunity"
              ></textarea>
            </div>
            
            <div>
              <label htmlFor="pricePerUnit" className="block text-sm font-medium text-gray-700">
                Price Per Unit ($)
              </label>
              <input
                type="number"
                name="pricePerUnit"
                id="pricePerUnit"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label htmlFor="minInvestment" className="block text-sm font-medium text-gray-700">
                Minimum Investment ($)
              </label>
              <input
                type="number"
                name="minInvestment"
                id="minInvestment"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label htmlFor="expectedRoi" className="block text-sm font-medium text-gray-700">
                Expected ROI (%)
              </label>
              <input
                type="number"
                name="expectedRoi"
                id="expectedRoi"
                required
                min="0"
                step="0.01"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="0.00"
              />
            </div>
            
            <div>
              <label htmlFor="durationMonths" className="block text-sm font-medium text-gray-700">
                Duration (Months)
              </label>
              <input
                type="number"
                name="durationMonths"
                id="durationMonths"
                required
                min="1"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="12"
              />
            </div>
            
            <div>
              <label htmlFor="availableUnits" className="block text-sm font-medium text-gray-700">
                Available Units
              </label>
              <input
                type="number"
                name="availableUnits"
                id="availableUnits"
                required
                min="0"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="100"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
                placeholder="Enter location"
              />
            </div>
            
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                name="category"
                id="category"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option value="">Select category</option>
                <option value="Grains">Grains</option>
                <option value="Fruits">Fruits</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Cash Crops">Cash Crops</option>
                <option value="Livestock">Livestock</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                name="status"
                id="status"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option value="">Select status</option>
                <option value="active">Active</option>
                <option value="coming_soon">Coming Soon</option>
                <option value="sold_out">Sold Out</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="farmerId" className="block text-sm font-medium text-gray-700">
                Farmer
              </label>
              <select
                name="farmerId"
                id="farmerId"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-green-500 focus:outline-none focus:ring-green-500"
              >
                <option value="">Select farmer</option>
                {farmers.map(farmer => (
                  <option key={farmer.id} value={farmer.id}>
                    {farmer.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="sm:col-span-2">
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Crop Image
              </label>
              <div className="mt-1 flex items-center space-x-4">
                {previewImage && (
                  <div className="h-24 w-24 overflow-hidden rounded-md">
                    <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  name="image"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-green-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-green-700 hover:file:bg-green-100"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Recommended size: 800x600 pixels. Max file size: 5MB.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <Link
              href="/admin/crops"
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-70"
            >
              {isSubmitting ? 'Saving...' : 'Create Crop'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 