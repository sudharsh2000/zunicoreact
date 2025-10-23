import React from 'react'
import Navbar from '../Components/Navbar'
import Productlist from '../Components/Productlist'
import Navbarmobile from '../Components/Navbarmobile'

function ProductList() {
  return (
    <div className='bg-gray-300 min-h-[100vh]'>
            <Navbar/>
            <Productlist/>
            <Navbarmobile/>


    </div>
  )
}

export default ProductList