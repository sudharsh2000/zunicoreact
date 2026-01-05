
import React, { useEffect, useRef, useState } from 'react'
import { categoryapi, productapi } from '../Redux/api'
import { toast } from 'react-toastify'
import api from '../Redux/Interceptor'
import FileUploader from './FileUploader'
import { LoaderCircle } from 'lucide-react'
import loadingimg from '../assets/loadingimg.png'
function AddProducts({setAdditem,edititem}) {
        const fileref = useRef(null)
        const [resetTrigger, setTrigger] = useState(false)
        const [loading,setloading]=useState(false)
        const [images, setImages] = useState([])
        let tempimage=[]
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
            const [categoryItems,SetCategoryitems]=useState([])
        

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

    const clearfunction=async()=>{

            setProducts({
                name: '',
                category: '',
                price: '',
                cost: '',
                description: '',
                discount: '',
                stock: '',
            })
        
     
        fileref.current.value = null
        setTrigger(true)
        setTimeout(() => {
            setTrigger(false)
        }, 3000);
    }
  


      const saveProducts = async () => {
        if(!validation()) return;
        
        const productFormdata = new FormData
            productFormdata.append('name', products.name)
            productFormdata.append('category', products.category)
            productFormdata.append('price', products.price)
            productFormdata.append('description', products.description)
            productFormdata.append('cost_price', products.cost || 0)
            productFormdata.append('discount', products.discount || 0)
            productFormdata.append('stock', products.stock)
          
            if(products.image instanceof File){
                productFormdata.append('main_image', products.image)
            }
            images?.forEach((img) => {
        
                productFormdata.append('images', img)
            })
        console.log(images)
        for (let pair of productFormdata.entries()) {
            console.log(pair[0], pair[1]);
        }
        if (validation()) {
            try {
                  setloading(true)

                let res=''
                if(edititem){
                        res= await api.put(`${productapi}${edititem.id}/`, productFormdata, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
                toast.success('Updated')
                } 
                else{
                res= await api.post(productapi, productFormdata, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
                toast.success('Added')
                }
                
                console.log(res.data)
              setloading(false)
                clearfunction()
            
            setAdditem(false)
            }
            catch (er) {
                console.error(er)
                setloading(false)
                  toast.error('something went wrong')
            }
        }

    }

    useEffect(()=>{
        const loadapi=async()=>{
        try{
            const res=await api.get(categoryapi)
            SetCategoryitems(res.data)
            console.log(edititem)
            if(edititem){
                 setImages(edititem?.images); 
            
                setProducts({
                name: edititem.name,
                category: edititem.category,
                price: edititem.price,
                cost: edititem.cost_price,
                description: edititem.description,
                discount: edititem.discount,
                stock: edititem.stock,
                image: edititem?.main_image
            })
             
           
            }
           
            
       
           

        }
        catch(er){

        }
        }
        loadapi();
        
       
    },[edititem])
 edititem?.images.forEach((img)=>{

                    tempimage.push(img.image)
            })
            console.log(tempimage)

  return (
     <div className='absolute w-[100%] h-[100%] bg-[#090909a3]'>
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
     <div className='w-[90%] md:w-[50%] min-h-[80%] flex justify-center flex-col items-center bg-white rounded-lg shadow-xl'>
                            <div className='w-[100%] md:w-[60%] gap-3 flex flex-col md:gap-[1rem] p-5' >
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
                                    <input type="text"
  pattern="[0-9]*"
  inputmode="numeric"value={products.discount} onChange={(e) =>
  {
    const val = e.target.value;
    if (val === "" || Number(val) >= 0) {
   setProducts({ ...products, discount: e.target.value ? parseFloat(e.target.value) : '' })
}
   } }className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product discount' />

                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input type="text"
  pattern="[0-9]*"
  inputmode="numeric" value={products.stock} onChange={(e) =>{
        const val = e.target.value;
    if (val === "" || Number(val) >= 0) {
setProducts({ ...products, stock: e.target.value ? parseFloat(e.target.value) : '' })
    }
   }} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product Stock' />
                                    <p></p>
                                </div>
                                <div className='w-full  gap-5'>
                                    <FileUploader tempimage={tempimage} fileref={fileref} resettrigger={resetTrigger} onFileselect={(file) => {
                                        console.log(file); setImages(file); setProducts({ ...products, image: file[0] })
                                    }} />
                                </div>
                                <div className='flex justify-center mt-[2rem] gap-2 md:gap-4 '>
                                  {
                                        edititem?<button onClick={saveProducts} className=' bg-green-600 py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Update Product</button>:
                                      <button onClick={saveProducts} className=' bg-green-600  text-white text-sm py-1 px-3 md:px-5 md:py-2 md:text-lg font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Add Product</button>
                                  }
                                    <button onClick={() => clearfunction('products')} className=' bg-red-600 py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                               <button onClick={() => setAdditem(false)} className=' bg-orange-700 py-1 px-3 md:px-5 md:py-2 text-white text-sm md:text-lg font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Close</button>
                                </div>

                            </div>
                                      {loading&&<div className='absolute '>
                <img src={loadingimg} className='w-[3rem] h-[3rem] md:w-[5rem] md:h-[5rem] animate-spin'/>
                </div>} 
                        </div>
                        </div>
                        </div>
                        
  )
}

export default AddProducts