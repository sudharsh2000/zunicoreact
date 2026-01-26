import React from 'react'
import wise from '../assets/wise.png'
import { Search } from 'lucide-react'
import Searchbar from './Searchbar'

function Headerbar() {
  return (
    <div className='md:hidden w-[100%] sticky top-0 z-50 shadow-xl'>
        <div className='w-[100%] bg-gradient-to-r from-emerald-50 to-emerald-700 flex gap-[.5rem] py-3 items-center px-2 '>
        <img src={wise} className='h-[1.5rem] md:h-[2rem] '/>
        <Searchbar/>

            </div>
    </div>
  )
}

export default Headerbar