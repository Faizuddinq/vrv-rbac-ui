import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { toggleSidebar } from '../redux/sidebarSlice';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { FaUserCircle, FaUserCog } from 'react-icons/fa';

const Sidebar = () => {

    // Arena data (menu items)
  const menuData = [
    
    { label: 'Users', icon: <FaUserCircle className="w-6 h-6" />, path: '/users' }, 
    { label: 'Roles', icon: <FaUserCog className="w-6 h-6" />, path: '/roles' },
  ];

    const dispatch = useDispatch(); // Redux dispatch function
  
    const isSidebarExpanded = useSelector((state) => state.sidebar.isExpanded); // Sidebar expanded state from Redux

    const handleSidebarToggle = () => {
        dispatch(toggleSidebar());
      };

  return (
    <div className={`${isSidebarExpanded ? 'w-1/5' : 'w-[5%] shadow pt-4'} h-full fixed z-50 bg-white overflow-y-auto space-y-2 pb-10`}>
        <div
            onClick={handleSidebarToggle}
            className={`flex cursor-pointer w-full flex-row items-center p-4 ${isSidebarExpanded ? 'pl-12 hover:bg-gray-100 pt-8' : 'justify-center border-gray-100'}`}
          >
            {isSidebarExpanded ? <RiMenuFoldLine className="w-7 h-7" /> : <RiMenuUnfoldLine className="w-7 h-7" />}
            {isSidebarExpanded ? <p className="pl-4 font-medium text-sm">Quick Menu</p> : ""}
          </div>

           {/*Closed Sidebar menu items */}
        {!isSidebarExpanded && (
          <ul className='pt-2'>
            {menuData.map((item, index) => {
              // Check if the menu item is active
              return (
                <li key={index}>
                      <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center w-full p-4 space-x-2 hover:bg-gray-300 transition duration-75 ${
          isSidebarExpanded ? "pl-8" : "justify-center"
        } ${
          isActive
            ? "bg-blue-900 text-white hover:bg-blue-800"
            : "bg-white text-black"
        }`
      }
    >
      {item.icon} {/* Render the icon */}
    </NavLink>
                </li>
              );
            })}
          </ul>
        )}
        {isSidebarExpanded &&  <nav>
        <h2 className="text-2xl text-center font-bold mb-4">VRV RBAC Dashboard</h2>
          <ul>
            <li className=" px-4 py-1">
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `flex rounded-lg pl-12 items-center p-4 transition duration-75 w-full ${
                    isActive ? 'bg-blue-900 text-white' : 'text-gray-900 hover:bg-gray-200'
                  }`
                }
              >
                Users
              </NavLink>
            </li>
            <li className="mb-2 px-4 py-1">
              <NavLink
                to="/roles"
                className={({ isActive }) =>
                  `flex rounded-lg pl-12 items-center p-4 transition duration-75 w-full ${
                    isActive ? 'bg-blue-900 text-white' : 'text-gray-900 hover:bg-gray-200'
                  }`
                }
              >
                Roles
              </NavLink>
            </li>
            
          </ul>
        </nav>}
      </div>
  )
}

export default Sidebar