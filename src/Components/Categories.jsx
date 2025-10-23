import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import axios from 'axios'
import { categoryapi } from '../Redux/api'
import api from '../Redux/Interceptor'
import { useNavigate } from 'react-router'
function Categories() {

    const[categories,SetCategories]=useState([])
  const navigate=useNavigate()
    useEffect(()=>{
        const loadapi=async()=>{
            try{
                    const res=await api.get(categoryapi,{withCredentials:true})
                    
                    SetCategories(res.data)
            }
            catch(er){
                console.log('Category Error',er)
            }
        }
        loadapi();
    },[])

  return (
    <div className=' rounded-sm gap-[.8rem] md:gap-[6rem] my-5 py-3.5 px-[1rem] md:px-[4rem]  flex flex-row justify-center items-center flex-wrap bg-white  '>
     
     {categories&&
   categories.map((categ)=>{
 return <div key={categ.id} onClick={()=>navigate(`/list?category=${categ.id}`)} className=' flex justify-center flex-col items-center gap-1.5'>
            <img src={categ.image} className='W-[2.5rem] h-[2.5rem] md:w-[5rem] md:h-[4rem] hover:scale-110 transform-3d transition-transform' />
            <h3 className='text-[10px] md:text-lg text-black border-1 border-red-600 py-0.5 px-2.5  rounded-2xl hover:scale-110 cursor-pointer transform-3d transition-transform'>{categ.name}</h3>
            
        </div>
   }) 
     }
        
      
        
       
    </div>
    
  )
}

export default Categories