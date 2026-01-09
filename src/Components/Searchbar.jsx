import { ArrowLeftIcon, Search } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import api from '../Redux/Interceptor';
import { productapi } from '../Redux/api';

function Searchbar() {
  const [searchval,setsearchval]=useState('')
  const [listProducts,SetlistProducts]=useState()
  const [isSearch,setSearch]=useState(false)
  const navigate=useNavigate()
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
    <div className='flex justify-center pl-[.5rem] items-center pt-[1rem] md:hidden'>
<div className='flex gap-4 w-full'>
   {isSearch&& <button onClick={()=>setSearch(false)}><ArrowLeftIcon/> </button>}
<div onClick={()=>navigate('/searchsuggest')} className='shadow-lg flex flex-row border-2 w-[98%] h-[2.8rem] rounded-md md:w-[40rem] md:h-[2.5rem] md:rounded-4xl border-gray-300 bg-[#88dbde2e]'>
            
            <input value={searchval} onChange={(e)=>{
                setsearchval(e.target.value);
                SearchProducts();

                }} className='text-[12px] md:text-md w-[92%] h-[100%] md:text-lg border-none outline-0 pl-2 md:pl-5' placeholder='Search for Products Brands and More' />
            <Search  onClick={()=>navigate(`/list?search=${searchval}`)} className=' h-[90%] mr-1.5 text-gray-400 md:text-gray-600 '/>
            </div>
           </div> 
            
              
            

    </div>
  )
}

export default Searchbar