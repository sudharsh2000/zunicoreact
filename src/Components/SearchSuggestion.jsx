
import { ArrowLeftIcon, ArrowUpRightFromSquareIcon, Search, SearchIcon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import api from '../Redux/Interceptor';
import { productapi } from '../Redux/api';
function SearchSuggestion() {
 const [searchval,setsearchval]=useState('')
  const [listProducts,SetlistProducts]=useState([])
  const [isSearch,setSearch]=useState(false)
    const inputRef = useRef(null);
  const navigate=useNavigate()
  const SearchProducts=async()=>{
    try{
        const res=await api.get(`${productapi}?search=${searchval}`)
        SetlistProducts(res.data.results)
        console.log(res.data.results)

    }
    catch(er){
        console.error(er)

    }
  }


  useEffect(() => {
    inputRef.current.focus();
    const loadproducts=async()=>{
       try{
        const res=await api.get(`${productapi}?search=${searchval}`)
        SetlistProducts(res.data.results)
        console.log(res.data.results)

    }
    catch(er){
        console.error(er)

    }
    }
    loadproducts();
  }, []);
  return (
    <div className='flex justify-center h-[100vh] gap-[1rem] flex-col items-center bg-gray-200   md:hidden'>
<div className='flex justify-center  w-full h-[8%] gap-4 items-center  bg-gradient-to-r from-emerald-50 to-emerald-600'>
   <button onClick={()=>navigate(-1)}><ArrowLeftIcon/> </button>
<div onClick={()=>setSearch(true)} className='shadow-lg flex flex-row border-2 w-[86%] h-[2.8rem] rounded-md md:w-[40rem] md:h-[2.5rem] md:rounded-4xl border-gray-300 bg-[#88dbde2e]'>
            
            <input value={searchval} ref={inputRef} onChange={(e)=>{
                setsearchval(e.target.value);
                SearchProducts();

                }}  className='text-[12px] focus:tracking-normal md:text-md w-[92%] h-[100%] md:text-lg border-none outline-0 pl-2 md:pl-5' placeholder='Search for Products Brands and More' />
            <Search  onClick={()=>navigate(`/list?search=${searchval}`)} className=' h-[90%] mr-1.5 text-gray-400 md:text-gray-600 '/>
            </div>
           </div> 
            
              <div className='flex w-full  bg-gradient-to-r from-amber-100 to-blue-300 h-[90%] '>
                {listProducts&&  <div  className=' w-[100%] gap-[.5rem]   h-[100%]  overflow-x-auto  z-50 rounded-lg shadow-lg bg-[#ffffff]  md:h-auto flex flex-col'>
                    {
                      listProducts.map((pro,i)=>{
                            return <div key={pro.id} onClick={()=>{SetlistProducts([]);navigate(`/list?search=${pro.name}`)}} className='flex justify-between py-2 px-5 border-b-1 border-gray-300'>
                                <SearchIcon className='h-[1rem]'/>
                        <p key={i}  className={`truncate w-[9rem]  text-xs  py-1 p md:py-3  hover:bg-gray-200 cursor-pointer  `}>{pro.name}</p >
                        <ArrowUpRightFromSquareIcon className='h-[1rem]'/>
                            </div> 
                        })
                    }

                </div>}
                </div>
                
            

    </div>
  )
}

export default SearchSuggestion