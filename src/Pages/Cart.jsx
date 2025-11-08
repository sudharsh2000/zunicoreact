import React, { useEffect } from 'react'
import Navbarmobile from '../Components/Navbarmobile'
import Navbar from '../Components/Navbar'
import CartPage from '../Components/Cart'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'

function Cart() {
  const {userInfo}=useAuth()
  const navigate=useNavigate()
  useEffect(()=>{
    if(!userInfo.userid){
      navigate('/signin')
      
    }
    
  },[userInfo])
  return (
    <div className='bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <CartPage/>
        <Navbarmobile/>
    </div>
  )
}

export default Cart