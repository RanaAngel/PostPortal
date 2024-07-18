import React from 'react';

const ADashboard = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Total customers</h2>
          <p className="text-2xl mt-2">2,420</p>
          <p className="text-sm mt-1">200 more than last month</p>
        </div>
        <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Active Now</h2>
          <p className="text-2xl mt-2">300</p>
        </div>
        <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Free Accounts</h2>
          <p className="text-2xl mt-2">420</p>
          <p className="text-sm mt-1">24 more than last month</p>
        </div>
        <div className="p-4 bg-gray-800 text-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Premium Accounts</h2>
          <p className="text-2xl mt-2">2000</p>
          <p className="text-sm mt-1">100 more than last month</p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-gray-800">Customer Analytics</h2>
        <div className="bg-white p-4 rounded-md shadow-md mt-4">
          <div className="flex justify-between">
            <div>
              <button className="px-4 py-2 text-sm rounded-md text-blue-500">12 months</button>
              <button className="px-4 py-2 text-sm rounded-md text-gray-500">30 days</button>
              <button className="px-4 py-2 text-sm rounded-md text-gray-500">7 days</button>
              <button className="px-4 py-2 text-sm rounded-md text-gray-500">24 hours</button>
            </div>
            <div>
              <span className="text-blue-500 mr-2">This period</span>
              <span className="text-gray-500">Previous period</span>
            </div>
          </div>
          <div className="mt-4">
            {/* Placeholder for the analytics chart */}
            <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-500">
              Customer Analytics Chart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADashboard;
