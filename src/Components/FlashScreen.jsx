import React from 'react'
import home from '../assets/home.jpg'
import homemobile from '../assets/homemobile.jpg'
function FlashScreen() {
  return (
    <div  className='absolute w-[100%] object-cover top-0 bg-w left-0 z-50 h-[100vh] bg-cover'>
           <div
        className="md:hidden w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${homemobile})` }}
      ></div>

      {/* Desktop Background */}
      <div
        className="hidden md:block w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${home})` }}
      ></div>

      {/* Overlay + Content */}
      <div className="absolute inset-0 bg-[#050101cd] flex justify-center items-center flex-col gap-5">
         <div className='flex flex-col gap-2 h-full w-full md:gap-5 justify-center items-center '>
              <h2 className='text-2xl md:text-8xl text-emerald-50 animate-pulse'> Wisedecore</h2>
              <h1 className='text-2xl text-white animate-ping md:text-6xl'>....</h1>

            </div>


          </div>

        </div>
  )
}

export default FlashScreen