import React, { useEffect, useRef, useState } from 'react'
import demo from '../assets/demo.jpg'
import { ArrowBigLeft, IndianRupee, IndianRupeeIcon } from 'lucide-react'
import api from '../Redux/Interceptor'
import { productapi } from '../Redux/api'
import { useNavigate } from 'react-router'
function Rowitems({ali_type,Title}) {
    const ref=useRef(null)
    const[products,setProducts]=useState([])
    const navigate=useNavigate()
    useEffect(()=>{
      const LoadProducts=async()=>{
        try{
          const res=await api.get(productapi,{withCredentials:true})
          console.log(res.data)
          setProducts(res.data)

        }
        catch(er){
          console.log('Error in product fetching')
        }

      }
      LoadProducts();

    },[])
    const scrollfn=(dir)=>{
        
        const curwidth=ref.current
        if(dir==='right'){
        curwidth.scrollBy({left:300,behavior:'smooth'})
        }
        if(dir==='left'){
           curwidth.scrollBy({left:-300,behavior:'smooth'}) 
        }
    }
  return (
    <div>
        <div className='bg-white  my-4'>
        <h1 className='text-lg md:text-2xl pt-2 md:pt-8 ml-4 md:ml-8 my-2 md:my-8 font-bold overflow-auto'>{Title}</h1>
     {ali_type==='row'&&
     <button onClick={()=>scrollfn('left')}  className=' hidden md:block absolute    bg-[#baa5a56a]  left-[1rem] md:left-[3.5rem] w-[1.6rem] h-[2rem] md:w-[2rem] md:h-[6rem] rounded-sm z-index:10 hover:bg-red-200 hover:scale-125 duration-300 transform-3d  transition-transform  shadow-2xl'>&#9664;</button>
       }
        {
          ali_type==='row'&&
          <button onClick={()=>scrollfn('right')}  className='hidden md:block  bg-[#baa5a56a] absolute right-[1rem] md:right-[3.5rem]  w-[1.6rem] h-[2rem] md:w-[2rem] md:h-[6rem] rounded-sm z-index:10 hover:bg-red-200 hover:scale-125 duration-300 transform-3d  transition-transform  shadow-2xl'>&#9654;</button>
}
        <div ref={ref} className={`flex ml-[.1rem] mr-[.1rem]  md:mr-[3rem] md:ml-[4rem] p-2 md:p-4 gap-[.5rem] flex-wrap ${ali_type==='row'?'overflow-x-auto md:gap-[6.5rem] md:flex-nowrap ':'md:flex-wrap md:gap-[4.5rem]'}  flex-1 whitespace-nowrap no-scrollbar`}>
    
    
        {products &&
        products.map((product)=>{
          return <div key={product.id} onClick={()=>navigate(`/detail/${product.id}`)} className='flex md:w-[14rem] m-2 justify-between items-center flex-col cursor-pointer hover:scale-105 transition-transform'>
          <img src={product.main_image} className='w-[6rem] h-[6rem] md:w-[12rem] md:h-[12rem]'/>
         
<h2 className='text-blue-500 max-w-[5rem] md:max-w-[100%] text-center break-words whitespace-normal text-xs md:text-lg  hover:text-black '>{product.name}</h2>
            
          
          <h3 className='text-[13px] md:text-lg font-medium flex gap-1 items-center'> from <IndianRupeeIcon className='w-2 h-2 md:w-5 md:h-5'/> {product.price}</h3>
        </div>
        })
        }
        

      
    
       



        </div>
      </div>
    </div>
  )
}

export default Rowitems