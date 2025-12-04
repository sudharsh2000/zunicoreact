import React, { useEffect, useState } from 'react'

function OrderDetails({item,setAdditem}) {
  const [list,setlist]=useState([])
  useEffect(()=>{
 setlist(item.order_items)
  console.log(item.order_items)
  },[])
 
  return (
    <div className='absolute w-[100%] h-[100%] bg-[#090909a3]'>
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
     <div className='w-[90%] md:w-[50%] min-h-[80%] flex justify-around flex-col items-center bg-white rounded-lg shadow-xl'>
        <table className='w-[100%] h-[100%]   gap-3 md:mt-[0rem] '>
                    <thead className='w-[100%] py-1 md:py-3'>
                        <tr className='border-collapse border-y-1 h-[1rem] md:h-[3rem]'>
                            <td className='w-[34%] text-sm md:text-xl items-center text-center'>Product</td>
                            <td className='w-[22%] text-sm md:text-xl border-collapse text-center border-1'>Quantity</td>
                            <td className='w-[22%] text-sm md:text-xl border-collapse text-center border-1' >Price</td>
                            <td className='w-[22%] text-sm md:text-xl border-collapse text-center border-1'>Total Amount</td>
                          
                        </tr>
                    </thead>
                    <tbody className='w-[100%]'>
                   {list&&list.map((prod)=>{
                      return <tr className='border-collapse border-y-1 h-[1rem] md:h-[3rem]'>
                            <td className='w-[34%] text-xs md:text-lg items-center text-center'>{prod.Product.name}</td>
                            <td className='w-[22%] text-xs md:text-lg  border-collapse text-center border-1'>{prod.quantity}</td>
                            <td className='w-[22%] text-xs md:text-lg  border-collapse text-center border-1' >{prod.Product.price}</td>
                            <td className='w-[22%] text-xs md:text-lg  border-collapse text-center border-1'>{prod.total_price}</td>
                          
                        </tr>
                     })} 

                    </tbody>
                </table>
                <div className='w-full flex justify-center '>
                <button onClick={()=>setAdditem(false)} className=' w-[90%] py-1 md:py-3 text-white bg-red-400 hover:bg-red-600 rounded-lg shadow-lg '>Close</button>
                </div>

        </div>
        </div>
        </div>
  )
}

export default OrderDetails