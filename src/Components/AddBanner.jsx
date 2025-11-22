import React, { useEffect, useRef, useState } from 'react'
import FileUploader from './FileUploader'
import { bannerapi } from '../Redux/api'
import { toast } from 'react-toastify'
import api from '../Redux/Interceptor'
import { LoaderCircle } from 'lucide-react'

function AddBanner({setAdditem,edititem}) {
        const [loading,setloading]=useState(false)
        const fileref = useRef(null)
        const [resetTrigger, setTrigger] = useState(false)
    const [banner,Setbanner]=useState()
        const [images, setImages] = useState([])
        const [tempimage,setTempimage]=useState()
         
     const saveBanner=async()=>{
  let res=''
        try{
            setloading(true)
             const bannerform=new FormData
    bannerform.append('title',banner)
    images.forEach((image)=>{
        bannerform.append('image',image)
    })
            if(edititem){
                console.log(bannerform)
            res=await api.put(`${bannerapi}${edititem.id}/`,bannerform, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
            }
            else{
        res=await api.post(bannerapi,bannerform, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
            }
           
                console.log(res.data)
                setloading(false)
                clearfunction()
                  toast.success('Added')
                  setAdditem(false)
                  

        }
        catch(er){
            console.error('error',er.response?.data)
            setloading(false)
        }
    }
    const clearfunction=()=>{
        
            Setbanner('')
        
        fileref.current.value = null
        setTrigger(true)
        setTimeout(() => {
            setTrigger(false)
        }, 3000);
    }
    useEffect(()=>{
        if(edititem){
        Setbanner(edititem.title)
        setTempimage(edititem.image)
    }
    },[])
  return (
    <div className='absolute w-[100%] h-[100%] bg-[#090909a3]'>
        <div className='w-[100%] h-[100%] flex justify-center items-center'>
 <div className='min-h-[60%] w-[90%] md:w-[50%]  flex justify-center flex-col items-center bg-white rounded-lg shadow-xl'>
                            <div className='w-[100%] md:w-[60%] gap-3 flex flex-col md:gap-[1rem] p-5' >
                                <div className='w-full gap-5'>
                                    <input value={banner} onChange={(e) => Setbanner( e.target.value )} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Banner Name' />
                                    <p></p>
                                </div>

                                <div className='w-full  gap-5'>

                                    <FileUploader tempimage={[tempimage]} resettrigger={resetTrigger} fileref={fileref} onFileselect={(file) => { setImages(file) }} />
                                </div>
                                <div className='flex justify-center mt-[2rem] gap-2 md:gap-4 '>
                                    {
                                        edititem?<button onClick={saveBanner} className='py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg bg-green-600  text-white  rounded-lg cursor-pointer hover:bg-green-800'> Update Banner</button>:
                                    
                                    <button onClick={saveBanner} className='py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg bg-green-600  text-white  rounded-lg cursor-pointer hover:bg-green-800'> Add Banner</button>}
                                    <button onClick={() => clearfunction()} className='py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg bg-red-600  text-white  rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                             
                                     <button onClick={() => setAdditem(false)} className='py-1 px-3 md:px-5 md:py-2 text-sm md:text-lg bg-orange-800  text-white  rounded-lg cursor-pointer hover:bg-red-800'>Close</button>
                               </div>

                            </div>
                       {loading&&<div className='absolute '>
                <LoaderCircle  className='w-[2rem] h-[2rem] animate-spin'/>
                </div>} 
                        </div>
                        </div>
                        
                        </div>
  )
}

export default AddBanner