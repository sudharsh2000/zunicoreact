import React from 'react'
import home from '../assets/home.jpg'
function FlashScreen() {
  return (
    <div  style={{ backgroundImage: `url(${home})` }} className='absolute w-[100%] object-cover top-0 bg-w left-0 z-50 h-[100vh] bg-cover'>
          <div className='flex justify-center h-full w-full items-start  bg-[#050101cd]'>
            <div className='flex flex-col gap-2 h-full w-full md:gap-5 justify-center items-center '>
              <h2 className='text-2xl md:text-8xl text-white animate-pulse'> Wisedecore</h2>
              <h1 className='text-2xl text-white animate-ping md:text-6xl'>....</h1>

            </div>


          </div>

        </div>
  )
}

export default FlashScreen