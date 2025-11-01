import React from 'react'
import Navbarmobile from '../Components/Navbarmobile'
import Navbar from '../Components/Navbar'
import CartPage from '../Components/Cart'

function Cart() {
  return (
    <div>
        <Navbar/>
        <CartPage/>
        <Navbarmobile/>
    </div>
  )
}

export default Cart