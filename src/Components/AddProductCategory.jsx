import React, {useEffect, useRef, useState } from 'react'
import FileUploader from './FileUploader'
import { categoryapi } from '../Redux/api'
import api from '../Redux/Interceptor'
import { toast } from 'react-toastify'
import { LoaderCircle } from 'lucide-react'
import loadingimg from '../assets/loadingimg.png'
function AddProductCategory({edititem,setAdditem}) {
        const fileref = useRef(null)
        const [resetTrigger, setTrigger] = useState(false)
          const [images, setImages] = useState([])
            const [loading,setloading]=useState(false)
            const [category,setcategory]=useState({
                name: '',
                image: ''
            })
const CategoryFormdata = new FormData()
            CategoryFormdata.append('name', category.name)
            CategoryFormdata.append('image', category.image)
   
   
    const saveCategory = async () => {

        if (validationCategory()) {
            try {
                setloading(true)
                let res=''
                if(edititem){
         res= await api.patch(`${categoryapi}${edititem.id}/`, CategoryFormdata, { withCredentials: true });
                }
                else{
            res = await api.post(categoryapi, CategoryFormdata, { withCredentials: true });
                }
                
                console.log(res.data)
                setloading(false)
                clearfunction();
             toast.success('Added')
             setAdditem(false)
            }
            catch (er) {
                console.error(er)
                setloading(false)
                toast.error('Some error occured')
            }
        }
    }
     const clearfunction = () => {
        
            setcategory({
                name: '',
                image: ''
            });

        
        
     
        fileref.current.value = null
        setTrigger(true)
        setTimeout(() => {
            setTrigger(false)
        }, 3000);
    }
const validationCategory = () => {
        let returnvalue = true;
        if (!category.name) {
            returnvalue = false;
            alert('No name');

        }
        return returnvalue
    }
useEffect(()=>{
    if(edititem){
        setcategory({
            name:edititem.name,
            image:edititem.image

        })
    }

},[edititem])
console.log(category.image)

  return (
       <div className='absolute w-[100%] h-[100%] bg-[#090909a3]'>
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
     <div className='w-[90%] md:w-[50%] min-h-[50%] flex justify-center flex-col items-center bg-white rounded-lg shadow-xl'>
                            <div className='w-[90%] md:w-[60%] gap-3 flex flex-col md:gap-[1rem] p-5' >
                                <div className='w-full gap-5'>
                                    <input value={category.name} onChange={(e) => setcategory({ ...category, name: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Category Name' />
                                    <p></p>
                                </div>

                                <div className='w-full  gap-5'>

                                    <FileUploader tempimage={[category.image]} resettrigger={resetTrigger} fileref={fileref} onFileselect={(file) => { setcategory({ ...category, image: file[0] }) }} />
                                </div>
                                <div className=' flex justify-center mt-[2rem] gap-2 md:gap-4 '>
                                   {
                                        edititem?<button onClick={saveCategory} className=' bg-green-600 py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Update Category</button>:
                                     <button onClick={saveCategory} className='bg-green-600  text-white py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg  font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Add Category</button>
                                   }
                                    <button onClick={() => clearfunction()} className='py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg bg-red-600  text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                                        <button onClick={() => setAdditem(false)} className='py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg bg-orange-700  text-white font-extrabold rounded-lg cursor-pointer hover:bg-orange-800'>Close</button>
                        
                                </div>

                            </div>
                                           {loading&&<div className='absolute '>
                <img src={loadingimg}  className='w-[2rem] h-[2rem] animate-spin'/>
                </div>} 
                        </div>
                        </div>
                        </div>
  )
}

export default AddProductCategory