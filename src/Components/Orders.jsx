import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { CircleDot, ClosedCaption, DeleteIcon, Home, IndianRupee, IndianRupeeIcon, PlusIcon, Trash, Trash2 } from 'lucide-react'
import { addTocart } from '../Hooks/Addcart'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'
import Addaddress from './Addaddress'
import { AddressApi, OrderApi, OrderItemApi } from '../Redux/api'
import api from '../Redux/Interceptor'
import LoadingScreen from './LoadingPage'
import axios from 'axios'
import { toast } from 'react-toastify'

function Orders() {
  const navigate=useNavigate()
  const {userInfo}=useAuth()
  const [address,SetAddress]=useState()
  const [Carts,setCarts]=useState([])
  const [pricetotal,setPriceTotal]=useState('-----')
  const [discounttotal,setDiscount]=useState('-----')
  const [FinalAmount,setFinalAmount]=useState('-----')
  const [loading,SetLoading]=useState()
  const [orderStatus,setOrderStatus]=useState()
  useEffect(()=>{

 const loadapi=async()=>{
  
  if (!userInfo || !userInfo.userid) return;
   SetLoading(true)
   try{
const res=await api.get(`${OrderApi}?user=${userInfo.userid}`)
      console.log(res.data)
     setCarts(res.data)
     setOrderStatus(res.data.order_status)
    
     
    
     
      if(userInfo.userid){
       
      const reswait= await api.get(`${AddressApi}?user=${userInfo.userid}`)
      console.log(reswait.data)
      SetAddress(reswait.data[0])
    
      }
      
     }
     catch(er){
      console.error(er)
      
     }
     finally{
SetLoading(false)
     }
     
    }
     loadapi(); 
  
    
  },[userInfo?.userid])
 
  const deleteOrder=async(orderid)=>{
    try{
      const res=api.delete(`${OrderApi}${orderid}/`)
      console.log(res.status)
      toast.success('Canceled')

    }
    catch(er){
      console.log(er)
      toast.error('some error cause')
    
    }
  }
 
const CancellOrder=async(orderid,nowstatus)=>{
    try{
        const res=await api.patch(`${OrderApi}${orderid}/`,{
            'order_status':nowstatus
        })
        console.log(res.data)
    }
    catch(er){
        console.log(er)
    }
}
  return (
  
          <div className='flex flex-col md:flex-row  p-2 md:p-8 items-start md:justify-center gap-2 md:gap-[1rem] w-full min-h-[90vh] '>
    {
     loading?<div className='h-[90vh] bg-white w-[100%]'><LoadingScreen/></div>: Carts.length>0 ?  <div className='shadow-lg bg-white flex md:min-h-[70vh] flex-col w-[100%] md:w-[89%] rounded-xl gap-5 md:gap-[3rem]'>

        
            <div className='w-full flex flex-col gap-2 md:gap-6    overflow-x-auto  mt-3 md:mt-[3rem] md:px-2 '>
              {
              Carts &&
              Carts.map((cart)=>{
                {console.log(cart)}
             
                return <div key={cart.id} className='flex bg-white px-2 rounded-xl  md:px-8 py-2 w-full   shadow-lg ' >
              <div className='flex flex-col w-[20%] items-center gap-2 md:gap-4 justify-center'>
                <img onClick={()=>navigate(`/detail/${cart.Product.id}`)} src={cart.order_items[0].Product.main_image} className='w-[8rem]  h-[6rem] md:w-[12rem] md:h-[9rem]' />
              
              </div>
                
                <div className='flex flex-col md:flex-row items-center gap-2 md:gap-5 justify-center w-[50%]'>
                    <h3 onClick={()=>navigate(`/detail/${cart.order_items[0].Product.id}`)} className='md:w-[80%] text-center text-sm md:text-xl hover:text-blue-400 cursor-pointer'>{cart.order_items[0].Product.name}</h3>
                    <h2 className='md:w-[20%] flex text-lg items-center  justify-center gap-1 md:gap-0'><IndianRupeeIcon className='w-5 h-12'/>{cart.total_amount}</h2>
                    
                </div>
                <div className='flex flex-col md:flex-row items-center gap-2 md:gap-5 justify-center w-[25%]'>
                 {cart.order_status==='Processing' ? <p className='flex gap-1 md:gap-2'> <CircleDot className='text-gray-500'/> Yor item is Processing</p>:cart.order_status==='Confirmed'? <p className='flex gap-1 md:gap-2'> <CircleDot className='text-green-600'/> Your Item has been Confirmed</p>:cart.order_status==='Cancelled'? <p className='flex gap-1 md:gap-2'> <CircleDot className='text-blue-600'/>Your Item has been Cancelled</p>:<p className='flex gap-1 md:gap-2'> <CircleDot className='text-blue-600'/> {cart.order_status}</p>}
                  </div>
              {cart.order_status!=='Cancelled' && <div className='flex justify-center items-center w-[15%]'>
                    <h2 onClick={()=>{CancellOrder(cart.id,'Cancelled')
                      }} disabled={cart.order_status==='Cancelled'}  className={`${cart.order_status==='Cancelled'?'border-0 text-gray-500':'border-1 shadow-lg rounded-xl    hover:border-red-900 cursor-pointer border-red-600 '} text-sm md:text-base px-1 md:px-3 py-1 md:py-2 `}> Cancel Order</h2>
                </div>
                    }

            </div>
          
              })

            }
          </div>
      

        </div>:
        <div className='bg-white md:min-h-[50%]  min-w-[100%] min-h-[88vh]  md:h-[18rem]  rounded-md md:min-w-[70%] flex justify-center items-center'>
          <div className='flex justify-around  gap-4 items-center md:gap-5'>
          <h2 className='text-xs md:text-2xl text-emerald-600'> Sorry! No Orders Found</h2>
          <button onClick={()=>navigate(`/`)} className='rounded-lg p-1 hover:bg-blue-200 md:p-3 border-1 border-blue-500 shadow-lg'><Home/></button>
          </div>
          </div>
        }
     
    
    </div>
    
  )
}

export default Orders