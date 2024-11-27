import React from 'react'
import { FaUserCircle, FaUserCog } from 'react-icons/fa';

import { NavLink, Outlet } from 'react-router-dom'

const MobileLayout = () => {
  return (
    <div className="flex items-center w-screen justify-center ">
     

      {/* Main Content Wrapper */}
      <div className="lg:hidden w-[100%]  mx-auto mt-20">
        <div className="p-4">
          <Outlet />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      {/* Guest Navigation */}
        {
           
          <div className="lg:hidden bottom-navbar fixed bottom-0 left-0 right-0 z-10 bg-white flex justify-around items-center border-t p-1">
        <NavLink
          to='/users'
          className={({ isActive }) => (isActive ? 'border-t-2 border-black flex pt-2 flex-col items-center' : 'text-gray-900 flex pt-2 flex-col items-center')}
          >
            <FaUserCircle className="w-8 h-8" />
            <p className='text-sm'>Users</p>
        </NavLink>
        
        <NavLink
          to='/roles'
          className={({ isActive }) => (isActive ? 'border-t-2 border-black flex pt-2 flex-col items-center' : 'text-gray-900 flex pt-2 flex-col items-center')}
        >
          <FaUserCog className="w-8 h-8" />
          <p className='text-sm'>Roles</p>
        </NavLink>
        {/* <HiDotsVertical onClick={toggleMenu} className="cursor-pointer w-8 h-8" /> */}
        </div>
      }

     
      
    
    
    </div>
  )
}

export default MobileLayout