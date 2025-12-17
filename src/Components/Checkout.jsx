import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { Banknote, ClosedCaption, DeleteIcon, IndianRupee, IndianRupeeIcon, PlusIcon, TicketCheck, Trash, Trash2 } from 'lucide-react'
import { addTocart } from '../Hooks/Addcart'
import { useAuth } from '../Redux/AuthProvider'
import { useNavigate, useParams } from 'react-router'
import Addaddress from './Addaddress'
import { AddressApi, CartApi, OrderApi, OrderDeleteApi, VerifyApi } from '../Redux/api'
import api from '../Redux/Interceptor'
import LoadingScreen from './LoadingPage'
import { toast } from 'react-toastify'
import Razorpay from "razorpay";
function Checkout() {
  const navigate=useNavigate()
  const {userInfo}=useAuth()
  const [address,SetAddress]=useState()
  const [Carts,setCarts]=useState([])
  const [pricetotal,setPriceTotal]=useState('-----')
  const [discounttotal,setDiscount]=useState('-----')
  const [FinalAmount,setFinalAmount]=useState('-----')
  const [loading,SetLoading]=useState()
  const params=new URLSearchParams(location.search)
  const iscart=params.get('iscart')
  const product_id=params.get('product_id')
  const [successcheck,setsucessCheck]=useState(false)
  const [paymentmode,setpaymentMode]=useState('COD')
  const [warning,setWarning]=useState('')
  // or use window.Razorpay
  useEffect(()=>{

 const loadapi=async()=>{
  
  if (!userInfo || !userInfo.userid) return;
   SetLoading(true)
   console.log(iscart)
      if(iscart==='true'){
const res=await addTocart(null,'get',userInfo.userid);

   
     setCarts(res[0].items)
    console.log('a')
     setPriceTotal(res[0].total_price)
     setDiscount(res[0].total_discount)
     setFinalAmount(res[0].final_price)
   }
   else{
    const res=await api.get(`${OrderApi}?id=${product_id}`);

    console.log(res)
setCarts(res.data[0].order_items)
setPriceTotal(parseFloat(res.data[0].order_items[0].total_price).toFixed(2))
    console.log('new',res.data)
    setDiscount(parseFloat(res.data[0].total_discount).toFixed(2))
     setFinalAmount(parseFloat(res.data[0].order_items[0].total_price-res.data[0].total_discount).toFixed(2))
    
  
     
   }
     try{
      if(userInfo.userid){
       
      const reswait= await api.get(`${AddressApi}?user=${userInfo.userid}`)
      console.log(reswait.data)
      SetAddress(reswait.data[0])
      if(!reswait.data[0]){
        setWarning('Please add address before continue')
    
      }
    }
      
     }
     catch(er){
      console.error(er)
      
     }
     SetLoading(false)
    }
     loadapi(); 

     return async()=>{
      const ress=await api.delete(`${OrderDeleteApi}?user_id=${userInfo.userid}&order_status=DRAFT`)
      console.log(ress.status)
     }
  
    
  },[userInfo?.userid,iscart])



const handlePayment = async () => {


deleteDraftOrder();

  const orderitem=[]
  Carts.forEach((a)=>{
    console.log(a)
    let ord= {
      "id": a.id,
      "Product_id": a.Product.id,
      "quantity": a.quantity,
      "price": a.price,
      "total_price": a.total_price,
      "discount": a.discount
    }
    orderitem.push(ord)

  });
  console.log(orderitem)
  const orderdata={
  "user_id": userInfo.userid,
  "total_amount": FinalAmount,
  "total_discount": discounttotal,
  "payment_status": "Pending",
  "payment_method": paymentmode,
  "order_status": "Processing",
  "order_items": orderitem,
  "payment": {
    "payment_id": "1012",
    "payment_status": "Pending",
    "payment_mode": paymentmode
  }
}
 


try{
  const response = await api.post(OrderApi,orderdata)

  const data = response.data
console.log(data)
  if (data.razorpay_order_id) {
    const options = {
      key: data.razorpay_key,
      amount: data.amount * 100,
      currency: "INR",
      name: "Wisedecore",
      order_id: data.razorpay_order_id,
      handler: async function (response) {
        // This executes after successful payment
        await api.post(VerifyApi,response.data)
      },
      prefill: {
        name: userInfo.username,
        email: userInfo.email,
        contact: '8989121223SS',
      },
      theme: { color: "#3399cc" },
    };
    console.log(options)
    const rzp = new window.Razorpay(options);
    rzp.open();
    
  }
  setsucessCheck(true)
}
catch(er){
console.log(er)
}
};


 const deleteDraftOrder=async()=>{
  const ress=await api.delete(`${CartApi}clear/?user=${userInfo.userid}`)
  console.log(ress.status)
  const redraft=await api.delete(`${OrderDeleteApi}?user=${userInfo.userid}&order_status=DRAFT`)
  console.log(redraft.status)
  
 }


  return (
  
          <div className='flex flex-col md:flex-row  p-2 md:p-8 items-start md:justify-center gap-2 md:gap-[1rem] w-full min-h-[90vh]'>
    {
     loading?<div className='h-[80vh] bg-white w-[100%]'><LoadingScreen/></div>: userInfo?    <div className='bg-gray-200 shadow-lg flex flex-col w-[100%] md:w-[69%] gap-5'>

            <div className='bg-white min-h-[10%]  '>
              <div className='w-full p-2 md:p-3 bg-yellow-500'>
                <h2 className='text-sm md:text-xl font-extrabold text-white'>Address Details</h2>
                </div>
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
            </div>
            <div className='bg-white min-h-[10%]  '>
              <div className='w-full p-2 md:p-3 bg-yellow-500'>
                <h2 className='text-sm md:text-xl font-extrabold text-white'>Payment Details</h2>
                </div>
                <div className='bg-white min-h-[10%] px-2 md:px-8 py-2 md:py-4 flex flex-col md:gap-5 justify-center '>
                 <div className='flex gap-3 md:gap-7 cursor-pointer' onClick={(e)=>setpaymentMode('COD')}>
                  <input type="radio"  name="payment"  checked={paymentmode==='COD'} onClick={(e)=>setpaymentMode(e.target.value)} value={'COD'} className=' rounded-full '  />
                  <h2 className='text-sm md:text-lg '>Cash on Delivery  </h2>
                  </div>
                  <div className='flex gap-3 md:gap-7 cursor-pointer' onClick={(e)=>setpaymentMode('ONLINE')}>
                  <input type="radio"  name="payment" checked={paymentmode==='ONLINE'}  value={'ONLINE'} onClick={(e)=>setpaymentMode(e.target.value)} className=' rounded-full ' />
                  <h2 className='text-sm md:text-lg flex gap-1 md:gap-2 items-center '>UPI <Banknote/></h2>
                  </div>
                 
                 
               </div>
            </div>
            <div className='w-full  overflow-auto bg-white'>
              <div className='w-full p-2 md:p-3 bg-yellow-500'>
                <h2 className='text-sm md:text-xl font-extrabold text-white'>Order Summary</h2>
                </div>
              {Carts &&
              Carts.map((cart)=>{
             
                return <div key={cart.id} className='flex px-2 md:px-5 py-2 w-full border-b-1 shadow-lg border-gray-400' >
              <div className='flex flex-col w-[30%] items-center gap-2 md:gap-4 justify-center'>
                <img onClick={()=>navigate(`/detail/${cart.Product.id}`)} src={cart.Product.main_image} className='w-[8rem]  h-[6rem] md:w-[10rem] md:h-[7rem]' />
                
              </div>
                
                <div className='flex flex-col items-center gap-2 md:gap-5 justify-center w-[60%]'>
                    <h3 onClick={()=>navigate(`/detail/${cart.Product.id}`)} className='text-sm md:text-xl hover:text-blue-400 cursor-pointer'>{cart.Product.name}</h3>
                    <h2 className='flex text-xl items-center justify-center gap-1 md:gap-1'><IndianRupeeIcon className='w-5 h-12'/>{cart.quantity * cart.price}</h2>
                    <p className='text-green-600'>{cart.Product.discount} % off</p>
                </div>
                <div className='flex justify-center items-center w-[10%]'>
                    <Trash2 onClick={()=>{
                     
                      setCarts(prev=>prev.filter(val=>val.id!==cart.id))
                      }}  className='text-2xl  md:w-[20%] hover:text-red-900 h-[60%] md:h-[20%] text-red-600 '/>
                </div>

            </div>
          
              })
            //    :
            // <div className='w-full flex justify-center items-center'>
            //   <h4 className='text-2xl'> No Cart Items</h4>
            //   </div> 
            }
            
               
                
               
            </div>
        <div className='shadow-lg min-h-[25%] bg-white flex flex-col gap-1 md:gap-2 justify-center items-center py-3 md:py-8'>
                <button onClick={address&& handlePayment} className='bg-amber-400 cursor-pointer text-xs md:text-lg hover:bg-amber-500 w-[30%] py-1 px-2 md:h-[3rem] rounded-2xl shadow-lg' >Confirm Your Order</button>
          {warning && <p className='text-red-600'>{warning}</p>}
            </div>  

        </div>:
        <div className='bg-white min-h-[50%] h-[18rem]  rounded-md min-w-[70%] flex justify-center items-center'>
          <div className='flex justify-around  gap-4 items-center md:gap-5'>
          <h2 className='text-xs md:text-2xl text-blue-600'> No cartItems Found</h2>
          <button onClick={()=>navigate(`/signin`)} className='rounded-lg p-1 hover:bg-blue-200 md:p-3 border-1 border-blue-500 shadow-lg'>Login</button>
          </div>
          </div>
        }
     {
     !loading&& userInfo?  <div className='bg-white shadow-lg flex flex-col w-[100%] py-3 px-2  md:px-3 md:py-9 md:w-[20%] h-[80%] gap-1 md:gap-5 pt-1'>
          <div className='flex justify-around w-full p-1 md:p-2'>
            <h2 className='w-[40%] text-xs md:text-xl'>Total Price</h2>
            <p> - </p>
            <h2 className='text-sm md:text-xl font-extrabold flex justify-center items-center gap-0 md:gap-2'><IndianRupee className='h-4'/> {pricetotal}</h2>
            
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
   {
  successcheck && (
    <div className="absolute w-full h-[100vh] bg-[#2523239b] flex justify-center items-center 
                    animate-[fadeIn_0.3s_ease-in-out]">

      <div className="absolute w-[20rem] md:w-[40%] bg-white rounded-lg shadow-lg px-4 
                      h-[40%] md:h-[60%] 
                      animate-[slideUp_0.4s_ease-out]">

        <div className="w-full h-full">
          <div className="flex h-[80%] justify-center items-center flex-col gap-4">
            <h2 className="text-lg md:text-2xl font-extrabold">Successfully Ordered</h2>
            <TicketCheck className="text-green-600 w-12 h-12" />
          </div>

          <div className="h-[20%]">
            <button
              onClick={() => {
                setsucessCheck(false);
                navigate("/orders");
              }}
              className="w-full mt-4 p-2 md:p-3 md:text-lg bg-gray-200 hover:bg-gray-300 
                         rounded-lg shadow-lg"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

    
    </div>
    
  )
}

export default Checkout