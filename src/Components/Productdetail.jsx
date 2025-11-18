import React, { useEffect, useState } from 'react'
import ImageGallery from './ImageGallery'
import { BadgeIndianRupee, IndianRupee, ShoppingBagIcon, ShoppingBasket, ShoppingCart } from 'lucide-react'
import api from '../Redux/Interceptor'
import { OrderApi, productapi } from '../Redux/api'
import { useNavigate, useParams } from 'react-router'
import { addTocart } from '../Hooks/Addcart'
import { useAuth } from '../Redux/AuthProvider'
function Productdetail() {
  const navigate=useNavigate('')
  const [products,setProducts]=useState({})
  const {id}=useParams()
  const {userInfo}=useAuth()
const Addcart=async(cart)=>{
  console.log('dis-pric',(parseFloat(products.discount)*parseFloat(products.price))/100)
  const Cartdata={
    'user':parseInt( userInfo.userid),
    'items':[
     { 'Product_id':products.id,
      'quantity':1,
      'price':products.price,
      'total_price':products.price,
      
     'discount':(parseFloat(products.discount)*parseFloat(products.price))/100
    }
    ]

  }
  console.log(Cartdata)
  const res=await addTocart(Cartdata,'post',userInfo.userid)
  
 cart=='cart'?navigate('/cart'):navigate('/checkout?iscart=false')
}

const addOrdertemperory=async(product)=>{
  const discountval=parseFloat(product.price*product.discount)/100
  let ord= {
      
      "Product_id": product.id,
      "quantity": 1,
      "price": product.price,
      "total_price": product.price,
      "discount": discountval
    }
    const orderdata={
  "user": userInfo.userid,
  "total_amount": product.price,
  "total_discount": discountval,
  "payment_status": "Pending",
  "payment_method": 'DRAFT',
  "order_status": "DRAFT",
  "order_items": [ord],
  "payment": {
    "payment_id": "1012",
    "payment_status": "Pending",
    "payment_mode": 'DRAFT'
  }
}
  console.log(orderdata)
try{
  const response = await api.post(OrderApi,orderdata)

  const data = response.data
  console.log(data)
  navigate(`/checkout?iscart=false&product_id=${data.id}`)
}
catch (er){
  console.error(er)
}

}

  useEffect(()=>{
    const loadproducts=async()=>{
 try{
      const res=await api.get(`${productapi}?id=${id}`,{withCredentials:true})
      console.log(res.data)
      setProducts(res.data[0])
    }
    catch(er){
      console.error(er)
    }
    }
   loadproducts();
  },[])
  return (
    <div className='flex pb-[6rem] flex-col md:flex-row justify-around p-3 md:p-8 gap-3 w-[100%] md:gap-10 h-auto md:h-[100vh]'>
          <ImageGallery images={products.images} className='w-[100%] md:w-[62%]'/>
        <div className='flex flex-col justify-center mb-[2rem] w-[100%] md:w-[40%] gap-3 md:gap-10'>
          <h2 className=' font-bold text-[22px] md:text-4xl'> {products.name}</h2>
          <div className='w-80% border-1 border-gray-400 rounded-lg p-1 md:p-3'>
            <h2 className='my-1.5 md:my-5 font-extrabold text-lg'> Description</h2>
            <p className='text-xs md:text-lg' >{products.description}</p>
          </div>
          <h1 className='flex gap-0.5 md:gap-2.5 text-green-700'>{parseInt( products.discount)} % <p className='font-bold'>discount</p></h1>
<div className='w-full flex justify-center items-center'>


<button onClick={()=>Addcart('cart')} className='flex gap-1 text-xl text-white font-extrabold md:gap-4 bg-orange-600 items-center justify-center rounded-lg p-1 md:p-4 w-[50%] shadow-lg cursor-pointer transition-transform hover:scale-105'>Add to cart <ShoppingCart/></button>
</div>
    <h1 className='flex gap-0.5 md:gap-2.5 text-2xl  font-extrabold  justify-center items-center'><p className='font-extrabold'> <IndianRupee/> </p>{products.price} </h1>
       
      <div className='w-full flex justify-center items-center'>


<button onClick={()=>addOrdertemperory(products)} className='flex gap-1 md:gap-4 text-xl text-white font-extrabold bg-yellow-500 items-center justify-center rounded-lg p-1 md:p-4 w-[80%] shadow-lg cursor-pointer transition-transform hover:scale-105'>Buy Now <BadgeIndianRupee/></button>
</div> 
        </div>
    </div>
  )
}

export default Productdetail