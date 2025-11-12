import { Grid, Home, ShoppingCart, User } from 'lucide-react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../Redux/AuthProvider'

function Navbarmobile() {
  const navigate=useNavigate()
  const {userInfo}=useAuth()
  const location=useLocation()
  return (
    <div className=' border-red-300 rounded-2xl shadow-lg md:hidden fixed min-h-[2.5rem] w-full  z-50 bg-white p-2 bottom-0 border-t-1 '>
    <ul className=' flex  flex-row justify-around  items-center gap-[3.4rem]'>
        <li onClick={()=>navigate('/')} className={`flex flex-col  justify-center items-center gap-2 ${location.pathname==='/'?'text-yellow-700':'text-black'} `} ><Home/> Home</li>
        <li onClick={()=>{
        userInfo.superuser?navigate('/admin/dashboard'):navigate('/profile')
          } } className={`flex flex-col justify-center items-center gap-2 ${location.pathname==='/profile'?'text-yellow-700':'text-black'}`} ><User/> Account</li>
        <li onClick={()=>navigate('/cart')} className={`flex flex-col justify-center  items-center gap-2 ${location.pathname==='/cart'?'text-yellow-700':'text-black'}`}><ShoppingCart/> Cart</li>
        <li onClick={()=>navigate('/list?search=""')} className={`flex flex-col justify-center  items-center gap-2 ${location.pathname==='/list'?'text-yellow-700':'text-black'}`}><Grid/> Products </li>

        </ul>

    </div>
  )
}

export default Navbarmobile