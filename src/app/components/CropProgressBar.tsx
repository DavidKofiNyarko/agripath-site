'use client';
import React from 'react';

interface CropProgressBarProps {
  unitsSold: string;
  totalUnits: string;
}

const CropProgressBar: React.FC<CropProgressBarProps> = ({ unitsSold, totalUnits }) => {
  // Parse the units sold and total units as numbers
  const sold = parseInt(unitsSold.replace(/,/g, ''), 10);
  const total = parseInt(totalUnits.replace(/,/g, ''), 10);
  
  // Calculate the percentage
  const percentage = (sold / total) * 100;
  
  return (
    <div className="w-full">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-green-600 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs text-gray-600 mt-1">
        <span>{unitsSold} units</span>
        <span>{totalUnits} units</span>
      </div>
    </div>
  );
};

export default CropProgressBar; 