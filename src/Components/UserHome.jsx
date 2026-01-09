import { ArrowBigRight, ArrowDownRight, ArrowRight, ArrowRightFromLine, Bell, BookOpenIcon, BookOpenText, ChevronRight, Heart, LoaderCircle, LucideShoppingCart, Power, Store, User2Icon, UserCircle2Icon, UserCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import api from '../Redux/Interceptor'
import { AddressApi, Logoutapi, notificationApi, usersapi } from '../Redux/api'
import LoadingScreen from './LoadingPage'
import { useAuth } from '../Redux/AuthProvider'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import man from '../assets/man.png'
function UserHome() {
    const [profile,setProfile]=useState({
        username:'',
        email:'',
        mobile:''
    })
    const [error,seterror]=useState({
        name:'',
        email:'',
        mobile:''
    })
    const [loading,setLoading]=useState()
    const [updateloading,setUpdateLoading]=useState(false)
    const {userInfo,logout,login}=useAuth()
    const navigate=useNavigate()
    const urlvalue=new URLSearchParams(location.search)
    const tab=urlvalue.get('tab')
    const [profiletyepe,setProfiletype]=useState(tab ||'useredit')
    const[addresses,setAddresses]=useState([])  
    const [notifications,setNotifications]=useState([])
     const validation=()=>{
        const email_expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let statement=true;
    const newerror={name:'',email:'',mobile:''}
    if(!profile.username)
      {
        
                newerror.name='Please enter the name'
                statement=false;
            }
    if(!profile.email ){
                newerror.email='Please enter the Email Address'
         statement=false;
              }
      else if(!email_expression.test(profile.email)){
                newerror.email='Please enter Valid Email Address'
            statement=false;
              }
              if(!profile.mobile){
                newerror.mobile='Please enter Valid Mobile Number'
            statement=false;
              }
              else if(profile.mobile.length!==10){
                newerror.mobile='Please enter Valid Mobile Number'
            statement=false;
              }
               
    
    seterror(newerror)
    return statement
  
  }
    useEffect(()=>{
        const loaduser=async()=>{
            
                setLoading(true)
              try{  if (userInfo?.userid) {
                        console.log('info', userInfo)
                        const res = await api.get(`${usersapi}?id=${userInfo.userid}`)
                        
                        setProfile(res.data[0])
                    }
              }
              catch(er){
                console.error(er)
              }

            
            setLoading(false)
        }
        loaduser();
    },[userInfo?.userid])

    useEffect(()=>{
        const loadaddresses=async()=>{
            try{
                if(userInfo?.userid){
                    if(profiletyepe==='address'){
                    const res=await api.get(`${AddressApi}?user=${userInfo.userid}`,{withCredentials:true})
                    setAddresses(res.data)
                    }
                    if(profiletyepe==='notification'){
                        const res=await api.get(`${notificationApi}?username=${userInfo?.username}`)
                        setNotifications(res.data)
                        console.log(res.data)
                    }
                    console.log(res.data)   
                }
            }
            catch(er){
                console.error(er)
            }
        }
        loadaddresses()
    },[userInfo?.userid,profiletyepe,userInfo?.username])
    const updateUser=async()=>{
       if(validation()) {
        setUpdateLoading(true)
       try{ const res=await api.patch(`${usersapi}${profile.id}/`,profile)
        console.log(res.data)
       if(res?.data && userInfo?.accesstoken){ console.log(userInfo.accesstoken,{'username':res.data.username,
        'userid':res.data.id,
        'mobile':res.data.mobile,
        'email':res.data.email,
        'superuser':false})
        
        login(userInfo.accesstoken,{'username':res.data.username,
        'userid':res.data.user_id,
        'mobile':res.data.mobile,
        'email':res.data.email,
        'superuser':false})
        toast.success('Updated')
        }
       }
       catch (er){
        console.error(er)
        toast.error('Updation Failed')
       }
        setUpdateLoading(false)
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
       <div className='w-full h-[100vh] md:h-[85vh] flex justify-center items-center  flex-col md:flex-row gap-2 md:gap-[3rem] md:p-5'>
        <div className=' hidden md:flex w-[20%] h-[100%] gap-3 md:gap-[3rem] justify-center items-center   flex-col   '>
            <div className='bg-[#ffffff4b] rounded-lg h-[12%] shadow-xl  px-2 gap-8 w-[100%] flex justify-center items-center'>
            <img src={man} className='h-[85%] w-[20%] text-emerald-600  '/>
            <h2 className='text-xl font-semibold font-serif'>{profile.username}</h2>
            </div>
            <div className='bg-[#ffffffa1] w-full h-[90%] gap-8 flex flex-col p-2 rounded-lg min-h-[10rem]'>
                <div className='flex gap-4 w-[100%] mt-9 px-2 justify-center items-center  '>
                    <div className='w-[20%] h-[100%] flex justify-center items-center '>
                        <UserCircleIcon className={`h-[100%] hover:text-sky-600 w-[60%] cursor-pointer ${profiletyepe==='useredit'?'text-sky-300':'text-emerald-600'}   `}/>
                    </div>
                    <h2 onClick={()=>{setProfiletype('useredit'); navigate('/profile?tab=useredit')}} className={`text-xl  hover:text-sky-600 cursor-pointer font-semibold w-[80%] font-serif ${profiletyepe==='useredit'?'text-sky-300':'text-gray-500'} `}>Profile information</h2>
                </div>
                <div className='flex gap-4 w-[100%] px-2 justify-center items-center  '>
                    <div className='w-[20%] h-[100%] flex justify-center items-center '>
                        <BookOpenText className={`h-[100%] hover:text-sky-600 cursor-pointer w-[60%] ${profiletyepe==='address'?'text-sky-300':'text-emerald-600'}   `}/>
                    </div>
                    <h2 onClick={()=>{setProfiletype('address'); navigate('/profile?tab=address')}} className={ `text-xl text-gray-500 cursor-pointer hover:text-sky-600 font-semibold w-[80%] font-serif ${profiletyepe==='address'?'text-sky-300':'text-gray-500'}`}>Manage Address</h2>
                </div>
                <div className='flex gap-4 w-[100%] px-2 justify-center items-center  '>
                    <div className='w-[20%] h-[100%] flex justify-center items-center '>
                        <Bell className={`h-[100%] hover:text-sky-600 cursor-pointer w-[60%] ${profiletyepe==='notification'?'text-sky-300':'text-emerald-600'}   `}/>
                    </div>
                    <h2 onClick={()=>{setProfiletype('notification'); navigate('/profile?tab=notification')}} className={ `text-xl text-gray-500 cursor-pointer hover:text-sky-600 font-semibold w-[80%] font-serif ${profiletyepe==='notification'?'text-sky-300':'text-gray-500'}`}>Notifications</h2>
                </div>
                <div className='flex gap-4 w-[100%] px-2 justify-center items-center  '>
                    <div className='w-[20%] h-[100%] flex justify-center items-center '>
                        <Store className={`h-[100%] w-[60%] hover:text-sky-600 cursor-pointer  ${profiletyepe==='orders'?'text-sky-300':'text-emerald-600'} `}/>
                    </div>
                    <h2 onClick={()=>navigate('/orders')} className={ `text-xl cursor-pointer text-gray-500 hover:text-sky-600 font-semibold w-[60%] font-serif ${profiletyepe==='orders'?'text-sky-300':'text-gray-500'}`}>My Orders</h2>
                    <ChevronRight onClick={()=>navigate('/orders')} className='text-emerald-700 h-[60%] cursor-pointer hover:text-sky-600 w-[20%]'/>
                </div>
            </div>
        </div>
          <div className=' w-[100%] h-[50%] md:h-[100%] md:w-[60%] gap-3 md:gap-[3rem] flex justify-center items-center  p-3 md:p-4  flex-col md:rounded-xl shadow-xl bg-white '>
                 {profiletyepe==='useredit'?      
                        <div className='w-[100%] md:w-[70%] flex flex-col h-full  justify-center gap-7 md:gap-[4rem]'>
                            <div className='flex flex-row justify-around items-center gap-3 md:gap-5'>
                                <p className='text-xs md:text-lg font-medium w-[30%] '>Username </p>
                                <p> :</p>
                               <div className='w-full flex flex-col gap-2 md:gap-4'>
                                 <input value={profile.username || ''} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className='w-full outline-0 shadow-2xl border-gray-500 border-1  text-gray-800  rounded-md pl-3 h-[2rem] md:h-[3.5rem] ' />
                                <p className='text-red-800'>{error.name}</p>
                                </div>
                            </div>
                            <div className='flex flex-row justify-around items-center gap-3 md:gap-5'>
                                <p className='text-xs md:text-lg font-medium w-[30%] '>E-Mail </p>
                                <p> :</p>
                               <div className='w-full flex flex-col gap-2 md:gap-4'>
                                <input value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className='w-full outline-0 shadow-2xl border-gray-500 border-1 rounded-md pl-3 text-gray-800 h-[2rem] md:h-[3.5rem] ' />
                                <p className='text-red-800'>{error.email}</p>
                                </div>                            
                            </div>
                            <div className='flex flex-row justify-around items-center gap-3 md:gap-5'>
                                <p className='text-xs md:text-lg font-medium w-[30%] '>Mobile Number </p>
                                <p> :</p>
                                <div className='w-full flex flex-col gap-2 md:gap-4'>
                                <input value={profile.mobile || ''} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} className='w-full outline-0 shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] text-gray-800 md:h-[3.5rem] ' />
                                <p className='text-red-800'>{error.mobile}</p>
        
                                </div>
                                    </div>


                            <div className='w-full flex justify-around  mt-[2%]'>
                                <button onClick={updateUser} className='w-[6rem] md:w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'>Update</button>
                                <button className='w-[6rem] md:w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
{updateloading&&<div className='absolute left-[60%]  '>
                <LoaderCircle  className='text-yellow-600 w-[2rem] h-[2rem] animate-spin'/>
                </div>}
                            </div>
                        </div>:
                        profiletyepe==='address'?
                    <div className='md:w-[100%] h-[100%] flex px-2 md:px-5 flex-col'>
                        <div className='w-[100%] md:w-[100%] md:h-[10%] flex p-2 md:p-3 md:px-4 rounded-lg shadow-xl  justify-between gap-7 md:gap-[4rem]'>
                            <h2 className='text-[10px] md:text-2xl font-medium text-center text-[#05162fb9]'>Add new Address</h2>
                            <button onClick={()=>navigate('/address')} className='w-[10rem] text-[10px] md:w-[15rem] bg-[#1c600f63] p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800 flex justify-center items-center gap-2'> <ArrowDownRight className='w-[1.2rem] h-[1.2rem]'/> Add Address</button>
                        </div>
                        <div className='w-[100%] md:w-[100%] flex flex-col h-[100%] md:h-[90%] justify-start gap-7 md:gap-[2rem] mt-5 overflow-y-auto'>
                            {
                                addresses.map((addr)=>{ 
                                    return <div key={addr.id} className='w-[100%] md:w-[100%] rounded-lg shadow-xl  flex p-2 md:p-3 md:px-4  justify-between gap-3 md:gap-[1rem]'>
                                    <div className='flex flex-col gap-2 md:gap-3'>
                                        <h2 className='text-xs text-gray-600 md:text-xl font-semibold '> {addr.address_type} </h2>
                                       
                                        <p className='text-[9px] md:text-base '> {addr.house_name} ,{addr.landmark} ,{addr.street}  </p>
                                        <p className='text-[9px] md:text-base '> {addr.city} ,{addr.pincode} </p>
                                         <p className=' text-[9px] md:text-base '> {addr.district} ,{addr.state} </p>
                                        <p className=' text-[9px] md:text-base '> Mobile : {addr.phone} </p>
                                    </div>
                                    <div className='flex flex-col justify-center items-center gap-3 md:gap-5'>
                                        <button onClick={()=>navigate(`/editaddress/${addr.id}`)} className='w-[3rem] md:w-[10rem] text-[10px] md:text-lg bg-blue-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-blue-800'>Edit</button>
                                        <button className='w-[3rem] md:w-[10rem] text-[10px] md:text-lg bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Delete</button>
                                    </div>
                                </div>
                                })
                            }
                            </div>
                        </div>
                        :profiletyepe==='notification'&&
                        <div className='md:w-[100%] h-[100%] flex px-2 md:px-5 flex-col'>
                        <div className='w-[100%] md:w-[100%] md:h-[10%] flex p-2 md:p-3 md:px-4   justify-between gap-7 md:gap-[4rem]'>
                            <h2 className='text-[10px] md:text-2xl font-medium text-center text-[#05162fb9]'>Notifications</h2>
                           
                        </div>
                        <div className='w-[100%] md:w-[100%] flex flex-col h-[100%] md:h-[90%] justify-start gap-7 md:gap-[2rem] mt-5 overflow-y-auto'>
                            {
                                notifications.length===0?<h2 className='text-center text-gray-600 font-semibold text-xl'>No Notifications</h2>:
                                notifications.map((notif)=>{ 
                                    return <div key={notif.id} className='w-[100%] md:w-[100%] bg-gray-200 rounded-sm shadow-lg  flex p-2 md:p-3 md:px-4  justify-between gap-3 md:gap-[1rem]'>
                                    <div className='flex flex-col gap-2 md:gap-3'>
                                        <h2 className='text-xs text-gray-600 md:text-xl font-semibold '> {notif.title} </h2>
                                       
                                        <p className='text-[9px] md:text-base '> {notif.message}  </p>
                                        <p className=' text-[9px] md:text-base '> {new Date(notif.date).toLocaleString()} </p>
                                       
                                    </div>
                                    
                                </div>
                                })
                            }
                            </div>
                        </div>
                        
                        
                        }

                    </div>
                    

                    <div className=' md:hidden w-[100%] h-[50%] md:h-auto md:w-[60%] gap-3 md:gap-[3rem] flex py-5 items-center p-3 md:p-4  flex-col  rounded-xl shadow-xl bg-white '>
                        
                        <div className='w-[100%] md:w-[60%] flex flex-col  gap-6 md:gap-9 p-2'>
                          <div onClick={()=>{setProfiletype('address'); navigate('/profile?tab=address')}} className='flex flex-row justify-between items-center gap-3 md:gap-5 shadow-lg py-2 px-6 rounded-lg '>
                                <p className='text-xs md:text-lg font-extrabold w-[80%] '>Manage address </p>
                                <BookOpenIcon className='text-yellow-600 w-[20%]'/>
                            </div>
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