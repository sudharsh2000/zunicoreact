import React from 'react'
import Adminsignin from '../Components/Adminsignin'
import Navbar from '../Components/Navbar'
import Navbarmobile from '../Components/Navbarmobile'

function AdminLogin() {
  return (
        <div>
<Navbar/>
<div className='flex h-[100vh] justify-center p-[.5rem] md:pt-[8rem]'>
        <Adminsignin/>
        <Navbarmobile/>
    </div>
    </div>
  )
}

export default AdminLogin