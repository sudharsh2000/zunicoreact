import React from 'react'
import Navbarmobile from '../Components/Navbarmobile'
import Navbar from '../Components/Navbar'
import CartPage from '../Components/Cart'

function Cart() {
  return (
    <div className='bg-gradient-to-r from-amber-100 to-blue-300'>
        <Navbar/>
        <CartPage/>
        <Navbarmobile/>
    </div>
  )
}

export default Cart