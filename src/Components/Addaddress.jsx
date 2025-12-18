import React, { useEffect, useState } from 'react'
import { useAuth } from '../Redux/AuthProvider';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { AddressApi } from '../Redux/api';
import { toast } from 'react-toastify';
import api from '../Redux/Interceptor';

function Addaddress() {
        const {userInfo}=useAuth()
        const navigate=useNavigate('')
    const [address,setAdress]=useState({
        user:userInfo.userid,
        full_name:'',
        phone:'',
        email:'',
        house_name:'',
        street:'',
        landmark:'',
        city:'',
        district:'',
        state:'',
        pincode:'',
        address_type:''
    })
    const [error,seterror]=useState({
        user:userInfo.userid,
        full_name:'',
        phone:'',
        email:'',
        house_name:'',
        street:'',
        landmark:'',
        city:'',
        district:'',
        state:'',
        pincode:'',
        address_type:''
    })

    useEffect(()=>{
    if(address){
      setAdress({...address,full_name:userInfo?.username,email:userInfo?.email})}
    },[userInfo?.username])

    const SaveAdress=async()=>{
        try{
            const res=await api.post(AddressApi,address,{
                    headers: { 'Content-Type': 'multipart/form-data' },
                    withCredentials: true
                })
            console.log(res.data)
            toast.success('Saved')
            navigate('/cart')
        }
        catch(er){
            console.log(er)
        }
        
    }


  return (
   <div className='h-[100%] w-[99%] md:w-[50%] flex flex-col justify-center items-center bg-gradient-to-r from-red-200 to-white mx-[.5rem] my-2 rounded-xl shadow-xl py-[.5rem] px-[.5rem] md:p-[.5rem] '>
        <h2 className='text-blue-950 mx-[3rem] md:mx-[13rem] tracking-widest  text-lg md:text-3xl font-extrabold'>Address</h2>
        <form className='flex flex-col gap-[1rem] my-[.5rem] md:mx-[1rem] p-3 md:p-6'>
           <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.full_name} onChange={(e)=>{
              setAdress({...address,full_name:e.target.value})
              }} className='bg-white pl-[.5rem]  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] border-1 ' placeholder='Customer Name'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.full_name}</i>
            </div>
           <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.phone} onChange={(e)=>{
              setAdress({...address,phone:e.target.value})
              }} className='bg-white pl-[.5rem]  border-1  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Mobile'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.phone}</i>
            </div>
            <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.email} onChange={(e)=>{
              setAdress({...address,email:e.target.value})
              }} className='bg-white pl-[.5rem]  border-1  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Email Address'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.email}</i>
            </div>
            <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.house_name} onChange={(e)=>{
              setAdress({...address,house_name:e.target.value})
              }} className='bg-white pl-[.5rem]  border-1  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='House'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.house_name}</i>
            </div>
            <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.street} onChange={(e)=>{
              setAdress({...address,street:e.target.value})
              }} className='bg-white pl-[.5rem]  border-1  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Street'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.street}</i>
            </div>
            <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.landmark} onChange={(e)=>{
              setAdress({...address,landmark:e.target.value})
              }} className='bg-white pl-[.5rem]  border-1  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Landmark'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.landmark}</i>
            </div>
            <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.city} onChange={(e)=>{
              setAdress({...address,city:e.target.value})
              }} className='bg-white pl-[.5rem] border-1 outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='City'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.city}</i>
            </div>
            <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.district} onChange={(e)=>{
              setAdress({...address,district:e.target.value})
              }} className='bg-white pl-[.5rem] border-1 outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='District'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.district}</i>
            </div>
             <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={address.state} onChange={(e)=>{
              setAdress({...address,state:e.target.value})
              }} className='bg-white pl-[.5rem] border-1 outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='State'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.state}</i>
            </div>
             <div className='w-[20rem] md:w-[40rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
           <div className='w-[100%] flex gap-3 md:gap-8'>
            <input value={address.pincode} onChange={(e)=>{
              setAdress({...address,pincode:e.target.value})
              }} className='bg-white pl-[.5rem] outline-none border-1 md:pl-[1.5rem] w-[60%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Pincode'/>
           <select value={address.address_type} onChange={(e)=>setAdress({...address,address_type:e.target.value})} className='p-1 md:p-3 rounded-xl w-[33%] bg-white border-1'>
              <option value={'Home'}>Home</option>
              <option value={'Work'}>Work</option>
              <option value={'Other'}>Other</option>
           </select>
            </div>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.pincode}</i>
            </div>
           
            

            <button type='button' onClick={SaveAdress} className='w-100% cursor-pointer mt-[7%] font-extrabold bg-green-700 text-white rounded-lg hover:bg-green-900 p-2'>Save Address</button>

        </form>
        
    </div>
  )
}

export default Addaddress