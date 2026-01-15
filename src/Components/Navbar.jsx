import React, { useEffect, useRef, useState } from 'react'
import { ArrowBigDown, ArrowDown, ArrowDown01, ArrowDown01Icon, ArrowDownNarrowWide, Bell, ChevronDown, DotIcon, DotSquare, Heart, ListOrdered, Menu, MoreHorizontal, MoreVertical, Search, Settings, Settings2, Settings2Icon, SettingsIcon, ShoppingCart, Store, StoreIcon, User, UserCircle } from 'lucide-react'

import wise from '../assets/wise.png'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { useAuth } from '../Redux/AuthProvider'
import axios from 'axios'
import { Logoutapi, notificationApi, productapi } from '../Redux/api'
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
    const listref=useRef(null)
    const cururl=useLocation()
    const [username,setusername]=useState('')
    const [notificationOn,setnotificationOn]=useState(false)
    const [notificationdata,setnotificationdata]=useState([])
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
        SetlistProducts(res.data.results)
        console.log(res.data)

    }
    catch(er){
        console.error(er)

    }

}
useEffect(()=>{
   setusername(userInfo?.username)
   const loadnotifications=async()=>{   
   try{
    const res=await api.get(`${notificationApi}?username=${userInfo?.username}&is_read=false`)
    console.log(res.data)
    setnotificationdata(res.data)
   

   }
   catch(e){
    console.error(e)
   }
}
loadnotifications()

},[userInfo?.username])

  return (
    <nav className='hidden md:block sticky w-auto py-2  mx-3 top-0 z-50'>
    <div className='flex flex-row bg-gradient-to-r rounded-xl from-emerald-200 to-emerald-700 w-[100%] h-[3.5rem]  px-[2%] items-center gap-2 md:h-[4.5rem] md:gap-8 '>
        <div className='flex gap-2 md:gap-14  items-center w-[60%]'>
            <img onClick={()=>navigate('/')} src={wise} className='max-w-[25%] w-auto md:max-w-[12rem] h-[100%] p-0' />
         {cururl.pathname==='/'&&   <div className='shadow-lg flex flex-row border-1 w-[70%] h-[2rem] rounded-md md:w-[70%] md:h-[2.6rem] md:rounded-4xl border-gray-300 bg-[#88dbde2e]'>
            <input onBlur={()=>setsearchval('')} onKeyDown={(e)=>{
                setcursor(-1);
                if(e.key=='Enter'){
                    
                   searchval? navigate(`/list?search=${searchval}`):'';
                }
                if (e.key === "ArrowDown") {
      e.preventDefault();
      const newcursor=Math.min(cursor + 1, listProducts.length - 1);
      setcursor(newcursor);
      if(listProducts[newcursor].name){
        setsearchval(listProducts[newcursor].name)
        listref.current?.scrollBy({top:30, behavior:'smooth'});
      }
    
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newupcursor=Math.max(cursor - 1, 0)
      setcursor(newupcursor);
      if(listProducts[newupcursor].name){
        setsearchval(listProducts[newupcursor].name)
         listref.current?.scrollBy({top:-30, behavior:'smooth'});
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
                <div ref={listref}   className='absolute w-[35%] h-full overflow-x-auto  left-[16.5%] top-[81%] rounded-lg shadow-lg bg-emerald-50 max-h-[22rem] md:h-auto flex flex-col'>
                    {
                        listProducts.map((pro,i)=>{
                            return <p key={i} onMouseDown={()=>navigate(`/list?search=${pro.name}`)} className={`items-center border-b-1 border-gray-300  text-center py-1 md:py-3 hover:bg-gray-200 cursor-pointer ${cursor===i?'bg-gray-200':''} `}>{pro.name}</p >
                        })
                    }

                </div>
            }
        </div>
        <ul className='hidden  md:flex flex-row justify-end items-center w-[40%] gap-[7%]'>
        
           {!accesstoken?
           <li onClick={()=>navigate('/signin')} className='relative p-2 rounded-md border-gray-700 hover:shadow-lg hover:border-1  text-white font-extrabold text-md  cursor-pointer '>Log in</li>:
   
           cururl.pathname==='/'&&<li onMouseEnter={()=>setopen(true)} onMouseLeave={()=>setopen(false)} className='relative p-2 rounded-md border-gray-700 hover:shadow-lg hover:border-1  text-white font-medium text-md  cursor-pointer '> 
                <div className='flex gap-1 '>

                
                <User/>
               Me
                
                <ChevronDown/>
                </div>
    
        
                 </li>
                 }
 {accesstoken&& cururl.pathname==='/'&&         
<li onClick={()=>navigate('/profile?tab=notification')} className='text-white font-medium text-md cursor-pointer flex gap-1 transition-transform hover:scale-105 '>
               <Bell/> 
            </li>}
        
{accesstoken&&cururl.pathname==='/'&&
<li onClick={()=>navigate('/cart')} className='text-white font-medium text-md cursor-pointer flex gap-1 transition-transform hover:scale-105 '>Cart
               <ShoppingCart/> 
            </li>

            
}

            
           {cururl.pathname==='/'&& <li onMouseEnter={()=>setopen2(true)} onMouseLeave={()=>setopen2(false)} className='text-white relative p-1 hover:border-1 hover:shadow-lg border-gray-600 '>
                <MoreVertical/>
                 {open2&&

<div onMouseEnter={()=>setopen2(true)}  className=' w-[10rem] absolute z-50 bg-white shadow-lg rounded-lg top-[2rem] right-[0rem]'>
        <ul className='text-black flex flex-col p-4 justify-center items-center gap-3.5'>
            {/* <li className='transform-3d transition-transform hover:scale-115 cursor-pointer' >More</li> */}
            <li className='transform-3d transition-transform hover:scale-115 cursor-pointer'>About</li>
            <li className='transform-3d transition-transform hover:scale-115 cursor-pointer'>Help</li>
         
{accesstoken&&cururl.pathname==='/'&&<li onClick={logoutfunction} className='transform-3d transition-transform hover:scale-115 cursor-pointer'>Logout</li>}
        

        </ul>
    </div>
}
            </li>}
             {open&&
<div onMouseLeave={()=>setopen(false)} onMouseEnter={()=>setopen(true)} className='w-[18rem] absolute top[13%] right-[6%] pt-[5%]'>
<div   className=' w-[16rem] absolute transition-opacity duration-300 z-50 bg-white shadow-lg rounded-xl top-[77%]  right-[8%]'>
        <ul className='text-black  font-medium flex flex-col py-4 justify-center items-center '>
            <li onClick={()=>{
                console.log(userInfo)
                userInfo.superuser?navigate('/admin/dashboard'):navigate('/profile')}} className='w-full text-center flex justify-center gap-2 md:gap-0 px-2  items-center transform-3d transition-transform  hover:bg-gray-100 py-2.5 cursor-pointer' >
                    <div className='w-[40%] flex justify-start px-1 md:px-3'>
                        <UserCircle/> 
                        </div>
                        <div className='w-[60%] flex justify-start'>Profile</div>
                    </li>
            <li onClick={()=>navigate('/orders')} className='w-full text-center flex justify-center gap-2 md:gap-0 px-2 items-center  transform-3d transition-transform  hover:bg-gray-100 py-2.5 cursor-pointer'>
                <div className='w-[40%] flex justify-start px-1 md:px-3'>
                        <StoreIcon/> 
                        </div>
                        <div className='w-[60%] flex justify-start'>Orders</div></li>
            <li onClick={()=>navigate('/wishlist')} className='w-full text-center  transform-3d transition-transform flex justify-center gap-2 md:gap-0 px-2  items-center hover:bg-gray-100 py-2.5 cursor-pointer'>
                <div className='w-[40%] flex justify-start px-1 md:px-3'>
                        <Heart/> 
                        </div>
                        <div className='w-[60%] flex justify-start'>Wishlist</div>
            </li>

        </ul>
    </div>
    </div>
}
        </ul>
       
       

 
     

   
   
    


    </div>
    </nav>
  )
}

export default Navbar