import React, { useContext, useEffect, useRef, useState } from 'react'
import demo from '../assets/demo.jpg'
import { ArrowBigLeft, ArrowRight, CpuIcon, IndianRupee, IndianRupeeIcon, Loader } from 'lucide-react'
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
    const [cartpopup,setcartpopup]=useState({})
    const {userInfo}=useAuth()
    const [next,setNext]=useState(null)
    const [prev,setPrev]=useState(null)
    const [cartstatus,setcartstatus]=useState(null)
    const scrollref=useRef(null)
    const [pagenum,setpagenum]=useState()
    const [count,setcount]=useState(0)
    const loadPage = async (pagenum) => {
   
     try {
    
      const productRes = await api.get(`${productapi}?page=${pagenum}`, { withCredentials: true });
      
      setProducts(productRes.data.results);
    
    setcount(productRes.data.count)
     
      if (userInfo?.userid) {
        const cartRes = await api.get(`${CartApi}?user=${userInfo.userid}`, { withCredentials: true });
        setcarts(cartRes.data[0]?.items || []);
      }

    } catch (err) {
      console.error(err);
    } finally {
 
   
        setFlash(false);
      
    }

 

    setLoading(false);
  };
 useEffect(() => {


  loadPage(1);

 
}, [userInfo?.userid,cartpopup]);


useEffect(()=>{
   if (products.length > 0 && carts.length > 0) {
    const q = {};

    products.forEach((product, index) => {
      const found = carts.find(cart => cart.Product.id === product.id);
      
      q[index] = found ? found?.quantity : 0;
    });
   
    setQuantityToCart(q);

  }
  if(pagenum){
  if((count/11)>1){
  if(products.length>0){
     scrollref.current?.scrollIntoView({behavior:'smooth'})
  }
}
  }
},[products,carts])
const Addcart=async(prod,type,index)=>{
  setcartpopup({...cartpopup,[index]:true})
  let addquantity=0
  if(type==='inc'){
    setcartstatus('adding to cart')
    addquantity=1

  }
  else{
    setcartstatus('removing from cart')
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
  
 if(quantityTocart[index]===1&&type==='dec'){
  const res=await addTocart(Cartdata,'delete',carts[index].id)
 }
 else{

  const res=await addTocart(Cartdata,'post',userInfo.userid)
   console.log(res)
 }
  setQuantityToCart(prev=>({
    ...prev,[index]:(prev[index]||0)+addquantity
   }))
  
  setcartpopup({...cartpopup,[index]:false})
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

const pages=[]
for(let i=1;i<=Math.ceil(count/12);i++){
  pages.push(i)
}

  return (
    <div className={`min-h-[12rem] md:min-h-[40rem] ${ali_type==='row'?'hidden md:block':''}`}>
      {loading?
      <div className='h-[30vh]'><LoadingScreen/></div>:
        products.length>0?<div ref={scrollref} className={`bg-white  my-2 ${ali_type==='row'?'hidden md:block':'mt-[3rem] md:mt-[8rem]'} `}>
       

      <div  className='flex items-center justify-between px-2 md:px-5 gap-2 md:gap-5 '> 
         <h1  className='text-lg md:text-3xl pt-2 md:pt-8 ml-4 md:ml-8 my-2 md:my-8 font-bold '>{Title}</h1>
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
        
          return <div key={product.id}  className={`flex outline-0 border-0 flex-nowrap max-h-[17rem]   gap-4 rounded-x w-[46%] ${ali_type==='row'?'md:min-w-[22rem] md:max-h-[30rem]': 'px-2 md:px-8 md:w-[28%] md:max-h-[30rem] lg:max-h-[40rem]  '}  m-1 rounded-xl shadow-2xl md:shadow-none justify-between p-2  items-center flex-col bg-gradient-to-r cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform`}>
          <img onClick={()=>navigate(`/detail/${product.id}`)} src={product.main_image} className='w-[10rem] lg:h-[70%] h-[50%] md:h-[50%] md:w-[25rem] '/>
         
<h2 onClick={()=>navigate(`/detail/${product.id}`)} className='text-orange-900 font-bold max-w-[100%] md:max-w-[100%] text-center break-words  text-[10px] truncate  md:text-xl  hover:text-black '>{product.name}</h2>
            
        {userInfo?.userid ? ali_type==='row'?'':<div className='flex w-full justify-center gap-2 md:gap-4'>
          <p onClick={()=>{console.log(quantityTocart[i]);
           quantityTocart[i]===0?'': Addcart(product,'dec',i)}} className='rounded-full  bg-white hover:bg-emerald-200   shadow-2xl   hover:border-cyan-600 w-[23%]  md:w-[12%]  cursor-pointer items-center border-1 border-gray-400 p-1 md:p-2 flex justify-center  shadow-gray-700'>-</p>
          <input type="number"  value={quantityTocart[i] || 0} className='bg-white w-[40%]  md:w-[30%] text-center border-1 border-gray-400 rounded-xl outline-none px-2 md:px-3 flex justify-center items-center'/>
           <p onClick={()=>Addcart(product,'inc',i)} className='rounded-full hover:border-cyan-700 bg-white hover:bg-emerald-200   shadow-2xl   w-[23%]  md:w-[12%]  cursor-pointer items-center border-1 border-gray-500 p-1 md:p-2 flex justify-center '>+</p>
        
       {cartpopup[i]&& <div className='absolute bg-[#1d1818c2] p-1 md:p-2 rounded-xl'>
          <button className='text-white flex'>{cartstatus}<Loader className='animate-spin'/> </button>
        </div>
        }
        </div>:''
        }  
         { <h3 onClick={()=>navigate(`/detail/${product.id}`)} className='bg-yellow-400 p-1 justify-center rounded-2xl w-[100%] text-[10px] md:text-lg font-medium flex gap-1 items-center'> from <IndianRupeeIcon className='w-2 h-2 md:w-5 md:h-5 font-extrabold'/> {product.price}</h3>
        }</div>
        })
        }
        

      
    
       



        </div>
      </div>:''}
       {
          ali_type!=='row'&& <div className='h-[2rem] md:h-[3rem] text-sm md:text-base rounded-lg w-full bg-white flex justify-center items-center gap-2 md:gap-4 my-4'>
          {
            pages.map((pg)=>{
              return <button key={pg} onClick={()=>{
                setpagenum(pg)
                  loadPage(pg)
                
              }} className={` hover:bg-emerald-600 text-white font-bold rounded-full p-1 md:px-3 md:p-2 ${!pagenum?pg===1?'bg-gray-400':'bg-emerald-400':''} ${pagenum===pg?'bg-gray-400':'bg-emerald-400'} `}>{pg}</button>
            })  
          }

        </div>
}

    </div>
  )
}

export default Rowitems