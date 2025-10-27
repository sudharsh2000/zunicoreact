import React, { useEffect, useState } from 'react'
import FileUploader from './FileUploader'
import axios from 'axios'
import { bannerapi, categoryapi, productapi, usersapi } from '../Redux/api'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersave } from '../Redux/UserSlice'
import api from '../Redux/Interceptor'
import { Loader2, Loader2Icon, LoaderCircle, LoaderPinwheel, UploadCloud, User2, User2Icon, UserCircle } from 'lucide-react'
import { useAuth } from '../Redux/AuthProvider'
function Admindashboard() {
    const [loading,setloading]=useState(false)
    const dispatch = useDispatch()
    const { userInfo } = useAuth()
    const User = useSelector(state => state.counter)
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



    // Functions Start from here


    useEffect(() => {
        const loadapi = async () => {
            try {

                if (window === 'products') {
                    const res = await api.get(categoryapi, {}, { withCredentials: true })
                    SetCategoryitems(res.data)
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


                ;
            }
            catch (er) {
                console.error(er)
                setloading(false)
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

            }
            catch (er) {
                console.error(er.response?.data)
                setloading(false)
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

        }
        catch(er){
            console.error('error',er.response?.data)
            setloading(false)
        }
    }


    return (
        <div className=' w-full flex justify-center items-center'>
            <div className='h-[80vh] bg-white absolute left-[.5rem] md:left-[10rem] top-[5rem] md:top-[8rem] shadow-lg   w-[3.5rem] md:w-[18rem] rounded-2xl'>
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
                {window === 'profile' ?
                    <div className='w-[100%] h-[100%] gap-3 md:gap-[3rem] flex justify-center  flex-col items-center '>
                        <User2Icon className='h-[15%] w-[15%]' />
                        <div className='w-[60%] flex flex-col  gap-3 md:gap-9'>
                            <div className='flex flex-row justify-around gap-5'>
                                <p className='text-lg font-extrabold w-[35%] '>Username </p>
                                <p> :</p>
                                <input value={profile.username || ''} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1    rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>
                            <div className='flex flex-row justify-around gap-5'>
                                <p className='text-lg font-extrabold w-[35%] '>E-Mail </p>
                                <p> :</p>
                                <input value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>
                            <div className='flex flex-row justify-around gap-5'>
                                <p className='text-lg font-extrabold w-[35%] '>Mobile Number </p>
                                <p> :</p>
                                <input value={profile.mobile || ''} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>


                            <div className='w-full flex justify-around  mt-[2%]'>
                                <button className='w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'>Update</button>
                                <button className='w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>

                            </div>
                        </div>

                    </div> : ''
                }
                {
                    window === 'products' ?
                        <div className='w-[100%] h-[100%] flex justify-center flex-col items-center'>
                            <div className='w-[50%] gap-3 flex flex-col md:gap-[1rem] p-5' >
                                <div className='w-full gap-5'>
                                    <input value={products.name} onChange={(e) => setProducts({ ...products, name: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' placeholder='Product Name' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <select value={products.category || ''} onChange={(e) => setProducts({ ...products, category: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] '>
                                        <option value={''}>-- Select Category --</option>
                                        {
                                            categoryItems &&
                                            categoryItems.map((item) => {
                                                return <option value={item.id} key={item.id}>{item.name}</option>
                                            })
                                        }

                                    </select>
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input value={products.price} onChange={(e) => setProducts({ ...products, price: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' type="number" Placeholder='Product Price' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input value={products.cost} onChange={(e) => setProducts({ ...products, cost: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' type="number" Placeholder='Product Cost' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input value={products.description} onChange={(e) => setProducts({ ...products, description: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product Description' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input type="number" value={products.discount} onChange={(e) => setProducts({ ...products, discount: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product discount' />

                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input type="number" value={products.stock} onChange={(e) => setProducts({ ...products, stock: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product Stock' />
                                    <p></p>
                                </div>
                                <div className='w-full  gap-5'>
                                    <FileUploader fileref={fileref} resettrigger={resetTrigger} onFileselect={(file) => {
                                        console.log(file); setImages(file); setProducts({ ...products, image: file[0] })
                                    }} />
                                </div>
                                <div className='flex justify-around mt-[2rem] '>
                                    <button onClick={saveProducts} className='w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Add Product</button>
                                    <button onClick={() => clearfunction('products')} className='w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                                </div>

                            </div>
                        </div> : ''
                }
                {
                    window === 'categories' ?
                        <div className='w-[100%] h-[100%] flex justify-center flex-col items-center'>
                            <div className='w-[50%] gap-3 flex flex-col md:gap-[1rem] p-5' >
                                <div className='w-full gap-5'>
                                    <input value={category.name} onChange={(e) => setcategory({ ...category, name: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Category Name' />
                                    <p></p>
                                </div>

                                <div className='w-full  gap-5'>

                                    <FileUploader resettrigger={resetTrigger} fileref={fileref} onFileselect={(file) => { setcategory({ ...category, image: file[0] }) }} />
                                </div>
                                <div className='flex justify-around mt-[2rem] '>
                                    <button onClick={saveCategory} className='w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Add Category</button>
                                    <button onClick={() => clearfunction('categories')} className='w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                                </div>

                            </div>
                        </div> : ''
                }
                {
                    window === 'banners' ?
                        <div className='w-[100%] h-[100%] flex justify-center flex-col items-center'>
                            <div className='w-[50%] gap-3 flex flex-col md:gap-[1rem] p-5' >
                                <div className='w-full gap-5'>
                                    <input value={banner} onChange={(e) => Setbanner( e.target.value )} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Banner Name' />
                                    <p></p>
                                </div>

                                <div className='w-full  gap-5'>

                                    <FileUploader resettrigger={resetTrigger} fileref={fileref} onFileselect={(file) => { setImages(file) }} />
                                </div>
                                <div className='flex justify-around mt-[2rem] '>
                                    <button onClick={saveBanner} className='w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Add Banner</button>
                                    <button onClick={() => clearfunction('banner')} className='w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                                </div>

                            </div>
                        </div> : ''
                }
                {loading&&<div className='absolute '>
                <LoaderCircle  className='w-[2rem] h-[2rem] animate-spin'/>
                </div>}
                
            </div>

        </div>
    )
}

export default Admindashboard