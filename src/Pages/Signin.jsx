import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import Signinpage from '../Components/Signin'
import SigninPage from '../Components/Signin'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'
import Navbarmobile from '../Components/Navbarmobile'
function Signin() {
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
    <div>
      <Navbar/>
<div className='flex h-[100vh] justify-center p-[.5rem] md:pt-[8rem]'>
<SigninPage/>
</div>
<Navbarmobile/>
    </div>
  )
}

export default Signin