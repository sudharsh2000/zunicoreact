import React from 'react'
import Navbar from '../Components/Navbar'
import Addaddress from '../Components/Addaddress'
import Navbarmobile from '../Components/Navbarmobile'
function AddressPage() {
  return (
    <div >
        <Navbar/>
        <div className='flex justify-center'>
 <Addaddress/>
        </div>
       
        <Navbarmobile/>

    </div>
  )
}

export default AddressPage