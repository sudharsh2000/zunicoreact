import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { Heart, IndianRupee, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router'
import api from '../Redux/Interceptor.jsx'
import { categoryapi, productapi } from '../Redux/api.jsx'
import { addTocart } from '../Hooks/Addcart.jsx'
import { useAuth } from '../Redux/AuthProvider.jsx'
import LoadingScreen from './LoadingPage.jsx'
import love from '../assets/love.png'
import lovefill from '../assets/lovefill.png'
function Productlist() {
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
       setcategoryfilter(category)
      try{
        let val=''
        if(category){
        val=`?category=${category}&ordering=${sort}`
        }
        if(search){
          val=`?search=${search}&ordering=${sort}`
        }
        SetLoading(true)
        const res=await api.get(`${productapi}${val}`)
        console.log(res.data)
        setproducts(res.data.results)
        const rescateg=await api.get(`${categoryapi}`,{withCredentials:true})
        setCategorylist(rescateg.data)
        SetLoading(false)

      }
      catch(er){
console.error(er)
      }

    }
    Loadapi();

  },[category,categoryfilter, search,sort])


const Addcart=async(products)=>{
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
  const res=await addTocart(Cartdata,'post',userInfo.userid)
  console.log(res)
 navigate('/cart')
}



  return (
    <div className='w-full mx-0 my-1 md:mx-3.5 md:my-1 '>

            <div className='flex gap-0 md:gap-[3rem]  md:my-[1rem] md:items-center py-1 md:px-[1rem] flex-between md:justify-start justify-center md:mx-8 rounded-sm shadow-lg bg-white'>
                <div className='flex w-[50%] md:w-[30%] row gap-1 md:gap-4 justify-center items-center rounded-lg'>
                    <h2 className='font-extrabold text-xs md:text-lg'>Sort by</h2>
                    <select value={sort} onChange={(s)=>setSort(s.target.value)} className='border-1 max-w-[70%] md:w-[100%] border-gray-100 text-xs md:text-lg shadow-lg p-1 md:p-4 rounded-lg'>
                        <option  value={''}>Popularity</option>
                        <option value={'price'}>Price Low to high</option>
                        <option value={'-price'}>Price High to Low</option>
                        <option value={'updated_at'}>Newest First</option>
                    </select>
                    
                </div>
                <div className='flex w-[60%] md:w-[30%] row gap-1 md:gap-4 p-1 md:p-4 justify-center items-center rounded-lg'>
                    <h2 className='font-extrabold text-xs md:text-lg'>Categories</h2>
                     <select value={categoryfilter} onChange={(e)=>{
                      console.log(e.target.value)
                      navigate(`/list?category=${e.target.value}`)}} className='border-1 w-[70%] md:w-[100%] text-xs md:text-lg border-gray-100 shadow-lg p-1 md:p-4 rounded-lg'>
                       <option value={''}>--All--</option>
                        {categorylist&& categorylist.map((categ)=>{
                        return <option key={categ.id} value={categ.id}>{categ.name}</option>
                       
                        })}
                        
                        
                    </select>
                    
                </div>

            </div>
            <div className='my-2 md:mx-8 p-1 md:p-5 min-h-[95vh] w-[100%] md:w-auto rounded-sm flex flex-wrap justify-start items-start flex-row md:flex-col bg-white'>
             {loading?
             <div className='h-[90vh]'><LoadingScreen /></div>: products.length>0? products.map((item)=>{
return <div  key={item.id} className='border-1 md:border-y-2 w-[50%] h-[18rem] md:h-auto md:w-[100%]  p-1 md:p-5 min-h-[9rem] border-gray-300 flex-col md:flex-row flex justify-center md:justify-around'>

                    <div  className='flex w-[100%] md:w-[70%] flex-col md:flex-row gap-2 md:gap-[9rem] px-2 md:px-[2rem] justify-center md:justify-around items-center'>
                        <img onClick={()=>navigate(`/detail/${item.id}`)} src={item.images[0].image} className='w-[100%] md:w-[15%] h-[5rem] md:h-[10rem] cursor-pointer hover:scale-105 transition-transform '/>
                      <div className='flex flex-col justidy-start gap-1 w-[75%] md:gap-[2rem]'> 
                        <h2 onClick={()=>navigate(`/detail/${item.id}`)}  className='hover:text-blue-400 text-xs break-words truncate md:text-2xl w-[100%] cursor-pointer text-center font-semibold'>{item.name}</h2>
                        <p className='hidden md:block w-[100%] break-words line-clamp-3 truncate overflow-y-auto max-h-[3rem] md:max-h-fit text-xs md:text-lg'>{item.description}
                        </p>
                      </div> 
                    </div>
                    <div className='flex w-[100%] md:w-[30%] gap-2 flex-col md:flex-row md:gap-4 justify-center items-center'>
                        <h2 className=' flex font-bold text-xs md:text-lg items-center'><IndianRupee className='w-[20%] h-[50%] md:h-full'/> {item.price}</h2>
                        <p className='text-green-400 text-xs md:text-lg font-bold'>{item.discount}% off</p>
                      <div className='w-auto flex justify-center gap-1 md:gap-4 items-center'> 
                         <button onClick={()=>Addcart(item)} className='flex justify-center items-center text-[10px] gap-1 md:text-lg cursor-pointer text-white font-extrabold bg-gradient-to-r from-emerald-400 to-emerald-600 hover:scale-105 transition-transform p-1 md:p-3  rounded-xl  md:w-[100%] shadow-xl '>Add cart <ShoppingCart className='w-[20%] h-[20%] md:w-auto md:h-[100%]'/></button>
                   
                   </div>
                    </div>
                    


                </div>

             })
             :  <div className='flex justify-center h-[30rem] items-center'>
              <h3 className='text-lg md:text-6xl font-sans text-[#f0c399]' >Sorry ! No matching Found.</h3>
             </div>
             
             
             }   
               
               
              

            </div>
    </div>
  )
}

export default Productlist