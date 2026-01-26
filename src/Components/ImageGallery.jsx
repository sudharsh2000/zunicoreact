import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
function ImageGallery({images}) {
       const[mainImage,setmainimage]=useState(null)
    useEffect(()=>{
      console.log(images)
        if(images){
setmainimage(images[0].image)
        }

    },[images])
 
  return (
    <div className='w-[100%] md:w-[82%] flex flex-col gap-2 md:gap-5 '>

        <div className={`flex border-1 bg-white shadow-2xl  md:min-h-[60%] md:h-[80%] rounded-lg border-blue-300 justify-center items-center  p-1 md:p-6 `}>
            <img src={mainImage} className='h-[100%] cursor-zoom-in transition-transform  hover:scale-105 hover:z-50 '/>
        </div>
       {images&&images.length>1&& <div className='flex bg-white shadow-lg gap-3 md:gap-8 border-0 p-2 h-[6rem] md:p-3 md:h-[20%] rounded-lg'>
           {images&&images.map((image)=>{
return <div key={image.id} onClick={()=>setmainimage(image.image)} className={`border-1 rounded-md  p-1 md:p-6 ${mainImage===image.image?'border-blue-700':'border-gray-400 '}`}>

            <img src={image.image} className='h-[100%]' />
        </div>

           })} 
        

        </div>
}


    </div>
  )
}

export default ImageGallery