import React, { useEffect } from 'react'
import Admindashboard from '../Components/Admindashboard'
import Navbar from '../Components/Navbar'
import Navbarmobile from '../Components/Navbarmobile'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'

function AdminHome() {
  const {userInfo}=useAuth()
  // const navigate=useNavigate()
  // useEffect(()=>{
  //   if (!userInfo || !userInfo.userid) {
  //   navigate('/admin/signin');
  // }
  // },[userInfo])
  return (
    <div className='min-h-[100vh] md:pb-[2rem] bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <Admindashboard/>
        <Navbarmobile/>
    </div>
  )
}

export default AdminHome