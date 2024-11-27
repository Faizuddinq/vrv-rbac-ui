import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import MobileLayout from "./MobileLayout";
import Footer from "./Footer"
const DashboardLayout = () => {
  // Get the sidebar expansion state from Redux
  const isSidebarExpanded = useSelector((state) => state.sidebar.isExpanded);

  return (
    <div className="flex flex-col">

       {/* Desktop View - only visible on large screens (lg and above) */}
       <div className='hidden w-full lg:flex flex-1 lg:overflow-y-auto'>
        
             {/* Sidebar */}
            <div
              className={`transition-all hidden  lg:block duration-300 ${
                isSidebarExpanded ? "w-1/5" : "w-[5%]"
              }`}
            >
              <Sidebar />
            </div>
            
            {/* Main Content */}
            <div
              className={`transition-all duration-300       ${
                isSidebarExpanded ? "w-4/5" : " md:w-[95%]"
              } overflow-y-auto p-6 bg-gray-100`}
            >
              <Outlet />
            </div>
      </div>

       {/* Mobile View - only visible on small screens (less than lg) */}
       <div className='lg:hidden'>
        <MobileLayout /> {/* Mobile-specific component with optimized mobile layout */}
      </div>
      <Footer/>
    </div>
  );
};

export default DashboardLayout;
