import React from 'react'
import Navbar from '../Components/Navbar'
import UserHome from '../Components/UserHome'
import Navbarmobile from '../Components/Navbarmobile'

function UserHomePage() {
  return (
    <div className='bg-gradient-to-r from-amber-100 to-blue-300 h-[100vh]'>
        <Navbar/>
        <UserHome/>
        <Navbarmobile/>

    </div>
  )
}

export default UserHomePage