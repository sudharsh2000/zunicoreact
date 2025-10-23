import React, { useState } from 'react'
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDown01Icon, ArrowDownNarrowWide, ChevronDown, DotIcon, DotSquare, Menu, MoreHorizontal, MoreVertical, Search, Settings, Settings2, Settings2Icon, SettingsIcon, ShoppingCart, User } from 'lucide-react'

import zunicologo from '../assets/zunicologo.png'
import { useNavigate } from 'react-router'
import { useAuth } from '../Redux/AuthProvider'
import axios from 'axios'
import { Logoutapi } from '../Redux/api'
function Navbar() {
    const navigate=useNavigate()
    const {accesstoken}=useAuth()
    const {userInfo}=useAuth()
    const {logout}=useAuth()
    const[searchval,setsearchval]=useState('')
    const [open,setopen]=useState(false)
    const [open2,setopen2]=useState(false)

const logoutfunction=async()=>{
    try{
        const res=axios.post(Logoutapi,{},{withCredentials:true})
        console.log(res.data)
        navigate('/signin')

    }
    catch(e){
console.error('logourt error')
    }
}

  return (
    <div className='sticky w-full top-0 z-50'>
    <div className='flex flex-row bg-gradient-to-r from-white to-pink-900 w-[100%] h-[3.5rem] justify-center items-center gap-2 md:h-[4.5rem] md:gap-8 '>
        <div className='flex gap-2 md:gap-14 justify-center items-center'>
            <img onClick={()=>navigate('/')} src={zunicologo} className='w-[25%] md:w-[12rem] h-[100%] p-0' />
            <div className='shadow-lg flex flex-row border-1 w-[70%] h-[2rem] rounded-md md:w-[40rem] md:h-[2.6rem] md:rounded-4xl border-gray-300 bg-[#88dbde2e]'>
            <input onKeyDown={(e)=>{
                if(e.key=='Enter'){
                    navigate(`/list?search=${searchval}`);
                }
            }

            } value={searchval} onChange={(e)=>setsearchval(e.target.value)} className='text-[12px] md:text-md w-[92%] h-[100%] md:text-lg border-none outline-0 pl-2 md:pl-5' placeholder='Search for Products Brands and More' />
            <Search  onClick={()=>navigate(`/list?search=${searchval}`)} className=' h-[90%] mr-1.5 text-gray-400 md:text-gray-600 '/>
            </div>
        </div>
        <ul className='hidden  md:flex flex-row justify-end items-center w-[30%] gap-[3rem]'>
        
           {!accesstoken?
           <li onClick={()=>navigate('/signin')} className='relative p-2 rounded-md border-gray-700 hover:shadow-lg hover:border-1  text-white font-extrabold text-md  cursor-pointer '>Log in</li>:
   
           <li onMouseEnter={()=>setopen(true)} onMouseLeave={()=>setopen(false)} className='relative p-2 rounded-md border-gray-700 hover:shadow-lg hover:border-1  text-white font-extrabold text-md  cursor-pointer '> 
                <div className='flex gap-1 '>

                
                <User/>
               {userInfo.username}
                
                <ChevronDown/>
                </div>
    {open&&

<div onMouseEnter={()=>setopen(true)}  className=' w-[10rem] absolute z-50 bg-white shadow-lg rounded-lg top-[2.6rem] right-[0rem]'>
        <ul className='text-black  font-medium flex flex-col py-4 justify-center items-center '>
            <li className='w-full text-center transform-3d transition-transform  hover:bg-gray-100 py-2.5 cursor-pointer' >Profile</li>
            <li className='w-full text-center  transform-3d transition-transform  hover:bg-gray-100 py-2.5 cursor-pointer'>Orders</li>
            <li className='w-full text-center  transform-3d transition-transform  hover:bg-gray-100 py-2.5 cursor-pointer'>Wishlist</li>

        </ul>
    </div>
}
        
                 </li>
                 }
           

{accesstoken&&
<li className='text-white font-extrabold text-md cursor-pointer flex gap-1 transition-transform hover:scale-105 '>Cart
               <ShoppingCart/> 
            </li>
}

            
            <li onMouseEnter={()=>setopen2(true)} onMouseLeave={()=>setopen2(false)} className='text-white relative p-1 hover:border-1 hover:shadow-lg border-gray-600 '>
                <MoreVertical/>
                 {open2&&

<div onMouseEnter={()=>setopen2(true)}  className=' w-[10rem] absolute z-50 bg-white shadow-lg rounded-lg top-[2rem] right-[0rem]'>
        <ul className='text-black flex flex-col p-4 justify-center items-center gap-3.5'>
            <li className='transform-3d transition-transform hover:scale-115 cursor-pointer' >More</li>
            <li className='transform-3d transition-transform hover:scale-115 cursor-pointer'>About</li>
            <li className='transform-3d transition-transform hover:scale-115 cursor-pointer'>Help</li>
         
<li onClick={logoutfunction} className='transform-3d transition-transform hover:scale-115 cursor-pointer'>Logout</li>
        

        </ul>
    </div>
}
            </li>
        </ul>
       

 
     

   
   
    


    </div>
    </div>
  )
}

export default Navbar