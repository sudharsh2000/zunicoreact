import React, { useState } from 'react'
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDown01Icon, ArrowDownNarrowWide, Bell, ChevronDown, DotIcon, DotSquare, Heart, ListOrdered, Menu, MoreHorizontal, MoreVertical, Search, Settings, Settings2, Settings2Icon, SettingsIcon, ShoppingCart, Store, StoreIcon, User, UserCircle } from 'lucide-react'

import wise from '../assets/wise.png'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useAuth } from '../Redux/AuthProvider'
import axios from 'axios'
import { Logoutapi, productapi } from '../Redux/api'
import api from '../Redux/Interceptor'
function Navbar() {
    const navigate=useNavigate()
    const {accesstoken}=useAuth()
    const {userInfo}=useAuth()
    const {logout}=useAuth()
    const[searchval,setsearchval]=useState('')
    const [open,setopen]=useState(false)
    const [open2,setopen2]=useState(false)
    const [listProducts,SetlistProducts]=useState([])
    const [cursor,setcursor]=useState(0)

    const cururl=useLocation()
const logoutfunction=async()=>{
    try{
        const res=axios.post(Logoutapi,{},{withCredentials:true})
        logout()
       if(userInfo.superuser){
        navigate('/admin/signin')
       }
       else{
 navigate('/signin')
       }
       

    }
    catch(e){
console.error('logourt error')
    }
}

const SearchProducts=async()=>{
    try{
        const res=await api.get(`${productapi}?search=${searchval}`)
        SetlistProducts(res.data)
        console.log(res.data)

    }
    catch(er){
        console.error(er)

    }

}

  return (
    <div className='hidden md:block sticky w-full top-0 z-30'>
    <div className='flex flex-row bg-gradient-to-r from-emerald-100 to-emerald-800 w-[100%] h-[3.5rem] justify-between px-[2%] items-center gap-2 md:h-[4.5rem] md:gap-8 '>
        <div className='flex gap-2 md:gap-14 justify-center items-center'>
            <img onClick={()=>navigate('/')} src={wise} className='w-[25%] md:w-[12rem] h-[100%] p-0' />
         {cururl.pathname==='/'&&   <div className='shadow-lg flex flex-row border-1 w-[70%] h-[2rem] rounded-md md:w-[40rem] md:h-[2.6rem] md:rounded-4xl border-gray-300 bg-[#88dbde2e]'>
            <input onKeyDown={(e)=>{
                if(e.key=='Enter'){
                    
                   searchval? navigate(`/list?search=${searchval}`):'';
                }
                if (e.key === "ArrowDown") {
      e.preventDefault();
      const newcursor=Math.min(cursor + 1, listProducts.length - 1);
      setcursor(newcursor);
      if(listProducts[newcursor].name){
        setsearchval(listProducts[newcursor].name)
      }
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newupcursor=Math.max(cursor - 1, 0)
      setcursor(newupcursor);
      if(listProducts[newupcursor].name){
        setsearchval(listProducts[newupcursor].name)
      }
    }
            }

            } value={searchval} onChange={(e)=>{
                setsearchval(e.target.value);
                SearchProducts();

                }} className='text-[12px] md:text-md w-[92%] h-[100%] md:text-lg border-none outline-0 pl-2 md:pl-5' placeholder='Search for Products Brands and More' />
            <Search  onClick={()=>searchval? navigate(`/list?search=${searchval}`):''} className={` h-[90%] mr-1.5 text-gray-400 md:text-gray-600 `}/>
            </div>}
            {listProducts&&searchval&&
                <div  className='absolute w-[35%] h-full overflow-x-auto left-[16.5%] top-[81%] rounded-lg shadow-lg bg-[#ffffff] max-h-[12rem] md:h-auto flex flex-col'>
                    {
                        listProducts.map((pro,i)=>{
                            return <p key={i} onClick={()=>navigate(`/list?search=${pro.name}`)} className={`items-center  text-center py-1 md:py-3 hover:bg-gray-200 cursor-pointer ${cursor===i?'bg-gray-200':''} `}>{pro.name}</p >
                        })
                    }

                </div>
            }
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

<div onMouseEnter={()=>setopen(true)}  className=' w-[11rem] absolute z-50 bg-white shadow-lg rounded-lg top-[2.6rem] right-[0rem]'>
        <ul className='text-black  font-medium flex flex-col py-4 justify-center items-center '>
            <li onClick={()=>{
                console.log(userInfo)
                userInfo.superuser?navigate('/admin/dashboard'):navigate('/profile')}} className='w-full text-center flex justify-center gap-2 md:gap-0 px-2  items-center transform-3d transition-transform  hover:bg-gray-100 py-2.5 cursor-pointer' >
                    <div className='w-[50%] flex justify-center'>
                        <UserCircle/> 
                        </div>
                        <div className='w-[50%] flex justify-start'>Profile</div>
                    </li>
            <li onClick={()=>navigate('/orders')} className='w-full text-center flex justify-center gap-2 md:gap-0 px-2 items-center  transform-3d transition-transform  hover:bg-gray-100 py-2.5 cursor-pointer'><div className='w-[50%] flex justify-center'>
                        <StoreIcon/> 
                        </div>
                        <div className='w-[50%] flex justify-start'>Orders</div></li>
            <li onClick={()=>navigate('/wishlist')} className='w-full text-center  transform-3d transition-transform flex justify-center gap-2 md:gap-0 px-2  items-center hover:bg-gray-100 py-2.5 cursor-pointer'>
                <div className='w-[50%] flex justify-center'>
                        <Heart/> 
                        </div>
                        <div className='w-[50%] flex justify-start'>Wishlist</div>
            </li>

        </ul>
    </div>
}
        
                 </li>
                 }
 {accesstoken&&          
<li onClick={()=>navigate('/cart')} className='text-white font-extrabold text-md cursor-pointer flex gap-1 transition-transform hover:scale-105 '>
               <Bell/> 
            </li>}
{accesstoken&&
<li onClick={()=>navigate('/cart')} className='text-white font-extrabold text-md cursor-pointer flex gap-1 transition-transform hover:scale-105 '>Cart
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