import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { Heart, IndianRupee, ShoppingBag, ShoppingCart, Trash } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router'
import api from '../Redux/Interceptor.jsx'
import { categoryapi, productapi, whishlistApi } from '../Redux/api.jsx'
import { addTocart } from '../Hooks/Addcart.jsx'
import { useAuth } from '../Redux/AuthProvider.jsx'
import LoadingScreen from './LoadingPage.jsx'
import love from '../assets/love.png'
import lovefill from '../assets/lovefill.png'
function WishList() {
  const location=useLocation()
  const params=new URLSearchParams(location.search)
  const category=params.get('category')
  const search=params.get('search')
  const {userInfo}=useAuth()
  const [products,setproducts]=useState([])
  const [categorylist,setCategorylist]=useState([])
  const [categoryfilter,setcategoryfilter]=useState()
  const [sort,setSort]=useState('')
  const [loading,SetLoading]=useState(false)
  const navigate=useNavigate()
  useEffect(()=>{
   
    const Loadapi=async()=>{
 SetLoading(true)
      try{
        
       if(userInfo?.userid){
        const res=await api.get(`${whishlistApi}?user=${userInfo.userid}`)
        console.log(res.data)
        setproducts(res.data)
       }

      }
      catch(er){
console.error(er)
      }
      finally{
        SetLoading(false)
      }


    }
    Loadapi();

  },[userInfo?.userid])


const Addcart=async(products)=>{
  const Cartdata={
    'user':parseInt( userInfo.userid),
    'items':[
     { 'Product_id':products.Product.id,
      'quantity':1,
      'price':products.Product.price,
      'total_price':products.Product.price,
      'discount':(parseFloat(products.Product.discount)*parseFloat(products.Product.price))/100
    }
    ]

  }
  const res=await addTocart(Cartdata,'post',userInfo.userid)
  console.log(res)
 navigate('/cart')
}

  const removeWishlist=async(wishid)=>{
 try{
        const resdel=await api.delete(`${whishlistApi}${wishid}/`)
        console.log(resdel.status)
      }
    
    catch(er){
      console.error(er)
    }
  }

  return (
    <div className='w-full mx-0 my-1 md:mx-3.5 md:my-1 mt-[1rem]  '>

           

            
            <div className='my-2 md:mx-8 p-1 md:p-5 min-h-[95vh] rounded-sm bg-white'>
             {loading?
             <div className='h-[90vh]'><LoadingScreen /></div>: products.length>0? products.map((item)=>{
return <div key={item.id} className='border-b-2 p-1 md:p-5 min-h-[6rem] shadow-lg rounded-xl border-gray-300 flex-row flex justify-around'>

                    <div  className='flex w-[85%]  gap-2 md:gap-[9rem] px-2 md:px-[2rem] justify-center md:justify-around items-center'>
                        <img onClick={()=>navigate(`/detail/${item.Product.id}`)} src={item.Product.images[0].image} className='w-[35%] md:w-[10%]  h-fit cursor-pointer hover:scale-105 transition-transform '/>
                      <div className='flex flex-col justidy-start gap-1 w-[75%] md:gap-[2rem]'> 
                        <h2 onClick={()=>navigate(`/detail/${item.Product.id}`)}  className='hover:text-blue-400 text-sm md:text-xl cursor-pointer text-center font-medium'>{item.Product.name}</h2>
                        <p className='hidden md:block w-[100%] overflow-y-auto max-h-[3rem] md:max-h-fit text-xs md:text-base'>{item.Product.description}
                        </p>
                      </div> 
                    </div>
                    <div className='flex w-[45%] gap-2 md:gap-4 flex-col md:flex-row  justify-center items-center'>
                        <h2 className=' flex font-bold text-xs md:text-lg items-center'><IndianRupee className='h-[50%] md:h-full'/> {item.Product.price}</h2>
                        <p className='text-green-600 text-xs md:text-base font-medium'>{item.Product.discount}% off</p>
                      <div className='w-[25%] flex justify-center gap-2 md:gap-3 items-center'> 
                         <button onClick={()=>Addcart(item)} className='flex justify-center items-center text-[10px] gap-1 md:text-base cursor-pointer text-white font-semibold bg-gradient-to-r from-emerald-400 to-emerald-600 hover:scale-105 transition-transform p-1 md:p-2  rounded-xl  md:w-[90%] shadow-xl '>Add cart <ShoppingCart className='w-[20%] h-[20%] md:w-auto md:h-[100%]'/></button>
                    <Trash onClick={()=>{
                        removeWishlist(item.id);
                        setproducts(prev=>prev.filter((it)=>it.id!==item.id));
                        
                        }} className='cursor-pointer hover:text-red-500 h-[1rem] md:h-[4rem]'/>
                   </div>
                    </div>
                    


                </div>

             })
             :  <div className='flex justify-center items-center h-[30rem]'>
              <h3 className='text-6xl text-[#f4c4a4]' >Sorry ! No Wishlist Found</h3>
             </div>
             
             
             }   
               
               
              

            </div>
    </div>
  )
}

export default WishList