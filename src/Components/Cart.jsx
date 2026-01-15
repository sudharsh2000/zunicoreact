import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { ClosedCaption, DeleteIcon, Home, IndianRupee, IndianRupeeIcon, PlusIcon, Trash, Trash2 } from 'lucide-react'
import { addTocart } from '../Hooks/Addcart'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate } from 'react-router'
import Addaddress from './Addaddress'
import { AddressApi, CartApi } from '../Redux/api'
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
      
     setCarts(res[0].items)
   
     setPriceTotal(res[0].total_price.toFixed(2))
     setDiscount(res[0].total_discount.toFixed(2))
     setFinalAmount(res[0].final_price.toFixed(2))
  
      if(userInfo.userid){
       
      const reswait= await api.get(`${AddressApi}?user=${userInfo.userid}`)
     
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
 
  const handleIncreaseDecrease = (productid, type) => {
    
  setCarts(prev => {
    let updated;
    console.log(productid,type)
    if(type === 'increase'||type === 'decrease'){
     updated = prev.map(prod => {
      if (prod.Product.id === productid) {
        if (type === 'increase') {
          return { ...prod, quantity: prod.quantity + 1 };
        } else if (type === 'decrease' && prod.quantity > 1) {
          return { ...prod, quantity: prod.quantity - 1 };
        }
      }
      return prod;
    });
 
  }
  else{
    console.log('s')
 updated = prev.filter(val=>val.id!==productid)
  }
   console.log(updated)
    const total =parseFloat( updated.reduce((sum, item) => sum + item.quantity * item.price, 0)).toFixed(2);
    const totaldiscount=parseFloat(updated.reduce((sum,item)=>sum + ((item.quantity * item.price)*(item.Product.discount) / 100 ),0)).toFixed(2)
    console.log(total)
    setPriceTotal(total);
    setDiscount(totaldiscount)
    setFinalAmount(parseFloat( total-totaldiscount).toFixed(2))
    console.log('Total:', total);
    return updated;
  });
};



const Addcart=async(Cart,type)=>{
  let addquantity=0
  if(type==='inc'){
    addquantity=1

  }
  else{
    addquantity=-1
  }
  const Cartdata={
    'user':parseInt( userInfo.userid),
    'items':[
     { 'Product_id':Cart.Product.id,
      'quantity':addquantity,
      'price':Cart.Product.price,
      'total_price':Cart.Product.price,
      
     'discount':(parseFloat(Cart.Product.discount)*parseFloat(Cart.Product.price))/100
    }
    ]

  }
  
  console.log(Cartdata)
  try{
 
  const res=await addTocart(Cartdata,'post',userInfo.userid)

  }
  
  catch(er){
    console.error(er)
  }

}
  return (
  
          <div className='flex flex-col md:flex-row  p-2 md:p-8 items-start md:justify-center gap-2 md:gap-[1rem] w-full min-h-[96vh] '>
    {
     loading?<div className='h-[90vh] bg-white w-[100%]'><LoadingScreen/></div>: Carts?.length>0?    <div className='bg-gray-200 shadow-lg rounded-2xl flex flex-col w-[100%] md:w-[69%] gap-2 md:gap-5'>

            {/* <div className='bg-white rounded-lg min-h-[10%] px-2 md:px-8 py-2 md:py-4 flex items-center '>
              <div className='w-[80%]'>
                {address?<div className='text-xs md:text-lg text-black flex gap-2  flex-col'>
                  <div>{address.full_name } {address.house_name},{address.landmark},{address.street} {address.district}  {address.state}</div>
                  <div> pin : {address.pincode }  Mobile :{address.phone}</div>
                  </div >:<p className='text-xs md:text-lg text-blue-500'> Select Address before continue</p>
                }

              </div>
             {!address? <button onClick={()=>navigate('/address')} className='flex p-1 md:p-2 rounded-lg hover:border-[1px] hover:shadow-lg border-blue-300 '> Add <PlusIcon/> </button>:
             <button  className='flex p-1 md:p-2 rounded-lg border-[1px] text-sm md:text-base md:border-0 hover:border-[1px] hover:shadow-lg border-blue-300 '> Change </button> }
            </div> */}
            <div className='w-full max-h-[60vh]   overflow-x-auto bg-white'>
              {Carts &&
              Carts.map((cart)=>{
             
                return <div key={cart.id} className='flex px-2 md:px-8 py-2 w-full border-b-1 shadow-lg border-gray-400' >
              <div className='flex flex-col w-[30%] items-center gap-2 md:gap-4 justify-center'>
                <img onClick={()=>navigate(`/detail/${cart.Product.id}`)} src={cart.Product.main_image} className='w-[8rem]  h-[6rem] md:w-[12rem] md:h-[9rem]' />
                <div className='flex justify-center items-center gap-2 md:gap-4'>
                    <button onClick={()=>{handleIncreaseDecrease(cart.Product.id,'decrease');Addcart(cart,'dec')}} className='shadow-lg hover:border-blue-500 border-1 text-xs md:text-lg border-red-400 rounded-full w-5 h-5 md:w-8 md:h-8'>-</button>
                    <input value={cart.quantity} type="number" className='text-center text-xs md:text-lg w-[40%] md:w-[30%] p-0.5 border-gray-500 border-1 rounded-md '/>
                    <button onClick={()=>{handleIncreaseDecrease(cart.Product.id,'increase');Addcart(cart,'inc')}} className='shadow-lg hover:border-blue-500 border-1 border-red-400 text-xs md:text-lg rounded-full w-5 h-5 md:w-8 md:h-8'>+</button>
                </div>
              </div>
                
                <div className='flex flex-col items-center gap-2 md:gap-5 justify-center w-[60%]'>
                    <h3 onClick={()=>navigate(`/detail/${cart.Product.id}`)} className='text-sm md:text-xl hover:text-blue-400 cursor-pointer'>{cart.Product.name}</h3>
                    <h2 className='flex text-xs md:text-lg items-center justify-center gap-2 md:gap-2'><h1 className='text-gray-500 text-decoration-line: line-through mr-1.5 font-s md:mr-6'>{parseFloat(cart.quantity * cart.price).toFixed(2)}</h1> <h1 className='flex justify-center items-center gap-1 md:gap-2'>Total <h1 className='flex justify-center items-center'> <IndianRupeeIcon className='w-3 md:w-5 h-6 md:h-12'/> {(cart.quantity * cart.price) - (cart.quantity * (cart.price*cart.Product.discount/100) )}</h1></h1></h2>
                    <p className='text-xs md:text-lg text-green-600'>{cart.Product.discount} % off</p>
                </div>
                <div className='flex justify-center items-center w-[10%]'>
                    <Trash2 onClick={()=>{
                      addTocart(null,'delete',cart.id);
                      handleIncreaseDecrease(cart.id,'delete')
                      
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
        <div className='shadow-lg min-h-[25%] bg-white rounded-lg flex justify-center items-center py-3 md:py-8'>
                <button onClick={()=> navigate(`/checkout?iscart=true`)} className='bg-amber-400 text-xs md:text-lg hover:bg-amber-500 w-[30%] py-1 px-2 md:h-[3rem] rounded-2xl shadow-lg' >Proceed to Buy</button>
            </div>  

        </div>:
        <div className='bg-white rounded-lg md:min-h-[50%] h-[18rem] min-w-[100%] min-h-[88vh]    md:min-w-[70%] flex justify-center items-center'>
          <div className='flex justify-around  gap-4 items-center md:gap-5'>
          <h2 className='text-xs md:text-2xl text-emerald-600'> Sorry ! No cartItems Found</h2>
          <button onClick={()=>navigate(`/`)} className='rounded-lg p-1 hover:bg-blue-200 md:p-3 border-1 border-blue-500 shadow-lg'><Home/></button>
          </div>
          </div>
        }
     {
     !loading&& Carts?.length>0?  <div className='bg-white shadow-lg rounded-xl md:rounded-lg flex flex-col w-[100%] py-3 px-2  md:px-3 md:py-9 md:w-[20%] h-[80%] gap-1 md:gap-5 pt-1'>
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