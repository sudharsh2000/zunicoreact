import React from 'react'
import Navbar from '../Components/Navbar'
import Orders from '../Components/Orders'
import Navbarmobile from '../Components/Navbarmobile'
import Footer from '../Components/Footer'
function OrderPage() {
  return (
    <div className='min-h-[100vh] h-auto bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <Orders/>
      
        <Navbarmobile/>
        
    </div>
  )
}

export default OrderPage