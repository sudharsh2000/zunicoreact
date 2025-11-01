import { Grid, Home, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router'

function Navbarmobile() {
  const navigate=useNavigate()
  return (
    <div className='mx-2.5 border-red-300 rounded-2xl shadow-lg md:hidden fixed min-h-[2.5rem] w-fit  z-50 bg-white p-2 bottom-0 border-t-1 '>
    <ul className=' flex  flex-row justify-between  items-center gap-[3.4rem]'>
        <li onClick={()=>navigate('/')} className='flex flex-col  justify-center items-center gap-2' ><Home/> Home</li>
        <li className='flex flex-col justify-center items-center gap-2' ><User/> Account</li>
        <li onClick={()=>navigate('/cart')} className='flex flex-col justify-center  items-center gap-2'><ShoppingCart/> Cart</li>
        <li className='flex flex-col justify-center  items-center gap-2'><Grid/> Categories </li>

        </ul>

    </div>
  )
}

export default Navbarmobile