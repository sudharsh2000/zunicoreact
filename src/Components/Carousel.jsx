import React, { useEffect, useState } from 'react'

import 'swiper/css'
import {Swiper, SwiperSlide } from 'swiper/react'
import banner from '../assets/banner.jpg'
import banner2 from '../assets/banner2.jpg'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css/navigation'
import axios from 'axios'
import { bannerapi } from '../Redux/api'
function Carousel() {
const [items,setItems]=useState([])
useEffect(()=>{
  const  loadbanner= async()=>{
try{
    const res=await axios.get(bannerapi,{withCredentials:true})
   
    setItems(res.data)
}
catch(er){
  console.error('some error occured')
}

  }
  loadbanner();

},[])

  return (
    <div className='relative w-full py-[1rem]'>
        <Swiper  spaceBetween={50}
        autoplay={{delay:2000}}
        
        modules={[Navigation,Autoplay]}
        navigation
      slidesPerView={1}
      >
        {
          items.map((item)=>{
            return   <SwiperSlide key={item.id}>
                <img  src={item.image} className='object-cover w-full h-[180px] md:h-[600px]' />
            </SwiperSlide>
          })
        }
          
           
        </Swiper>
    </div>
  )
}

export default Carousel