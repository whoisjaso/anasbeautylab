import React from 'react';

const Gallery = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gallery Management</h1>
          <p className="text-gray-500">Manage your before/after transformations and studio photos.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
          Upload New
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <p className="text-gray-500">Gallery interface coming soon...</p>
      </div>
    </div>
  );
};

export default Gallery;
