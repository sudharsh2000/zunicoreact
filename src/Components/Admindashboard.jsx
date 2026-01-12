import React, { useEffect, useState } from 'react'
import FileUploader from './FileUploader'
import axios from 'axios'
import { bannerapi, categoryapi, notificationApi, OrderApi, productapi, usersapi } from '../Redux/api'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersave } from '../Redux/UserSlice'
import api from '../Redux/Interceptor'
import { Loader2, Loader2Icon, LoaderCircle, LoaderPinwheel, Pen, Plus, Trash, UploadCloud, User2, User2Icon, UserCircle } from 'lucide-react'
import { useAuth } from '../Redux/AuthProvider'
import { toast } from 'react-toastify'
import AdminProfile from './AdminProfile'
import AddBanner from './AddBanner'
import AddProducts from './AddProducts'
import AddProductCategory from './AddProductCategory'
import { useNavigate } from 'react-router'
import OrderDetails from './OrderDetails'
function Admindashboard() {
    const navigate=useNavigate()
    const [loading,setloading]=useState(false)
    const   [edititem,setedititem]=useState()
    const { userInfo } = useAuth()
    const [additem,setAdditem]=useState(false)
    const urlvalue=new URLSearchParams(location.search)
    const tab=urlvalue.get('tab')
    const[orderstatus,setOrderstatus]=useState('Confirmed')
    const [categoryItems, SetCategoryitems] = useState([])
    
    const [window, setwindow] = useState(tab || 'profile')
    const [category, setcategory] = useState({
        name: '',
        image: ''
    })
    


    const [errors, setErrors] = useState({
        name: '',
        price: '',

    })

    const [banner, Setbanner] = useState()
  
    const [profile, setProfile] = useState({})

    

    

    

    const [itemlist,setlist]=useState()
const addnotification=async(userid,message)=>{
    try{
        const res=await api.post(`${notificationApi}`,{
            'user_id':userid,
            'title':'Order Update', 
            'message':message,
            'is_read':false
        })
        console.log(res.data)
    }
    catch(er){
        console.log(er)
    }
}
    // Functions Start from here
const ConfirmOrder=async(orderid,nowstatus,userid)=>{
    try{
        const res=await api.patch(`${OrderApi}${orderid}/`,{
            'order_status':nowstatus
        })
        console.log(res.data)
        addnotification(userid,`Your order with Order ID:${res.data.id} has been ${nowstatus}.`)
      
        toast.success(`Order ${nowstatus} Successfully`)
    }
    catch(er){
        console.log(er)
    }
}
const changeorder=async(userid,orderid,newstatus)=>{  

    try{
        const res=await api.patch(`${OrderApi}${orderid}/`,{
            'order_status':newstatus
        })
        console.log(res.data)
        addnotification(userid,`Your order with Order ID:${res.data.id} has been ${newstatus}.`)
        toast.success('Order Status Updated Successfully')
        setlist(prev=>prev.map((it)=>{
            if(it.id===orderid){
                return {...it,order_status:newstatus}
            }
            return it
        }))
    }
    catch(er){
        console.error(er)
    }
 }

    useEffect(() => {
        
        const loadapi = async () => {
            try {
                
if(userInfo?.userid) {
            
                if (window === 'products') {
                    const res = await api.get(productapi, {}, { withCredentials: true })
                    setlist(res.data.results)
                 }
                if (window === 'profile') {
                    if (userInfo) {
                   
                        const res = await api.get(`${usersapi}?id=${userInfo.userid}`)
                        
                        setProfile(res.data[0])
                    }

                }
                if(window==='banners'){
                    const res = await api.get(`${bannerapi}`)
                       
                        setlist(res.data)
                }
                if(window==='categories'){
                    const res = await api.get(`${categoryapi}`)
                       
                        setlist(res.data)
                }
                if(window==='pend-orders'){
                    
                        const res = await api.get(`${OrderApi}?order_status=Processing`,{withCredentials:true})
                       console.log(res.data)
                        setlist(res.data)
                        }
                if(window==='orders'){
                    
                        const res = await api.get(`${OrderApi}?order_status!=Pending&order_status!=Cancelled`,{withCredentials:true})
                       console.log(res.data)
                       setlist(res.data)
                        res.data.forEach((it)=>{
                                console.log(it.order_status)
                                setOrderstatus([...orderstatus,it.order_status])
                        })
                        }
                    if(window==='cancel-orders'){
                    
                        const res = await api.get(`${OrderApi}?order_status=Cancelled`,{withCredentials:true})
                       console.log(res.data)
                        setlist(res.data)
                        }
                }

            }
            catch (er) {
                console.error('something is missing')
            }

        }
        loadapi();
    }, [window, userInfo?.userid,additem]);

   
    


 


  

   const deleteAll=(deleteid)=>{
    try{

     window==='banners'? api.delete(`${bannerapi}${deleteid}/`):window==='categories'? api.delete(`${categoryapi}${deleteid}/`):window==='products'? api.delete(`${productapi}${deleteid}/`):null;
   
    }
    catch(er){
        console.error(er)
    }

   }
   


    return (
        <div className=' w-full flex-col md:flex-row flex justify-center items-center'>
            <div className=' hidden md:block h-[90vh] mt-[1rem] bg-white absolute left-[.5rem] md:left-[1rem] top-[5rem] md:top-[5rem] shadow-lg   w-[10%] md:w-[18rem] rounded-2xl'>
                <ul className=' mt-[.5rem] md:mt-[2rem] gap-[.5rem] md:gap-[2rem] flex justify-center items-center flex-col'>
                    <li onClick={() => {
                        setwindow('profile')
                     navigate('/admin/dashboard?tab=profile');}} className={
                        ` ${window === 'profile' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer  px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105 `}> My Profile</li>
                    <li onClick={() =>{
                        setwindow('banners') ;
                         navigate('/admin/dashboard?tab=banners')}} className={
                        ` ${window === 'banners' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg hover:border-1 rounded-lg transition-transform hover:scale-105
            `}> Banners</li>
                    <li onClick={() =>{
                        setwindow('categories'); navigate('/admin/dashboard?tab=categories')}} className={`
        ${window === 'categories' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Product Category</li>
     <li onClick={() =>{setwindow('products'); navigate('/admin/dashboard?tab=products')}} className={`
        ${window === 'products' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Products</li>
<li onClick={() =>{
    setwindow('orders'); 
    navigate('/admin/dashboard?tab=orders')}} className={`
        ${window === 'pend-orders' || window === 'orders'||window === 'cancel-orders'? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}> Orders</li>


                </ul>

            </div>


            <div className='flex bg-white md:hidden min-h-[2.5rem] justify-center my-[.5rem] p-2 rounded-xl shadow-xl w-[98%]'>
                <ul className='  md:mt-[2rem] gap-[.5rem] md:gap-[2rem] flex justify-between items-center flex-row'>
                    <li onClick={() => {
                        setwindow('profile')
                     navigate('/admin/dashboard?tab=profile');}} className={
                        ` ${window === 'profile' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer text-[11px] py-2 px-2   md:w-[100%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105 `}> My Profile</li>
                    <li onClick={() =>{
                        setwindow('banners') ;
                         navigate('/admin/dashboard?tab=banners')}} className={
                        ` ${window === 'banners' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer text-[11px] py-2 px-2  md:w-[80%] border-gray-200 shadow-lg hover:border-1 rounded-lg transition-transform hover:scale-105
            `}> Banners</li>
                    <li onClick={() =>{
                        setwindow('categories'); navigate('/admin/dashboard?tab=categories')}} className={`
        ${window === 'categories' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer  text-[11px]  md:w-[80%] py-2 px-2  border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Product Category</li>

                    <li onClick={() =>{
                        setwindow('products'); navigate('/admin/dashboard?tab=products')}} className={`
        ${window === 'products' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer text-[11px]  md:w-[80%] py-2 px-2  border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Products</li>
  <li onClick={() =>{setwindow('orders'); navigate('/admin/dashboard?tab=orders')}} className={`
        ${window === 'pend-orders' || window === 'orders'||window === 'cancel-orders'? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer text-[11px]  md:w-[80%] py-2 px-2  border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Orders</li>
  

                </ul>
            </div>

            <div className={`w-[99%] md:w-[80%] md:mt-[.5rem] flex justify-center overflow-y-auto max-h-[90vh] ${window==='pend-orders' ||window==='orders'||window==='cancel-orders' ?'items-start':' items-center'} min-h-[90vh] max-h-auto bg-white shadow-lg md:ml-[20rem] rounded-2xl `}>
               
                {
              window!=='pend-orders' && window!=='orders'&& window!=='cancel-orders' && window !== 'profile'?
                <div onClick={()=>{setedititem(null);setAdditem(true)}} className='absolute  right-[1rem] bg-white md:right-[3%] h-[2rem] md:h-[3rem] top-[4.8rem] md:top-[15%] p-2 md:p-3 rounded-4xl shadow-2xl justify-center items-center border-1 border-green-100 cursor-pointer hover:bg-gray-300'>
                 <div className='flex w-[100%] h-[100%] justify-center items-center'>   <h2 className='flex gap-1 md:gap-1 rounded-2xl justify-center text-sm md:text-lg items-center text-blue-800'>Add<Plus className='w-[30%] h-[30%]'/></h2>
                </div></div>:''
                }
                
                {
               
                window === 'profile' ?
                  <AdminProfile profile={profile} setProfile={setProfile}/>  : window==='pend-orders' ||window==='orders'||window==='cancel-orders' ?
                  <div className='w-[100%] overflow-y-auto max-h-[80rem] mt-[.5rem] md:mt-[1.5rem] flex flex-col gap-3 md:gap-6'>
                    <div className='   w-[100%] flex ml-4 md:ml-10  '>
                <ul className=' w-[100%]  gap-[.5rem] md:gap-[2rem] flex justify-start items-center'>
                     <li onClick={() =>{
                        setwindow('orders'); navigate('/admin/dashboard?tab=orders')}} className={`
        ${window === 'orders' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-2 md:px-5 py-4 w-[30%] md:w-[20%] text-xs text-center items-center md:text-lg shadow-lg  border-gray-200 hover:border-1 rounded-lg transition-transform hover:scale-105`}>Orders</li>
          
          <li onClick={() =>{
                        setwindow('pend-orders'); navigate('/admin/dashboard?tab=pend-orders')}} className={`
        ${window === 'pend-orders' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-2 md:px-5 py-4 w-[30%] text-xs md:text-lg md:w-[20%] text-center items-center shadow-lg  border-gray-200   hover:border-1 rounded-lg transition-transform hover:scale-105`}>Pending Orders</li>


                    <li onClick={() =>{
                        setwindow('cancel-orders'); navigate('/admin/dashboard?tab=cancel-orders')}} className={`
        ${window === 'cancel-orders' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-2 md:px-5 py-4 w-[30%] text-xs md:text-lg md:w-[20%] text-center items-center border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Cancelled Orders</li>

                   

                </ul>

            </div>
                  <table className='w-[100%] overflow-y-auto  max-h-[80vh] h-[100%] gap-3 md:mt-[0rem] '>
                    <thead className='w-[100%] py-1 md:py-3'>
                        <tr className='border-collapse border-y-1 h-[1rem] md:h-[3rem]'>
                            <td className='w-[10%] text-[12px] px-1  md:text-xl items-center text-center'>Order Id</td>
                            <td className='w-[15%] text-[12px] px-1 md:text-xl border-collapse text-center border-1'>Total Amount</td>
                            <td className='w-[10%] text-[12px] px-1  md:text-xl border-collapse text-center border-1' >Payment</td>
                            <td className='w-[10%] text-[12px] px-1  md:text-xl border-collapse text-center border-1'>Customer</td>
                            <td className='w-[10%] text-[12px] px-1  md:text-xl border-collapse text-center border-1'>Status</td>
                            <td className='w-[15%] text-[12px] px-1  md:text-xl border-collapse text-center border-1'>Date</td>
                            <td className='w-[30%]'></td>
                        </tr>
                    </thead>
                    <tbody className='w-[100%]'>
                    {itemlist&&itemlist.map((item,i)=>{
                        return  <tr key={item.id} className='min-w-[100%] border-collapse border-y-1 shadow-2xl'>
                         
                           <td className='w-[10%] border-collapse border-r-1'> 
                            <h2 className='w-[90%] text-[10px] px-1  md:text-lg  text-center'>{item.id}</h2>
                           </td>
                           <td className='w-[15%] border-collapse border-1'>
                             <h2 className='w-[90%] text-[9px] px-1  md:text-lg items-center text-center'>{item.total_amount}</h2>
                           </td>
                           <td className='w-[10%] border-collapse border-1'>
                            <h2 className='w-[90%] text-[9px] px-1  md:text-lg text-center'>{item.payment_method}</h2>

                           </td>
                           <td className='w-[10%] border-collapse border-1'>
                            <h2 className='w-[90%] text-[9px] px-1  md:text-lg text-center'>{item?.user?.username}</h2>
                           </td>
                             <td className='w-[10%] border-collapse border-1'>
                            <h2 className='w-[90%] text-[9px] px-1  md:text-lg text-center'>{item.order_status}</h2>
                           </td>
                            <td className='w-[15%] border-collapse border-1'>
                            <h2 className='w-[90%] text-[9px] px-1  md:text-lg text-center'>{item.user?.username}</h2>
                           </td>
                            
                        
                            
                            <td className='w-[30%]   items-center py-1 md:py-3 border-collapse border-l-1'>
                                <div className='w-full flex flex-col gap-2 md:gap-0 md:flex-row justify-center items-center'>
                         <button onClick={()=>{setedititem(item);setAdditem(true)}} className='w-[70%] md:w-auto text-[9px] md:text-base px-0 md:mx-3  md:px-4 py-1 md:py-2 border-1 border-blue-200 shadow-2xl rounded-lg hover:bg-blue-400 '>Details</button> 

                           {window==='pend-orders'&&<button onClick={()=>{
                                setlist(prev=>prev.filter(it=>it.id!==item.id))
                                ConfirmOrder(item.id,'Confirmed',item?.user?.id)
                                
                                }} className='text-[10px]   md:text-base mx-1 md:mx-3 px-2 md:px-4 py-1 md:py-2 bg-green-300 shadow-2xl rounded-lg hover:bg-green-500 '>Confirm Order </button> 
                       
                           }   
                              {window==='pend-orders'&& <button onClick={()=>{
                                setlist(prev=>prev.filter(it=>it.id!==item.id))
                                ConfirmOrder(item.id,'Cancelled')
                                
                                }} className=' text-[10px] md:text-base mx-1 md:mx-3 px-2 md:px-4 py-1 md:py-2 bg-red-300 shadow-2xl rounded-lg hover:bg-red-500'>Cancel Order </button> 
                            }
                           
                            { 
                                window==='orders'&&<div className='px-0 md:px-2 py-1 md:py-2 border-blue-400 border-1 shadow-lg rounded-lg'>
                                    <select value={item.order_status}  onChange={(e)=>changeorder(item?.user?.id,item.id,e.target.value)} className='text-[8px] px-0 md:text-base outline-none border-none'>
                                     {console.log(item.order_status)}
                                        <option value='Confirmed'>Confirm</option>
                                        <option value='Packed'>Packed</option>
                                        <option value='Shipped'>Shipped</option>
                                        <option value='Delivered'>Delivered</option>
                                    </select>
                                </div>
                            }
                            </div>

                             </td>

                        </tr>
                    })

                    }
                    </tbody>
                    </table>
                    </div>:
                  <div className='w-[100%] mt-[1rem] max-h-[80vh] h-[100%] gap-3 md:mt-[4rem] md:gap- overflow-x-auto'>
                    {itemlist&&itemlist.map((item)=>{
                        return  <div key={item.id} className='p-2 px-[.5rem] md:px-[2rem] md:p-4 flex overflow-auto rounded-lg shadow-lg'>
                           <div className='w-[75%] flex justify-center items-center h-[]'>
                           {window==='products'?<img src={item.main_image} className='w-[20%] h-[5rem]' />:<img src={item.image} className='w-[20%] h-[5rem]' />} 
                            {window!=='profile'&&<h2 className='w-[70%] text-sm md:text-lg text-center'>{item.name}</h2>}
                            </div>
                            <div className='w-[25%] flex justify-center gap-3 md:gap-9 px-2 items-center py-1 md:py-3'>
                                <button onClick={()=>{
                                    setedititem(item)
                                    setAdditem(true);

                                }} className='flex h-[2rem] cursor-pointer px-2 text-center items-center text-xs md:text-lg hover:bg-green-500 shadow-xl md:h-[3rem] gap-1 md:gap-3 border-1 border-green-400 p-x-2 md:px-4 py-2 rounded-lg'>edit<Pen className='w-[80%] h-[80%]'/> </button>
                                <button onClick={()=>{deleteAll(item.id);
                                    setlist(prev=>prev.filter(val=>val.id!==item.id))
                                }} className='cursor-pointer text-red-500 md:text-black hover:text-red-500 shadow-xl'><Trash /></button>
                            </div>

                        </div>
                    })

                    }
                    </div>
                }
                
                {loading&&<div className='absolute '>
                <LoaderCircle  className='w-[2rem] h-[2rem] animate-spin'/>
                </div>}
                
            </div>


            {
                
                    additem&&(
                        window==='banners'? <AddBanner edititem={edititem} setAdditem={setAdditem}/>:window==='categories'?<AddProductCategory edititem={edititem} setAdditem={setAdditem}/>:window==='products'?<AddProducts edititem={edititem} setAdditem={setAdditem}/>:
                        window==='orders'||window==='pend-orders'||window==='cancel-orders'?<OrderDetails setAdditem={setAdditem} item={edititem}/>:
                        ''
                        
                    )
                
             
            }

        </div>
    )
}

export default Admindashboard