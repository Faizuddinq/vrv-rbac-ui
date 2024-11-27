import React from 'react'
import Navbar from '../components/Navbar'
import DashboardLayout from '../components/DashboardLayout'
const Home = () => {
  return (
    <div className=' overflow-y-hidden '>
        <Navbar />
        <DashboardLayout />
    </div>
  )
}

export default Home