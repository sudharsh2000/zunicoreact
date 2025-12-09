import React from 'react'
import Productdetail from '../Components/Productdetail'
import Navbar from '../Components/Navbar'
import Navbarmobile from '../Components/Navbarmobile'

function ProductDetail() {
  return (
    <div className='h-auto bg-gradient-to-r from-amber-100 to-blue-300 pb-[6rem] md:pb-0'>
        <Navbar/>
        <Productdetail/>
        <Navbarmobile/>
    </div>
  )
}

export default ProductDetail