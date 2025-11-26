import React, { useEffect, useState } from 'react'
import FileUploader from './FileUploader'
import axios from 'axios'
import { bannerapi, categoryapi, productapi, usersapi } from '../Redux/api'
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
function Admindashboard() {
    const navigate=useNavigate()
    const [loading,setloading]=useState(false)
    const   [edititem,setedititem]=useState()
    const { userInfo } = useAuth()
    const [additem,setAdditem]=useState(false)
    const urlvalue=new URLSearchParams(location.search)
    const tab=urlvalue.get('tab')

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

    

    

    

    const [itemlist,setlist]=useState([])

    // Functions Start from here


    useEffect(() => {
        
        const loadapi = async () => {
            try {

                if (window === 'products') {
                    const res = await api.get(productapi, {}, { withCredentials: true })
                    setlist(res.data)
                 

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

            }
            catch (er) {
                console.error('something is missing')
            }

        }
        loadapi();
    }, [window, userInfo,additem]);

   
    


 



  

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
            <div className=' hidden md:block h-[90vh] bg-white absolute left-[.5rem] md:left-[1rem] top-[5rem] md:top-[5rem] shadow-lg   w-[10%] md:w-[18rem] rounded-2xl'>
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

                    <li onClick={() =>{
                        setwindow('products'); navigate('/admin/dashboard?tab=products')}} className={`
        ${window === 'products' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Products</li>


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


                </ul>
            </div>

            <div className='w-[95%] md:w-[90%] md:mt-[.5rem] flex justify-center items-center min-h-[90vh] max-h-auto bg-white shadow-lg md:ml-[20rem] rounded-2xl '>
               
                {
                window !== 'profile'?
                <div onClick={()=>{setedititem(null);setAdditem(true)}} className='absolute right-[1rem] bg-white md:right-[1%] h-[2rem] md:h-[3rem] top-[4.8rem] md:top-[10%] p-2 md:p-3 rounded-4xl shadow-2xl justify-center items-center border-1 border-green-100 cursor-pointer hover:bg-gray-300'>
                 <div className='flex w-[100%] h-[100%] justify-center items-center'>   <h2 className='flex gap-1 md:gap-1 rounded-2xl justify-center text-sm md:text-lg items-center text-blue-800'>Add<Plus className='w-[30%] h-[30%]'/></h2>
                </div></div>:''
                }
                
                {
               
                window === 'profile' ?
                  <AdminProfile profile={profile} setProfile={setProfile}/>  : 
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
                        window==='banners'? <AddBanner edititem={edititem} setAdditem={setAdditem}/>:window==='categories'?<AddProductCategory edititem={edititem} setAdditem={setAdditem}/>:window==='products'?<AddProducts edititem={edititem} setAdditem={setAdditem}/>:''
                        
                    )
                
             
            }

        </div>
    )
}

export default Admindashboard