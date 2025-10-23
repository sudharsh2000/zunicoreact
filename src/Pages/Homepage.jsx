import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import HomeBody from '../Components/HomeBody'
import Footer from '../Components/Footer'
import Navbarmobile from '../Components/Navbarmobile'
import { refreshapi } from '../Redux/api'
import { useAuth } from '../Redux/AuthProvider'
import api from '../Redux/Interceptor'

function Homepage() {
  // const {accesstoken,login}=useAuth()
  
  return (
    <div className='bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <HomeBody/>
        <Footer/>
        <Navbarmobile/>
    </div>
  )
}

export default Homepage