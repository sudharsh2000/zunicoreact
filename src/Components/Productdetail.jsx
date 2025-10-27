import React, { useEffect, useState } from 'react'
import ImageGallery from './ImageGallery'
import { BadgeIndianRupee, IndianRupee, ShoppingBagIcon } from 'lucide-react'
import api from '../Redux/Interceptor'
import { productapi } from '../Redux/api'
import { useParams } from 'react-router'

function Productdetail() {
  const [products,setProducts]=useState({})
  const {id}=useParams()

  useEffect(()=>{
    const loadproducts=async()=>{
 try{
      const res=await api.get(`${productapi}?id=${id}`,{withCredentials:true})
      console.log(res.data)
      setProducts(res.data[0])
    }
    catch(er){
      console.error(er)
    }
    }
   loadproducts();
  },[])
  return (
    <div className='flex mb-[2rem] flex-col md:flex-row justify-around p-3 md:p-8 gap-3 w-[100%] md:gap-10 h-[100vh]'>
          <ImageGallery images={products.images} className='w-[100%] md:w-[82%]'/>
        <div className='flex flex-col justify-center mb-[2rem] w-[100%] md:w-[40%] gap-3 md:gap-10'>
          <h2 className=' font-bold text-4xl'> {products.name}</h2>
          <div className='w-80% border-1 border-gray-400 rounded-lg p-1 md:p-3'>
            <h2 className='my-1.5 md:my-5 font-extrabold text-lg'> Description</h2>
            <p className='text-xs md:text-lg' >{products.description}</p>
          </div>
          <h1 className='flex gap-0.5 md:gap-2.5 text-green-700'>{parseInt( products.discount)} % <p className='font-bold'>discount</p></h1>
<div className='w-full flex justify-center items-center'>


<button className='flex gap-1 text-xl md:gap-4 bg-blue-300 items-center justify-center rounded-lg p-1 md:p-4 w-[50%] shadow-lg cursor-pointer transition-transform hover:scale-105'>Add to cart <ShoppingBagIcon/></button>
</div>
    <h1 className='flex gap-0.5 md:gap-2.5 text-2xl font-extrabold justify-center items-center'> {products.price} <p className='font-extrabold'> <IndianRupee/> </p></h1>
       
      <div className='w-full flex justify-center items-center'>


<button className='flex gap-1 md:gap-4 text-xl bg-yellow-500 items-center justify-center rounded-lg p-1 md:p-4 w-[80%] shadow-lg cursor-pointer transition-transform hover:scale-105'>Buy Now <BadgeIndianRupee/></button>
</div> 
        </div>
    </div>
  )
}

export default Productdetail