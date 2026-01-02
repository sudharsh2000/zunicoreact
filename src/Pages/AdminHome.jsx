import React, { useContext, useEffect } from 'react'
import Admindashboard from '../Components/Admindashboard'
import Navbar from '../Components/Navbar'
import Navbarmobile from '../Components/Navbarmobile'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'
import { Flashcontext } from '../App'

function AdminHome() {
  const {userInfo}=useAuth()
  const navigate=useNavigate()
  const {flash,setFlash}=useContext(Flashcontext)
  useEffect(()=>{
    console.log(userInfo?.userid)
    if (!flash&&!userInfo?.userid) {
    navigate('/admin/signin');
  }
  },[userInfo?.userid])
  return (
    <div className='min-h-[100vh] md:pb-[1rem] bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <Admindashboard/>
        <Navbarmobile/>
    </div>
  )
}

export default AdminHome