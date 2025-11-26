import { ArrowBigRight, ArrowDownRight, ArrowRight, ArrowRightFromLine, Heart, LucideShoppingCart, Power, Store, User2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../Redux/Interceptor'
import { Logoutapi, usersapi } from '../Redux/api'
import LoadingScreen from './LoadingPage'
import { useAuth } from '../Redux/AuthProvider'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function UserHome() {
    const [profile,setProfile]=useState({
        username:'',
        email:'',
        mobile:''
    })
    const [loading,setLoading]=useState()
    const {userInfo,logout}=useAuth()
    const navigate=useNavigate()

    useEffect(()=>{
        const loaduser=async()=>{
            console.log('info', userInfo)
                setLoading(true)
              try{  if (userInfo?.userid) {
                        console.log('info', userInfo)
                        const res = await api.get(`${usersapi}?id=${userInfo.userid}`)
                        console.log(res.data[0])
                        setProfile(res.data[0])
                    }
              }
              catch(er){
                console.error(er)
              }

            
            setLoading(false)
        }
        loaduser();
    },[userInfo])
    const updateUser=async()=>{
        
       try{ const res=await api.patch(`${usersapi}${profile.id}/`,profile)
        console.log(res.data)
        toast.success('Updated')
       }
       catch (er){
        console.error(er)
        toast.error('Updation Failed')
       }
        
    }
const logoutfunction=async()=>{
    try{
        const res=api.post(Logoutapi,{},{withCredentials:true})
        logout()
       if(userInfo.superuser){
        navigate('/admin/signin')
       }
       else{
 navigate('/signin')
       }
       

    }
    catch(e){
console.error('logourt error')
    }
}
  return (
    <div className='w-[100%] h-[100vh] md:h-[100%] p-1 md:p-5 flex justify-center items-center bg-white md:bg-transparent '>

        {
            loading?<LoadingScreen/>:
       <div className='w-full h-full flex justify-center items-center flex-col md:flex-row gap-2 md:p-5'>  <div className=' w-[100%] h-[50%] md:h-[100%] md:w-[60%] gap-3 md:gap-[3rem] flex justify-center p-3 md:p-4  flex-col items-center md:rounded-xl shadow-xl bg-white '>
                        <User2Icon className='h-[15%] w-[15%]' />
                        <div className='w-[100%] md:w-[60%] flex flex-col  gap-7 md:gap-9'>
                            <div className='flex flex-row justify-around gap-3 md:gap-5'>
                                <p className='text-xs md:text-lg font-extrabold w-[30%] '>Username </p>
                                <p> :</p>
                                <input value={profile.username || ''} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1    rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>
                            <div className='flex flex-row justify-around gap-3 md:gap-5'>
                                <p className='text-xs md:text-lg font-extrabold w-[30%] '>E-Mail </p>
                                <p> :</p>
                                <input value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>
                            <div className='flex flex-row justify-around gap-3 md:gap-5'>
                                <p className='text-xs md:text-lg font-extrabold w-[30%] '>Mobile Number </p>
                                <p> :</p>
                                <input value={profile.mobile || ''} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>


                            <div className='w-full flex justify-around  mt-[2%]'>
                                <button onClick={updateUser} className='w-[6rem] md:w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'>Update</button>
                                <button className='w-[6rem] md:w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>

                            </div>
                        </div>

                    </div>
                    <div className=' md:hidden w-[100%] h-[50%] md:h-auto md:w-[60%] gap-3 md:gap-[3rem] flex py-5 items-center p-3 md:p-4  flex-col  rounded-xl shadow-xl bg-white '>
                        
                        <div className='w-[100%] md:w-[60%] flex flex-col  gap-6 md:gap-9 p-2'>
                            <div onClick={()=>navigate('/orders')} className='flex flex-row justify-between items-center gap-3 md:gap-5 shadow-lg py-2 px-6 rounded-lg '>
                                <p className='text-xs md:text-lg font-extrabold w-[80%] '>Orders </p>
                                <Store className='text-yellow-600 w-[20%]'/>
                            </div>
                            <div onClick={()=>navigate('/cart')} className='flex flex-row justify-between items-center gap-3 md:gap-5 shadow-lg py-2 px-6 rounded-lg '>
                                <p className='text-xs md:text-lg font-extrabold w-[80%] '>Cart </p>
                                <LucideShoppingCart className='text-yellow-600 w-[20%]'/>
                            </div>
                            <div onClick={()=>navigate('/wishlist')} className='flex flex-row justify-between items-center gap-3 md:gap-5 shadow-lg py-2 px-6 rounded-lg '>
                                <p className='text-xs md:text-lg font-extrabold w-[80%] '>Wishlist </p>
                                  <Heart className='text-yellow-600 w-[20%]'/>
                            </div>
                            <div onClick={()=>logoutfunction()}  className='flex flex-row justify-between items-center gap-3 md:gap-5 shadow-lg py-2 px-6 rounded-lg '>
                                <p className='text-xs md:text-lg font-extrabold w-[80%] '>Logout </p>
                                  <Power className='text-yellow-600 w-[20%]'/>
                            </div>
                            
                            
                            
                        </div>

                    </div>
                    </div>
                    } 
    </div>
  )
}

export default UserHome