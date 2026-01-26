import { ArrowLeftIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router'

function Mobileheader({value}) {
    const navigate=useNavigate()

  return (
    <div className='flex sticky md:hidden top-0 z-50 w-full py-3 px-3 gap-[2rem] bg-gradient-to-l from-emerald-50  to-emerald-700'>

   <button className='text-xl font-bold text-white' onClick={()=>navigate(-1)}><ArrowLeftIcon/> </button>
   <div>
    <h2 className='text-2xl font-bold text-[#fcf8f8]'>{value}</h2>
   </div>
    </div>
  )
}

export default Mobileheader