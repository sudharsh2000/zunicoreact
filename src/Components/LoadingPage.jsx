import { Loader2 } from 'lucide-react'
import React from 'react'
import loadingimg2 from '../assets/loadingimg2.png'
function LoadingScreen() {
  return (
    <div className='flex h-[100%] w-[100%] justify-center items-center '>
        <h2 className='text-2xl animate-pulse flex justify-center items-center flex-col gap-4 md:gap-7 font-extrabold font-sans text-gray-700 text-shadow-yellow-600 '>Loading...<img src={loadingimg2} className='text-yellow-600 animate-spin font-extrabold w-[4rem] h-[4rem]'/></h2>

    </div>
  )
}

export default LoadingScreen