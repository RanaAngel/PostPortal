// Sidebar.js
import React from 'react';

const AdminSidebar = ({ setActiveComponent, handleLogout }) => {
  return (
    <div className="bg-gray-800 w-64 flex flex-col items-center pt-8 text-white">
      <div className="flex items-center justify-center">
        <img src="/95ba66434f85ea111bc97dcb33d85d72-1@2x.png" alt="Logo" className="w-16 h-16" />
        <h1 className="text-2xl ml-4 font-bold">PostPortal</h1>
      </div>
      <div className="mt-8 w-full">
        <ul className="space-y-2">
          <li>
            <button onClick={() => setActiveComponent('dashboard')} className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1" />
              </svg>
              <span className="ml-4">Dashboard</span>
            </button>
          </li>

          <li>
            <button onClick={() => setActiveComponent('users')} className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1" />
              </svg>
              <span className="ml-4">Users</span>
            </button>
          </li>

          <li>
            <button onClick={() => setActiveComponent('contacts')} className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1" />
              </svg>
              <span className="ml-4">Contacts</span>
            </button>
          </li>
          <li>
            <button onClick={() => setActiveComponent('userpost')} className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1" />
              </svg>
              <span className="ml-4">Posts</span>
            </button>
          </li>

          <li>
            <button onClick={handleLogout} className="flex items-center px-4 py-2 rounded-md hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-3a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 011 1h2a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3a1 1 0 01-1-1h-2a1 1 0 01-1-1" />
              </svg>
              <span className="ml-4">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSidebar;
