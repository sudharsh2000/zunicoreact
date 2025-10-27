import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
function ImageGallery({images}) {
       const[mainImage,setmainimage]=useState(null)
    useEffect(()=>{
        if(images){
setmainimage(images[0].image)
        }

    },[images])
 
  return (
    <div className='w-[100%] md:w-[82%] flex flex-col gap-2 md:gap-5 '>

        <div className='flex border-1 bg-white shadow-2xl md:h-[70%] rounded-lg border-blue-300 justify-center items-center  p-1 md:p-6 '>
            <img src={mainImage} className='h-[100%] transition-transform hover:scale-125 hover:z-50 '/>
        </div>
        <div className='flex gap-1 shadow-lg md:gap-8 border-0 p-2 md:p-3 md:h-[20%] rounded-lg'>
           {images&&images.map((image)=>{
return <div key={image.id} onClick={()=>setmainimage(image.image)} className={`border-1 rounded-md  p-1 md:p-6 ${mainImage===image.image?'border-blue-700':'border-gray-400 '}`}>

            <img src={image.image} className='h-[100%]' />
        </div>

           })} 
        

        </div>


    </div>
  )
}

export default ImageGallery