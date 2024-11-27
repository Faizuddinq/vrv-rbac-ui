import React from "react";
import {  Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Navigate } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";
import UserPage from "./components/User/UserPage";
import RolesPage from "./components/Roles/RolesPage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "./home/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      
    <Route index element={<Navigate to='/users' />}/>

    <Route path="/users" index element={<UserPage />} />
    
    <Route path="/roles" element={<RolesPage />} />
    
  

    </Route>
  )
)
const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition: Bounce  />
    </>
  );
};

export default App;
