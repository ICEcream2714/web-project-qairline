import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const TravelDoc = () => {
  return (
    <div className="md:border-b md:border-gray-300 md:pb-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-700">
          Your travel documents
        </h2>
        {/* <button className="flex items-center gap-1 text-secondary">
          <Pencil className="h-4 w-4 text-secondary" />
          Edit
        </button> */}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold text-gray-800">Passport Details</p>
          <p className="text-gray-600">N/A</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Nationality</p>
          <p className="text-gray-600">N/A</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Passport number</p>
          <p className="text-gray-600">N/A</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Expiry date</p>
          <p className="text-gray-600">N/A</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">National ID number</p>
          <p className="text-gray-600">N/A</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Redress number</p>
          <p className="text-gray-600">N/A</p>
        </div>
        <div>
          <p className="font-semibold text-gray-800">Known traveler number</p>
          <p className="text-gray-600">N/A</p>
        </div>
      </div>
    </div>
  );
};

export default TravelDoc;
