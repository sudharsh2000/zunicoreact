import { Facebook, Youtube } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='bg-gray-800 h-[10rem] flex justify-center items-center gap-24'>
        <ul className='text-white'>
            <h3 className='text-xl'>About Us</h3>
            <li>Contact</li>
            <li>Address</li>
        </ul>
        <ul className='text-white'>
            <h3 className='text-xl'>Social</h3>
            <Facebook/>
            <Youtube/>
            

        </ul>


    </div>
  )
}

export default Footer