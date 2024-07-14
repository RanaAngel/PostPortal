// Sidebar.js
import React from 'react';

import routes from '../routes/sidebar'
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import XMarkIcon  from '@heroicons/react/24/outline/XMarkIcon'
import { useDispatch } from 'react-redux';

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
    // <div className="drawer-side  z-30  ">
    //         <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
    //         <ul className="menu  pt-2 w-80 bg-base-100 min-h-full   text-base-content">
    //         <button className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden">
    //         <XMarkIcon className="h-5 inline-block w-5"/>
    //         </button>

    //             <li className="mb-2 font-semibold text-xl">
                    
    //                 <Link to={'/dashboard'}><img className="mask mask-squircle w-10" src="/logo192.png" alt="DashWind Logo"/>PostPortal</Link> </li>
    //             {/* {
    //                 routes.map((route, k) => {
    //                     return(
    //                         <li className="" key={k}>
    //                             {
    //                                 route.submenu ? 
    //                                     <SidebarSubmenu {...route}/> : 
    //                                 (<NavLink
    //                                     end
    //                                     to={route.path}
    //                                     className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
    //                                        {route.icon} {route.name}
    //                                         {
    //                                             location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
    //                                             aria-hidden="true"></span>) : null
    //                                         }
    //                                 </NavLink>)
    //                             }
                                
    //                         </li>
    //                     )
    //                 })
    //             } */}

    //         </ul>
    //     </div>
  );
};

export default AdminSidebar;
