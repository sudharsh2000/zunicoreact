import { Grid, Home, ShoppingCart, Store, User } from 'lucide-react'
import React, { useContext } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { useAuth } from '../Redux/AuthProvider'
import { Flashcontext } from '../App'

function Navbarmobile() {
  const navigate=useNavigate()
  const {userInfo}=useAuth()
  const location=useLocation()
 
  return (
    <div className=' border-gray-100 rounded-t-xl shadow-lg md:hidden py-3 px-4 fixed min-h-[2.2rem] w-full self-center  z-30 bg-white  bottom-0 border-t-1 '>
    <ul className=' flex  flex-row justify-between  items-center '>
        <li onClick={()=>navigate('/')} className={`text-xs flex flex-col  justify-center items-center gap-2 ${location.pathname==='/'?'font-extrabold':''}`} ><Home className={`h-[2rem] w-[4rem] py-1 px-2 rounded-2xl ${location.pathname==='/'?'bg-emerald-100':'bg-white'}`}/> Home</li>
        <li onClick={()=>{
        userInfo?.superuser?navigate('/admin/dashboard'):navigate('/profile')
          } } className={`text-xs flex flex-col justify-center items-center gap-2 ${location.pathname==='/profile'?'font-extrabold':''}`} ><User className={`h-[2rem] w-[4rem] py-1 px-2 rounded-2xl ${location.pathname==='/profile'?'bg-emerald-100':'bg-white'}`} /> Account</li>
        <li onClick={()=>navigate('/cart')} className={`text-xs flex flex-col justify-center  items-center gap-2 ${location.pathname==='/cart'?'font-extrabold':''}`}><ShoppingCart className={`h-[2rem] w-[4rem] py-1 px-2 rounded-2xl ${location.pathname==='/cart'?'bg-emerald-100':'bg-white'}`}/> Cart</li>
          <li onClick={()=>navigate('/orders')} className={`text-xs flex flex-col justify-center  items-center gap-2 ${location.pathname==='/orders'?'font-extrabold':''}`}><Store className={`h-[2rem] w-[4rem] py-1 px-2 rounded-2xl ${location.pathname==='/orders'?'bg-emerald-100':'bg-white'}`}/> Orders</li>
        <li onClick={()=>navigate('/list?search=""')} className={`text-xs flex flex-col justify-center  items-center gap-2 ${location.pathname==='/list'?'font-extrabold':''}`}><Grid className={`h-[2rem] w-[4rem] py-1 px-2 rounded-2xl ${location.pathname==='/list'?'bg-emerald-100':'bg-white'}`}/> Products </li>

        </ul>

    </div>
  )
}

export default Navbarmobile