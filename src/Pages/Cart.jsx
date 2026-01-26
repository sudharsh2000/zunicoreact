import React, { useEffect } from 'react'
import Navbarmobile from '../Components/Navbarmobile'
import Navbar from '../Components/Navbar'
import CartPage from '../Components/Cart'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { Flashcontext } from '../App'
import LoadingScreen from '../Components/LoadingPage'
import Mobileheader from '../Components/Mobileheader'

function Cart() {
  const {userInfo,login}=useAuth()
  const navigate=useNavigate()
  const {flash}=useContext(Flashcontext)
  useEffect(()=>{
    console.log(userInfo)
  //   if(login){
  //   if(!userInfo?.userid){
  //     navigate('/signin')
      

      
  //   }
  // }
    
  },[userInfo?.userid,login])
  return (
    <div className='bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <Mobileheader value={'Cart'} />
        <CartPage/>
        <Navbarmobile/>
    </div>
  )
}

export default Cart