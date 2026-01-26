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
import UseDebounce from '../Hooks/UseDebounce'


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
    const [isCartProcessing, setIsCartProcessing] = useState(false);
    const [isqtyprocessing, setIsQtyProcessing] = useState(true);   // LOCK state
  const loadPage = async (pagenum) => {
  try {
    const [productRes, cartRes] = await Promise.all([
      ali_type==='row'?api.get(`${productapi}?ordering=price`):api.get(`${productapi}?page=${pagenum}`),
      userInfo?.userid
        ? api.get(`${CartApi}?user=${userInfo.userid}`)
        : Promise.resolve({ data: [] })
    ]);
    console.log(productRes.data)
   ali_type==='row'?setProducts(productRes.data): setProducts(productRes.data.results);
    setcount(productRes.data.count);
    setcarts(cartRes.data[0]?.items || []);

  } catch (err) {
    console.error(err);
  } finally {
    setFlash(false);
    setLoading(false);
  }
};

 useEffect(() => {


  loadPage(1);

 
}, [userInfo?.userid]);


useEffect(() => {
  const q = {};

  products.forEach((product, index) => {
    const found = carts.find(cart => cart.Product.id === product.id);
    q[index] = found ? found.quantity : 0;
  });

  setQuantityToCart(q);

  if(pagenum){
  if((count/11)>1){
  if(products.length>0){
     scrollref.current?.scrollIntoView({behavior:'smooth'})
  }
}
  }
  setIsQtyProcessing(false);
},[products,carts])


const Addcart = async (prod, type, index) => {

  // 🔒 BLOCK if another popup is running
  if (isCartProcessing) return;

  setIsCartProcessing(true);   // LOCK
  setcartpopup(prev => ({ ...prev, [index]: true }));

  let addquantity = type === 'inc' ? 1 : -1;
  setcartstatus(type === 'inc' ? 'adding to cart' : 'removing from cart');

  const Cartdata = {
    user: Number(userInfo.userid),
    items: [{
      Product_id: prod.id,
      quantity: addquantity,
      price: prod.price,
      total_price: prod.price,
      discount: (prod.discount * prod.price) / 100
    }]
  };

  try {

    if (quantityTocart[index] === 1 && type === 'dec') {
      const item = carts.find(c => c.Product.id === prod.id);
      if (item) {
        await addTocart(Cartdata, 'delete', item.id);
      }
    } else {
      await addTocart(Cartdata, 'post', userInfo.userid);
    }

    setQuantityToCart(prev => ({
      ...prev,
      [index]: (prev[index] || 0) + addquantity
    }));

  } catch (er) {
    console.error(er);
  } finally {

    // ⏳ let popup stay for UX
    setTimeout(() => {
      setcartpopup(prev => ({ ...prev, [index]: false }));
      setIsCartProcessing(false); // 🔓 UNLOCK
    }, 700); // popup duration
  }
};

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
        products.length>0?<div ref={scrollref} className={`bg-white  my-2 ${ali_type==='row'?'hidden md:block':'mt-[1rem] md:mt-[4rem]'} `}>
       

      <div  className='flex items-center justify-between px-2 md:px-8 gap-2 md:gap-5 '> 
         <h1  className='text-lg md:text-3xl pt-2 md:pt-8 ml-4 md:ml-8 my-2 md:my-8 font-bold '>{Title}</h1>
         <p onClick={()=>navigate(`/list?search=`)} className='text-blue-700 cursor-pointer hover:text-blue-300 flex text-sm md:text-lg'>View More </p>
      
      </div>
     {/* {ali_type==='row'&&
     <button onClick={()=>scrollfn('left')}  className=' hidden md:block absolute    bg-[#ffff]  left-[1rem] md:left-[3.5rem] w-[1.6rem] h-[2rem] md:w-[2rem] md:h-[6rem] rounded-lg z-index:10 hover:bg-emerald-100 hover:scale-125 duration-300 transform-3d  transition-transform  shadow-2xl'>&#9664;</button>
       }
        {
          ali_type==='row'&&
          <button onClick={()=>scrollfn('right')}  className='hidden md:block  bg-[#ffff] absolute right-[1rem] md:right-[3.5rem]  w-[1.6rem] h-[2rem] md:w-[2rem] md:h-[6rem] rounded-lg z-index:10 hover:bg-emerald-100 hover:scale-125 duration-300 transform-3d  transition-transform  shadow-2xl'>&#9654;</button>
} */}
        <div ref={ref} className={`flex w-[100%]    ${ali_type==='row'?' ':'py-4 md:py-[2rem] justify-center items-center '}  `}>
    <div className={`flex mx-0  ${ali_type==='row'?' overflow-x-auto py-[2rem] md:mx-[3rem] md:gap-[3.5rem] md:flex-nowrap ':'flex  md:gap-[2%] w-[100%] md:w-[95%] items-start  justify-start md:justify-start  flex-wrap'}`}>
    
        {!isqtyprocessing&& products &&
        products.map((product,i)=>{
        
          return <div key={product.id}  className={`flex bg-white md:bg-white mt-2 outline-0 border-0 flex-nowrap max-h-[19rem]   gap-4 rounded-md md:rounded-lg w-[50%] ${ali_type==='row'?'md:min-w-[22rem] md:max-h-[30rem]': 'px-2 md:ml-[2%] md:p-8 md:w-[30%] md:max-h-[30rem] lg:max-h-[40rem] hover:border-1 border-gray-200 '}  m-0  shadow-2xl md:shadow-none justify-between p-2  items-center flex-col bg-gradient-to-r cursor-pointer hover:shadow-2xl hover:scale-105 transition-transform`}>
          <img onClick={()=>navigate(`/detail/${product.id}`)} src={product.main_image} className='w-[10rem] lg:h-[18rem] h-[10rem] md:h-[15rem] md:w-[25rem] rounded-lg'/>
         {cartpopup[i]&& <div className='absolute bg-[#1d1818c2] self-center md:top-[30%] p-1 md:p-2 rounded-xl'>
          <button className='text-white flex  text-xs md:text-base flex-col justify-center items-center'><Loader className='animate-spin w-[100%] h-[100%]'/> {cartstatus}</button>
        </div>
        }
<h2 onClick={()=>navigate(`/detail/${product.id}`)} className='text-orange-900 font-bold max-w-[100%] md:max-w-[100%] text-center break-words  text-[10px] truncate  md:text-lg  hover:text-black '>{product.name}</h2>
            
        {userInfo?.userid ? ali_type==='row'?'':<div className='flex w-full justify-center gap-2 md:gap-4'>
          <p onClick={()=>{console.log(quantityTocart[i]);
           quantityTocart[i]===0?'': Addcart(product,'dec',i)}} className='rounded-full  bg-white hover:bg-emerald-200   shadow-2xl   hover:border-cyan-600 w-[23%]  md:w-[12%]  cursor-pointer items-center border-1 border-gray-400 p-1 md:p-2 flex justify-center  shadow-gray-700'>-</p>
          <input type="number"  value={quantityTocart[i] || 0} className='bg-white w-[40%]  md:w-[30%] text-center border-1 border-gray-400 rounded-xl outline-none px-2 md:px-3 flex justify-center items-center'/>
           <p onClick={()=>Addcart(product,'inc',i)} className='rounded-full hover:border-cyan-700 bg-white hover:bg-emerald-200   shadow-2xl   w-[23%]  md:w-[12%]  cursor-pointer items-center border-1 border-gray-500 p-1 md:p-2 flex justify-center '>+</p>
        
       
        </div>:''
        }  
         { <h3 onClick={()=>navigate(`/detail/${product.id}`)} className='bg-yellow-400 p-1 justify-center rounded-2xl w-[100%] text-[10px] md:text-lg font-medium flex gap-1 items-center'> from <IndianRupeeIcon className='w-2 h-2 md:w-5 md:h-5 font-extrabold'/> {product.price}</h3>
        }</div>
        })
        }
        

      
    
       


</div>
        </div>
      </div>:''}
       {console.log(Math.ceil(count/12))}
          {ali_type!=='row'&&Math.ceil(count/12)>1&& <div className='h-[2rem] md:h-[3rem] text-sm md:text-base rounded-lg py-2 w-full bg-white flex justify-center items-center gap-2 md:gap-4 my-4'>
          {
       pages.map((pg)=>{
              return <button key={pg} onClick={pagenum===pg?'':()=>{
                setpagenum(pg)
                  loadPage(pg)
                
              }} className={` hover:bg-emerald-600 text-white font-bold rounded-full  py-1 px-2 md:px-3 md:p-2 ${!pagenum?pg===1?'bg-gray-400':'bg-emerald-400':''} ${pagenum===pg?'bg-gray-400':'bg-emerald-400'} `}>{pg}</button>
            })  
          }

        </div>
}

    </div>
  )
}

export default Rowitems