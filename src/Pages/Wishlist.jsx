import React from 'react'
import WishList from '../Components/Wishlist'
import Navbar from '../Components/Navbar'
import Navbarmobile from '../Components/Navbarmobile'
import Mobileheader from '../Components/Mobileheader'
function WishlistPage() {
  return (
    <div className='min-h-[100vh] h-auto bg-gradient-to-r from-amber-100 to-blue-300 '>
        <Navbar/>
        <Mobileheader value={'Wihlists'}/>
        <WishList/>
        <Navbarmobile/>
    </div>
  )
}

export default WishlistPage