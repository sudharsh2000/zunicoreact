import React from 'react'
import Navbar from '../Components/Navbar'
import UserHome from '../Components/UserHome'
import Navbarmobile from '../Components/Navbarmobile'

function UserHomePage() {
  return (
    <div className='min-h-[100vh] h-auto bg-gradient-to-r from-amber-100 to-blue-300 '>
        <Navbar/>
        <UserHome/>
        <Navbarmobile/>

    </div>
  )
}

export default UserHomePage