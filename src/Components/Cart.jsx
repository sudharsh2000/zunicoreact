import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { ClosedCaption, DeleteIcon, Home, IndianRupee, IndianRupeeIcon, PlusIcon, Trash, Trash2 } from 'lucide-react'
import { addTocart } from '../Hooks/Addcart'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'
import Addaddress from './Addaddress'
import { AddressApi } from '../Redux/api'
import api from '../Redux/Interceptor'
import LoadingScreen from './LoadingPage'

function CartPage() {
  const navigate=useNavigate()
  const {userInfo}=useAuth()
  const [address,SetAddress]=useState([])
  const [Carts,setCarts]=useState()
  const [pricetotal,setPriceTotal]=useState('-----')
  const [discounttotal,setDiscount]=useState('-----')
  const [FinalAmount,setFinalAmount]=useState('-----')
  const [loading,SetLoading]=useState()
  useEffect(()=>{

 const loadapi=async()=>{
  
  if (!userInfo || !userInfo.userid) return;
   SetLoading(true)
     
     try{
const res=await addTocart(null,'get',userInfo.userid);
       console.log(res)
     setCarts(res[0].items)
   
     setPriceTotal(res[0].total_price)
     setDiscount(res[0].total_discount)
     setFinalAmount(res[0].final_price)
  
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
  
    
  },[])
 
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
  
          <div className='flex flex-col md:flex-row  p-2 md:p-8 items-start md:justify-center gap-2 md:gap-[1rem] w-full min-h-[96vh] '>
    {
     loading?<div className='h-[90vh] bg-white w-[100%]'><LoadingScreen/></div>: Carts?    <div className='bg-gray-200 shadow-lg flex flex-col w-[100%] md:w-[69%] gap-5'>

            <div className='bg-white min-h-[10%] px-2 md:px-8 py-2 md:py-4 flex items-center '>
              <div className='w-[80%]'>
                {address?<p className='text-xs md:text-lg text-black flex gap-2  flex-col'>
                  <div>{address.full_name } {address.house_name},{address.landmark},{address.street} {address.district}  {address.state}</div>
                  <div> pin : {address.pincode }  Mobile :{address.phone}</div>
                  </p >:<p className='text-xs md:text-lg text-blue-500'> Select Address before continue</p>
                }

              </div>
             {!address? <button onClick={()=>navigate('/address')} className='flex p-1 md:p-2 rounded-lg hover:border-[1px] hover:shadow-lg border-blue-300 '> Add <PlusIcon/> </button>:
             <button  className='flex p-1 md:p-2 rounded-lg hover:border-[1px] hover:shadow-lg border-blue-300 '> Change </button> }
            </div>
            <div className='w-full max-h-[40vh]   overflow-x-auto bg-white'>
              {Carts &&
              Carts.map((cart)=>{
             
                return <div key={cart.id} className='flex px-2 md:px-8 py-2 w-full border-b-1 shadow-lg border-gray-400' >
              <div className='flex flex-col w-[30%] items-center gap-2 md:gap-4 justify-center'>
                <img onClick={()=>navigate(`/detail/${cart.Product.id}`)} src={cart.Product.main_image} className='w-[8rem]  h-[6rem] md:w-[12rem] md:h-[9rem]' />
                <div className='flex justify-center items-center gap-2 md:gap-4'>
                    <button onClick={()=>handleIncreaseDecrease(cart.Product.id,'decrease')} className='shadow-lg hover:border-blue-500 border-1 border-red-400 rounded-full w-8 h-8'>-</button>
                    <input value={cart.quantity} type="number" className='text-center w-[40%] md:w-[30%] p-1 border-gray-500 border-1 rounded-md '/>
                    <button onClick={()=>handleIncreaseDecrease(cart.Product.id,'increase')} className='shadow-lg hover:border-blue-500 border-1 border-red-400 rounded-full w-8 h-8'>+</button>
                </div>
              </div>
                
                <div className='flex flex-col items-center gap-2 md:gap-5 justify-center w-[60%]'>
                    <h3 onClick={()=>navigate(`/detail/${cart.Product.id}`)} className='text-sm md:text-2xl hover:text-blue-400 cursor-pointer'>{cart.Product.name}</h3>
                    <h2 className='flex text-xl items-center justify-center gap-1 md:gap-1'><IndianRupeeIcon className='w-5 h-12'/>{cart.quantity * cart.price}</h2>
                    <p className='text-green-600'>{cart.Product.discount} % off</p>
                </div>
                <div className='flex justify-center items-center w-[10%]'>
                    <Trash2 onClick={()=>{
                      addTocart(null,'delete',cart.id)
                      setCarts(prev=>prev.filter(val=>val.id!==cart.id))
                      }}  className='text-2xl  md:w-[30%] hover:text-red-900 h-[80%] md:h-[40%] text-red-600 '/>
                </div>

            </div>
          
              })
            //    :
            // <div className='w-full flex justify-center items-center'>
            //   <h4 className='text-2xl'> No Cart Items</h4>
            //   </div> 
            }
            
               
                
               
            </div>
        <div className='shadow-lg min-h-[25%] bg-white flex justify-center items-center py-3 md:py-8'>
                <button onClick={()=> navigate(`/checkout?iscart=true`)} className='bg-amber-400 text-xs md:text-lg hover:bg-amber-500 w-[30%] py-1 px-2 md:h-[3rem] rounded-2xl shadow-lg' >Proceed to Buy</button>
            </div>  

        </div>:
        <div className='bg-white md:min-h-[50%] h-[18rem] min-w-[100%] min-h-[88vh]   rounded-md md:min-w-[70%] flex justify-center items-center'>
          <div className='flex justify-around  gap-4 items-center md:gap-5'>
          <h2 className='text-xs md:text-2xl text-emerald-600'> No cartItems Found</h2>
          <button onClick={()=>navigate(`/`)} className='rounded-lg p-1 hover:bg-blue-200 md:p-3 border-1 border-blue-500 shadow-lg'><Home/></button>
          </div>
          </div>
        }
     {
     !loading&& Carts?  <div className='bg-white shadow-lg flex flex-col w-[100%] py-3 px-2  md:px-3 md:py-9 md:w-[20%] h-[80%] gap-1 md:gap-5 pt-1'>
          <div className='flex justify-around w-full p-1 md:p-2'>
            <h2 className='w-[40%] text-xs md:text-xl'>Total Price</h2>
            <p> - </p>
            <h2 className='text-sm md:text-xl font-extrabold flex justify-center items-center gap-0 md:gap-2'><IndianRupee className='h-4'/>{pricetotal}</h2>
            
            </div>
             <div className='flex justify-around w-full  p-1 md:p-2'>
            <h2 className='w-[40%] text-xs md:text-xl text-green-500'>Discount</h2>
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
     } 
    
    </div>
    
  )
}

export default CartPage