import { Grid, Home, ShoppingCart, User } from 'lucide-react'
import React from 'react'

function Navbarmobile() {
  return (
    <div className='md:hidden fixed min-h-[2.5rem] w-full z-50 bg-white p-2 bottom-0 border-t-1 border-gray-400'>
    <ul className=' flex  flex-row justify-between  items-center gap-[1rem]'>
        <li className='flex flex-col  justify-center items-center gap-2' ><Home/> Home</li>
        <li className='flex flex-col justify-center items-center gap-2' ><User/> Account</li>
        <li className='flex flex-col justify-center  items-center gap-2'><ShoppingCart/> Cart</li>
        <li className='flex flex-col justify-center  items-center gap-2'><Grid/> Categories </li>

        </ul>

    </div>
  )
}

export default Navbarmobile