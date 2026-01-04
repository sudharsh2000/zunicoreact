import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import axios from 'axios'
import { categoryapi } from '../Redux/api'
import api from '../Redux/Interceptor'
import { useNavigate } from 'react-router'
import LoadingScreen from './LoadingPage'
function Categories() {

    const[categories,SetCategories]=useState([])
  const navigate=useNavigate()
  const [loading,setLoading]=useState()
    useEffect(()=>{
        const loadapi=async()=>{
            try{
              setLoading(true)
                    const res=await api.get(categoryapi,{withCredentials:true})
                    
                    SetCategories(res.data)
                    setLoading(false)
            }
            catch(er){
                console.log('Category Error',er)
                setLoading(false)
            }
        }
        loadapi();
    },[])

  return (
    <div className=' bg-white rounded-md md:px-[1rem]'>
      <div className=' w-full rounded-sm gap-[1.5rem] md:gap-[4rem] my-5 py-3.5 pl-[1rem]    flex flex-row md:justify-start items-center overflow-x-auto '>
   {loading?<LoadingScreen/>:
     categories&&
   categories.map((categ)=>{
 return <div key={categ.id} onClick={()=>navigate(`/list?category=${categ.id}`)} className='   flex justify-center flex-col items-center gap-1.5'>
            <img src={categ.image} className='W-[3.5rem] h-[3.5rem] md:w-[6rem] md:h-[5rem] hover:scale-110 transform-3d transition-transform' />
            <h3 className='text-[11px] text-center md:text-[14px] text-emerald-900 font-semibold  py-0.5 px-2.5  rounded-2xl hover:scale-110 cursor-pointer transform-3d transition-transform'>{categ.name}</h3>
       </div>
  })
  } 
    </div>
    </div>
    
  )
}

export default Categories