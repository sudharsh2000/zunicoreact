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
function Admindashboard() {
    const [loading,setloading]=useState(false)
  
    const { userInfo } = useAuth()
    
    const fileref = useRef(null)
    const [resetTrigger, setTrigger] = useState(false)
    const [categoryItems, SetCategoryitems] = useState([])
    const [window, setwindow] = useState('profile')
    const [category, setcategory] = useState({
        name: '',
        image: ''
    })
    const [products, setProducts] = useState({
        name: '',
        category: '',
        price: '',
        cost: '',
        description: '',
        discount: '',
        stock: '',
        image: ''
    })

    const [images, setImages] = useState([])
    const [errors, setErrors] = useState({
        name: '',
        price: '',

    })

    const [banner, Setbanner] = useState()

    const [profile, setProfile] = useState({})

    const CategoryFormdata = new FormData()
    CategoryFormdata.append('name', category.name)
    CategoryFormdata.append('image', category.image)

    const productFormdata = new FormData
    productFormdata.append('name', products.name)
    productFormdata.append('category', products.category)
    productFormdata.append('price', products.price)
    productFormdata.append('description', products.description)
    productFormdata.append('cost_price', products.cost || 0)
    productFormdata.append('discount', products.discount || 0)
    productFormdata.append('stock', products.stock)
    productFormdata.append('main_image', products.image)
    images.forEach((img) => {

        productFormdata.append('images', img)
    })

    const bannerform=new FormData
    bannerform.append('title',banner)
    images.forEach((image)=>{
        bannerform.append('image',image)
    })

    const [itemlist,setlist]=useState([])

    // Functions Start from here


    useEffect(() => {
        const loadapi = async () => {
            try {

                if (window === 'products') {
                    const res = await api.get(productapi, {}, { withCredentials: true })
                    setlist(res.data)
                    console.log(res.data)

                }
                if (window === 'profile') {
                    if (userInfo) {
                        console.log('info', userInfo)
                        const res = await api.get(`${usersapi}?id=${userInfo.userid}`)
                        console.log(res.data[0])
                        setProfile(res.data[0])
                    }

                }
                if(window==='banners'){
                    const res = await api.get(`${bannerapi}`)
                        console.log(res.data)
                        setlist(res.data)
                }
                if(window==='categories'){
                    const res = await api.get(`${categoryapi}`)
                        console.log(res.data)
                        setlist(res.data)
                }

            }
            catch (er) {
                console.error('something is missing')
            }

        }
        loadapi();
    }, [window, userInfo])

    const validation = () => {
        let returnvalue = true;
        if (!products.name) {
            returnvalue = false;
            alert('No name');

        }
        if (!products.price) {
            returnvalue = false;
            alert('No price');

        }
        if (!products.image) {
            returnvalue = false;
            alert('No image');

        }
        return returnvalue
    }
    const validationCategory = () => {
        let returnvalue = true;
        if (!category.name) {
            returnvalue = false;
            alert('No name');

        }
        return returnvalue
    }
    const clearfunction = (val) => {
        if (val == 'categories') {
            setcategory({
                name: '',
                image: ''
            });

        }
        if (val == 'products') {
            setProducts({
                name: '',
                category: '',
                price: '',
                cost: '',
                description: '',
                discount: '',
                stock: '',
            })
        }
        if(val==='banner'){
            Setbanner('')
        }
        fileref.current.value = null
        setTrigger(true)
        setTimeout(() => {
            setTrigger(false)
        }, 3000);
    }

    const saveCategory = async () => {

        if (validationCategory()) {
            try {
                setloading(true)
                const res = await api.post(categoryapi, CategoryFormdata, { withCredentials: true });
                console.log(res.data)
                setloading(false)
                clearfunction('categories');


                toast.success('Added')
            }
            catch (er) {
                console.error(er)
                setloading(false)
                toast.error('Some error occured')
            }
        }
    }



    const saveProducts = async () => {
        console.log(images)
        for (let pair of productFormdata.entries()) {
            console.log(pair[0], pair[1]);
        }
        if (validation()) {
            try {
                  setloading(true)
                const res = await api.post(productapi, productFormdata, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
                console.log(res.data)
              setloading(false)
                clearfunction('products')
            toast.success('Added')
            }
            catch (er) {
                console.error(er.response?.data)
                setloading(false)
                  toast.error('Not Saved ')
            }
        }

    }

    const saveBanner=async()=>{
        try{
            setloading(true)
            const res=await api.post(bannerapi,bannerform, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
                console.log(res.data)
                setloading(false)
                clearfunction('banner')
                  toast.success('Added')

        }
        catch(er){
            console.error('error',er.response?.data)
            setloading(false)
        }
    }


    return (
        <div className=' w-full flex justify-center items-center'>
            <div className=' hidden md:block h-[80vh] bg-white absolute left-[.5rem] md:left-[10rem] top-[5rem] md:top-[8rem] shadow-lg   w-[3.5rem] md:w-[18rem] rounded-2xl'>
                <ul className=' mt-[.5rem] md:mt-[2rem] gap-[.5rem] md:gap-[2rem] flex justify-center items-center flex-col'>
                    <li onClick={() => setwindow('profile')} className={
                        ` ${window === 'profile' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer  px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105 `}> My Profile</li>
                    <li onClick={() => setwindow('banners')} className={
                        ` ${window === 'banners' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg hover:border-1 rounded-lg transition-transform hover:scale-105
            `}> Banners</li>
                    <li onClick={() => setwindow('categories')} className={`
        ${window === 'categories' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Product Category</li>

                    <li onClick={() => setwindow('products')} className={`
        ${window === 'products' ? 'bg-blue-300' : 'bg-yellow-50'} cursor-pointer px-5 py-4 w-[3rem] md:w-[80%] border-gray-200 shadow-lg  hover:border-1 rounded-lg transition-transform hover:scale-105`}>Products</li>


                </ul>

            </div>
            <div className=' md:w-[60rem] md:mt-[3.5rem] flex justify-center items-center min-h-[80vh] bg-white shadow-lg md:ml-[20rem] rounded-2xl '>
               {console.log(window)}
                {
                window !== 'profile'?
                <div className='absolute right-[1rem] md:right-[18rem] h-[3rem] top-[.5rem] md:top-[9rem] p-2 md:p-3 rounded-lg shadow-2xl justify-center items-center border-1 border-green-100     cursor-pointer hover:bg-gray-300'>
                    <h2 className='flex gap-1 md:gap-2 rounded-lg'>Add<Plus/></h2>
                </div>:''

                }
                {window === 'profile' ?
                  <AdminProfile profile={profile} setProfile={setProfile}/>  : 
                  <div className='w-[100%] max-h-[80vh] h-[100%] gap-3 md:mt-[1rem] md:gap- overflow-x-auto'>
                    {itemlist&&itemlist.map((item)=>{
                        return  <div className='p-2 px-[.5rem] md:px-[2rem] md:p-4 flex overflow-auto rounded-lg shadow-lg'>
                           <div className='w-[55%] flex justify-center items-center h-[]'>
                           {window==='products'?<img src={item.main_image} className='w-[40%] h-[100%]' />:<img src={item.image} className='w-[40%] h-[100%]' />} 
                            {window!=='profile'&&<h2 className='w-[60%] text-sm md:text-lg text-center'>{item.name}</h2>}
                            </div>
                            <div className='w-[35%] flex justify-center gap-3 md:gap-9 px-2 items-center py-1 md:py-3'>
                                <button className='flex h-[1.5rem] cursor-pointer hover:bg-green-500 shadow-xl md:h-[3rem] gap-1 md:gap-3 border-1 border-green-400 p-x-2 md:px-4 py-2 rounded-lg'>edit<Pen/> </button>
                                <button className='cursor-pointer hover:text-red-500 shadow-xl'><Trash/></button>
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

        </div>
    )
}

export default Admindashboard