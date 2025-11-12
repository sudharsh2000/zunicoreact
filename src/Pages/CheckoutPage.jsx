import React from 'react'
import Navbar from '../Components/Navbar'
import Navbarmobile from '../Components/Navbarmobile'
import Checkout from '../Components/Checkout'
function CheckoutPage() {
  return (
    <div className='min-h-[100vh] h-auto bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <Checkout/>
        <Navbarmobile/>
    </div>
  )
}

export default CheckoutPage