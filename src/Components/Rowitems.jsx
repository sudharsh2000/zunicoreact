import React, { useContext, useEffect, useRef, useState } from 'react'
import demo from '../assets/demo.jpg'
import { ArrowBigLeft, ArrowRight, CpuIcon, IndianRupee, IndianRupeeIcon } from 'lucide-react'
import api from '../Redux/Interceptor'
import { CartApi, productapi } from '../Redux/api'
import { useNavigate } from 'react-router'
import LoadingScreen from './LoadingPage'
import { Flashcontext } from '../App'
import { useAuth } from '../Redux/AuthProvider'
import { addTocart } from '../Hooks/Addcart'


function Rowitems({ali_type,Title}) {
    const ref=useRef(null)
    const[products,setProducts]=useState([])
    const navigate=useNavigate()
    const [loading,setLoading]=useState(false)
    const {setFlash}=useContext(Flashcontext)
    const [quantity,setquantity]=useState()
    const [carts,setcarts]=useState([])
    const [quantityTocart,setQuantityToCart]=useState({})
    const {userInfo}=useAuth()
  useEffect(() => {
  let active = true;
setFlash(true);
  const LoadProducts = async () => {
    try {
      
      const res = await api.get(productapi, { withCredentials: true });
      if (active) {
        setProducts(res.data);
      }
    }
    catch(er){
      console.error(er)
    } finally {
      if (active) setFlash(false);
    }
  };

const LoadCart=async()=>{
 try {
      
      const res = await api.get(`${CartApi}?user=${userInfo.userid}`, { withCredentials: true });

      
      
        setcarts(res?.data[0]?.items);
      
    } 
    catch(er){
      console.error(er)
    }
};
if(userInfo)
{
  LoadCart();
  LoadProducts();

 
}

  return () => {
    active = false;
  };
}, [userInfo?.userid]);

useEffect(()=>{
   if (products.length > 0 && carts.length > 0) {
    const q = {};

    products.forEach((product, index) => {
      const found = carts.find(cart => cart.Product.id === product.id);
      
      q[index] = found ? found?.quantity : 0;
    });
   
    setQuantityToCart(q);
  }
},[products,carts])
const Addcart=async(prod,type,index)=>{
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
     { 'Product_id':prod.id,
      'quantity':addquantity,
      'price':prod.price,
      'total_price':prod.price,
      
     'discount':(parseFloat(prod.discount)*parseFloat(prod.price))/100
    }
    ]

  }
  console.log(Cartdata)
  try{
 
  const res=await addTocart(Cartdata,'post',userInfo.userid)
   console.log(res)
  setQuantityToCart(prev=>({
    ...prev,[index]:(prev[index]||0)+addquantity
   }))
  
  
  }
  
  catch(er){
    console.error(er)
  }

}
    const scrollfn=(dir)=>{
        
        const curwidth=ref.current
        if(dir==='right'){
        curwidth.scrollBy({left:300,behavior:'smooth'})
        }
        if(dir==='left'){
           curwidth.scrollBy({left:-300,behavior:'smooth'}) 
        }
    }
  return (
    <div className={`min-h-[12rem] md:min-h-[40rem] ${ali_type==='row'?'hidden md:block':''}`}>
      {loading?
      <div className='h-[30vh]'><LoadingScreen/></div>:
        products.length>0?<div className={`bg-white  my-2 ${ali_type==='row'?'hidden md:block':'mt-[3rem] md:mt-[8rem]'} `}>
      <div className='flex items-center justify-between px-2 md:px-5 gap-2 md:gap-5 '> 
         <h1 className='text-lg md:text-3xl pt-2 md:pt-8 ml-4 md:ml-8 my-2 md:my-8 font-bold overflow-auto'>{Title}</h1>
         <p onClick={()=>navigate(`/list?search=`)} className='text-blue-700 cursor-pointer hover:text-blue-300 flex text-sm md:text-lg'>View More </p>
      
      </div>
     {ali_type==='row'&&
     <button onClick={()=>scrollfn('left')}  className=' hidden md:block absolute    bg-[#ffff]  left-[1rem] md:left-[3.5rem] w-[1.6rem] h-[2rem] md:w-[2rem] md:h-[6rem] rounded-lg z-index:10 hover:bg-emerald-100 hover:scale-125 duration-300 transform-3d  transition-transform  shadow-2xl'>&#9664;</button>
       }
        {
          ali_type==='row'&&
          <button onClick={()=>scrollfn('right')}  className='hidden md:block  bg-[#ffff] absolute right-[1rem] md:right-[3.5rem]  w-[1.6rem] h-[2rem] md:w-[2rem] md:h-[6rem] rounded-lg z-index:10 hover:bg-emerald-100 hover:scale-125 duration-300 transform-3d  transition-transform  shadow-2xl'>&#9654;</button>
}
        <div ref={ref} className={`flex    md:mr-[3rem] md:ml-[4rem] p-2 md:p-4 gap-[.5rem] flex-wrap ${ali_type==='row'?'overflow-x-auto md:gap-[6.5rem] md:flex-nowrap ':'md:flex-wrap md:gap-[4.5rem]'}  flex-1 whitespace-nowrap no-scrollbar`}>
    
    
        {products &&
        products.map((product,i)=>{
        
          return <div key={product.id}  className={`flex flex-nowrap border-1 gap-4 rounded-x w-[46%] ${ali_type==='row'?'md:min-w-[22rem]':'md:w-[28%] '}  m-1 rounded-lg justify-between p-2  items-center-safe flex-col bg-gradient-to-r from-emerald-100 to-emerald-600 cursor-pointer hover:scale-105 transition-transform`}>
          <img onClick={()=>navigate(`/detail/${product.id}`)} src={product.main_image} className='w-[10rem] h-[50%] md:h-[70%] md:w-[25rem] '/>
         
<h2 onClick={()=>navigate(`/detail/${product.id}`)} className='text-orange-900 font-bold max-w-[100%] md:max-w-[100%] text-center break-words whitespace-normal text-xs md:text-xl  hover:text-black '>{product.name}</h2>
            
        {userInfo?.userid ? ali_type==='row'?'':<div className='flex w-full justify-center gap-2 md:gap-4'>
          <p onClick={()=>{
           quantityTocart[i]!==1? Addcart(product,'dec',i):''}} className='rounded-full hover:border-cyan-600 w-[23%]  md:w-[10%] cursor-pointer items-center border-1 border-gray-500 p-1 md:p-2 flex justify-center  shadow-gray-500'>-</p>
          <input type="number"  value={quantityTocart[i] || 0} className='bg-white w-[40%]  md:w-[30%] text-center rounded-xl outline-none px-2 md:px-3 flex justify-center items-center'/>
           <p onClick={()=>Addcart(product,'inc',i)} className='rounded-full hover:border-cyan-700  w-[23%]  md:w-[10%]  cursor-pointer items-center border-1 border-gray-500 p-1 md:p-2 flex justify-center '>+</p>
        </div>:''
        }  
          <h3 onClick={()=>navigate(`/detail/${product.id}`)} className='bg-yellow-500 p-1 justify-center rounded-lg w-[100%] text-[10px] md:text-lg font-medium flex gap-1 items-center'> from <IndianRupeeIcon className='w-2 h-2 md:w-5 md:h-5'/> {product.price}</h3>
        </div>
        })
        }
        

      
    
       



        </div>
      </div>:''}
    </div>
  )
}

export default Rowitems