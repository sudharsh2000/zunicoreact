import React, { useEffect, useState } from 'react'
import demo from '../assets/demo.jpg'
import { IndianRupee, ShoppingBag, ShoppingCart } from 'lucide-react'
import { useLocation, useNavigate, useParams } from 'react-router'
import api from '../Redux/Interceptor.jsx'
import { categoryapi, productapi } from '../Redux/api.jsx'
import { addTocart } from '../Hooks/Addcart.jsx'
import { useAuth } from '../Redux/AuthProvider.jsx'
import LoadingScreen from './LoadingPage.jsx'
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
        val=`?category=${categoryfilter}&ordering=${sort}`
        }
        if(search){
          val=`?search=${search}&ordering=${sort}`
        }
        SetLoading(true)
        const res=await api.get(`${productapi}${val}`)
        console.log(res.data)
        setproducts(res.data)
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
    <div className='mx-0 my-1 md:x-3.5 md:my-1 '>

            <div className='flex gap-2 md:gap-[3rem]  md:my-[1rem] md: items-center p-1 md:px-[1rem] flex-between mx-1 md:mx-8 rounded-sm shadow-lg bg-white'>
                <div className='flex  row gap-1 md:gap-4 justify-center items-center rounded-lg'>
                    <h2 className='font-extrabold text-xs md:text-lg'>Sort by</h2>
                    <select value={sort} onChange={(s)=>setSort(s.target.value)} className='border-1 border-gray-100 text-xs md:text-lg shadow-lg p-1 md:p-4 rounded-lg'>
                        <option value={''}>Popularity</option>
                        <option value={'price'}>Price Low to high</option>
                        <option value={'-price'}>Price High to Low</option>
                        <option value={'updated_at'}>Newest First</option>
                    </select>
                    
                </div>
                <div className='flex row gap-1 md:gap-4 p-1 md:p-4 justify-center items-center rounded-lg'>
                    <h2 className='font-extrabold text-xs md:text-lg'>Categories</h2>
                     <select value={categoryfilter} onChange={(e)=>{
                      console.log(e.target.value)
                      navigate(`/list?category=${e.target.value}`)}} className='border-1 text-xs md:text-lg border-gray-100 shadow-lg p-1 md:p-4 rounded-lg'>
                       <option value={0}>--Select--</option>
                        {categorylist&& categorylist.map((categ)=>{
                        return <option value={categ.id}>{categ.name}</option>
                       
                        })}
                        
                        
                    </select>
                    
                </div>

            </div>
            <div className='my-2 md:mx-8 p-1 md:p-5 min-h-[75vh] rounded-sm bg-white'>
             {loading?
             <div className='h-[70vh]'><LoadingScreen /></div>: products? products.map((item)=>{
return <div onClick={()=>navigate(`/detail/${item.id}`)} key={item.id} className='border-y-2 p-1 md:p-5 min-h-[9rem] border-gray-300 flex-row flex justify-around'>

                    <div  className='flex w-[85%]  gap-2 md:gap-[9rem] px-2 md:px-[2rem] justify-center md:justify-around items-center'>
                        <img onClick={()=>navigate(`/detail/${item.id}`)} src={item.images[0].image} className='w-[35%] md:w-[25%] h-fit cursor-pointer hover:scale-105 transition-transform '/>
                      <div className='flex flex-col justidy-start gap-1 md:gap-[2rem]'> 
                        <h2 onClick={()=>navigate(`/detail/${item.id}`)}  className='hover:text-blue-400 text-sm md:text-2xl cursor-pointer text-center font-extrabold'>{item.name}</h2>
                        <p className='w-[100%] overflow-y-auto max-h-[3rem] md:max-h-fit text-xs md:text-lg'>{item.description}
                        </p>
                        </div> 
                    </div>
                    <div className='flex w-[35%] gap-3 flex-col md:gap-9 justify-center items-center'>
                        <h2 className=' flex font-bold text-xs md:text-lg items-center'><IndianRupee className='h-[50%] md:h-full'/> {item.price}</h2>
                        <p className='text-green-400 text-xs md:text-lg font-bold'>{item.discount}% off</p>
                      <div className='w-full flex justify-center items-center'> 
                         <button onClick={()=>Addcart(item)} className='flex justify-center text-xs gap-1 md:text-lg cursor-pointer text-white font-extrabold bg-orange-700 hover:scale-105 transition-transform p-1 md:p-4  rounded-xl w-[96%] md:w-[50%] shadow-xl '>Addto cart <ShoppingCart/></button>
                   </div>
                    </div>
                    


                </div>

             })
             :  <div className='flex justify-center h-[30rem]'>
              <h3 className='text-6xl' >No Items Found</h3>
             </div>
             
             
             }   
               
               
              

            </div>
    </div>
  )
}

export default Productlist