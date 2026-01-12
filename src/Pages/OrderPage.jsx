import React from 'react'
import Navbar from '../Components/Navbar'
import Orders from '../Components/Orders'
import Navbarmobile from '../Components/Navbarmobile'
import Footer from '../Components/Footer'
import Mobileheader from '../Components/Mobileheader'
function OrderPage() {
  return (
    <div className='min-h-[100vh] h-auto bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <Mobileheader value={'Orders'} />
        <Orders/>
      
        <Navbarmobile/>
        
    </div>
  )
}

export default OrderPage