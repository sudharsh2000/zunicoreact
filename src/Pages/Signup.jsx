import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Navbarmobile from '../Components/Navbarmobile'
import Signup from '../Components/Signup'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'

function SignupPage() {

  const navigate=useNavigate()
  const {userInfo}=useAuth();
  useEffect(()=>{
    if(userInfo){
    if(userInfo.userid){
      navigate('/')
    }
  }
  },[userInfo])
  return (
    <div className=''>
        <Navbar/>
        <div className='flex h-[100vh] justify-center '>
         <Signup/>
        </div>
       
   
    </div>
  )
}

export default SignupPage