import { Facebook, Youtube } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='flex md:flex bg-gray-800 h-[14rem] pb-[6rem] md:pb-0  justify-center items-center gap-24'>
        <ul className='text-white gap-2 md:gap-4 flex flex-col'>
            <h3 className='text-xs md:text-xl'>About Us</h3>
            <li className='text-xs md:text-xl'>Contact</li>
            <li className='text-xs md:text-xl'>Address</li>
        </ul>
        <ul className='text-white gap-2 md:gap-4 flex flex-col'>
            <h3 className='text-xl'>Social</h3>
            <Facebook/>
            <Youtube/>
            

        </ul>


    </div>
  )
}

export default Footer