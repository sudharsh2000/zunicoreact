import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import UserHome from '../Components/UserHome'
import Navbarmobile from '../Components/Navbarmobile'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'

function UserHomePage() {
  const {userInfo,login}=useAuth()
  const navigate=useNavigate()
  useEffect(()=>{
    if(!userInfo?.userid){
      navigate('/signin')
    }
  },[userInfo?.userid,login])
  return (
    <div className='min-h-[100vh] h-auto bg-gradient-to-r from-amber-100 to-blue-300 '>
        <Navbar/>
        <UserHome/>
        <Navbarmobile/>

    </div>
  )
}

export default UserHomePage