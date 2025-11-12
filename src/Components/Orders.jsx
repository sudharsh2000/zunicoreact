import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { ClosedCaption, DeleteIcon, IndianRupee, IndianRupeeIcon, PlusIcon, Trash, Trash2 } from 'lucide-react'
import { addTocart } from '../Hooks/Addcart'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'
import Addaddress from './Addaddress'
import { AddressApi, OrderApi } from '../Redux/api'
import api from '../Redux/Interceptor'
import LoadingScreen from './LoadingPage'
import axios from 'axios'

function Orders() {
  const navigate=useNavigate()
  const {userInfo}=useAuth()
  const [address,SetAddress]=useState()
  const [Carts,setCarts]=useState()
  const [pricetotal,setPriceTotal]=useState('-----')
  const [discounttotal,setDiscount]=useState('-----')
  const [FinalAmount,setFinalAmount]=useState('-----')
  const [loading,SetLoading]=useState()
  useEffect(()=>{

 const loadapi=async()=>{
  
  if (!userInfo || !userInfo.userid) return;
   SetLoading(true)
const res=await api.get(`${OrderApi}?user=${userInfo.userid}`)
      
     setCarts(res.data[0].order_items)
    console.log(res.data[0].order_items)
     
    
     try{
      if(userInfo.userid){
       
      const reswait= await api.get(`${AddressApi}?user=${userInfo.userid}`)
      console.log(reswait.data)
      SetAddress(reswait.data[0])
    
      }
      
     }
     catch(er){
      console.error(er)
      
     }
     SetLoading(false)
    }
     loadapi(); 
  
    
  },[userInfo])
 
  const handleIncreaseDecrease = (productid, type) => {
  setCarts(prev => {
    const updated = prev.map(prod => {
      if (prod.Product.id === productid) {
        if (type === 'increase') {
          return { ...prod, quantity: prod.quantity + 1 };
        } else if (type === 'decrease' && prod.quantity > 1) {
          return { ...prod, quantity: prod.quantity - 1 };
        }
      }
      return prod;
    });

    // ✅ calculate total after update
    const total = updated.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const totaldiscount=updated.reduce((sum,item)=>sum + ((item.quantity * item.price)*(item.Product.discount) / 100 ),0)
    setPriceTotal(total);
    setDiscount(totaldiscount)
    setFinalAmount(total-totaldiscount)
    console.log('Total:', total);
    return updated;
  });
};

  return (
  
          <div className='flex flex-col md:flex-row  p-2 md:p-8 items-start md:justify-center gap-2 md:gap-[1rem] w-full min-h-[90vh] '>
    {
     loading?<div className='h-[80vh] bg-white w-[100%]'><LoadingScreen/></div>: userInfo?    <div className='bg-gray-200 shadow-lg flex flex-col w-[100%] md:w-[69%] gap-5'>

        
            <div className='w-full    overflow-x-auto '>
              {Carts &&
              Carts.map((cart)=>{
                {console.log(cart)}
             
                return <div key={cart.id} className='flex bg-white px-2 mb-[1rem] md:mb-[2rem] md:px-8 py-2 w-full border-b-1 shadow-lg border-gray-400' >
              <div className='flex flex-col w-[30%] items-center gap-2 md:gap-4 justify-center'>
                <img onClick={()=>navigate(`/detail/${cart.product.id}`)} src={cart.product.main_image} className='w-[8rem]  h-[6rem] md:w-[12rem] md:h-[9rem]' />
                {/* <div className='flex justify-center items-center gap-2 md:gap-4'>
                    <button onClick={()=>handleIncreaseDecrease(cart.product.id,'decrease')} className='shadow-lg hover:border-blue-500 border-1 border-red-400 rounded-full w-8 h-8'>-</button>
                    <input value={cart.quantity} type="number" className='text-center w-[40%] md:w-[30%] p-1 border-gray-500 border-1 rounded-md '/>
                    <button onClick={()=>handleIncreaseDecrease(cart.product.id,'increase')} className='shadow-lg hover:border-blue-500 border-1 border-red-400 rounded-full w-8 h-8'>+</button>
                </div> */}
              </div>
                
                <div className='flex flex-col items-center gap-2 md:gap-5 justify-center w-[60%]'>
                    <h3 onClick={()=>navigate(`/detail/${cart.product.id}`)} className='text-sm md:text-2xl hover:text-blue-400 cursor-pointer'>{cart.product.name}</h3>
                    <h2 className='flex text-xl items-center justify-center gap-1 md:gap-1'><IndianRupeeIcon className='w-5 h-12'/>{cart.quantity * cart.price}</h2>
                    <p className='text-green-600'>{cart.product.discount} % off</p>
                </div>
                <div className='flex justify-center items-center w-[10%]'>
                    <h2 onClick={()=>{
                      addTocart(null,'delete',cart.id)
                      setCarts(prev=>prev.filter(val=>val.id!==cart.id))
                      }}  className='text-xl px-1 md:px-3 py-1 md:py-2 shadow-lg rounded-xl border-1   hover:border-red-900 cursor-pointer border-red-600 '> Cancel</h2>
                </div>

            </div>
          
              })
            //    :
            // <div className='w-full flex justify-center items-center'>
            //   <h4 className='text-2xl'> No Cart Items</h4>
            //   </div> 
            }
            
               
                
               
            </div>
        {/* <div className='shadow-lg min-h-[25%] bg-white flex justify-center items-center py-3 md:py-8'>
                <button onClick={()=> navigate(`/checkout?iscart=${true}`)} className='bg-amber-400 text-xs md:text-lg hover:bg-amber-500 w-[30%] py-1 px-2 md:h-[3rem] rounded-2xl shadow-lg' >Proceed to Buy</button>
            </div>   */}

        </div>:
        <div className='bg-white min-h-[50%] h-[18rem]  rounded-md min-w-[70%] flex justify-center items-center'>
          <div className='flex justify-around  gap-4 items-center md:gap-5'>
          <h2 className='text-xs md:text-2xl text-blue-600'> No cartItems Found</h2>
          <button onClick={()=>navigate(`/signin`)} className='rounded-lg p-1 hover:bg-blue-200 md:p-3 border-1 border-blue-500 shadow-lg'>Login</button>
          </div>
          </div>
        }
     {/* {
     !loading&& userInfo?  <div className='bg-white shadow-lg flex flex-col w-[100%] py-3 px-2  md:px-3 md:py-9 md:w-[20%] h-[80%] gap-1 md:gap-5 pt-1'>
          <div className='flex justify-around w-full p-1 md:p-2'>
            <h2 className='w-[40%] text-xs md:text-xl'>Total Price</h2>
            <p> - </p>
            <h2 className='text-sm md:text-xl font-extrabold flex justify-center items-center gap-0 md:gap-2'><IndianRupee className='h-4'/>{pricetotal}</h2>
            
            </div>
             <div className='flex justify-around w-full  p-1 md:p-2'>
            <h2 className='w-[40%] text-xs md:text-xl text-green-500'>Amount you saved</h2>
            <p> - </p>
            <h2 className='text-sm md:text-xl font-extrabold flex justify-center items-center gap-0 md:gap-2'><IndianRupee className='h-4'/> {discounttotal}</h2>
            
            </div>
             <div className='flex justify-around w-full pt-3 md:pt-2 border-y-2  border-gray-500  p-1 md:p-5'>
            <h2 className='w-[40%] text-xs md:text-xl'>Final Amount</h2>
            <p> - </p>
            <h2 className='text-sm md:text-xl font-extrabold flex justify-center items-center gap-1 md:gap-2'><IndianRupee className='h-4'/> {FinalAmount}</h2>
            
            </div>

        </div>
       :''
     }  */}
    
    </div>
    
  )
}

export default Orders