import axios from 'axios'
import React, { useState } from 'react'
import { refreshapi, signinapi } from '../Redux/api'
import { useNavigate } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { usersave } from '../Redux/UserSlice'
import { useAuth } from '../Redux/AuthProvider'
import { jwtDecode } from 'jwt-decode'
import { LoaderCircle } from 'lucide-react'
function SigninPage() {
  const navigate=useNavigate()
  
  const {login} =useAuth()
  const {accesstoken}=useAuth()
 const {userInfo}=useAuth()
  const [name,setname]=useState('')

   const [password,setpassword]=useState('')
  
   const [error,seterror]=useState('')


  const[loading,setLoading]=useState(false)





  const signupfunction= async()=>{
      const signdata={
        'username':name,
        'password':password,
        'superuser':false
      }
     if(validation()){
      try{
        setLoading(true)
      const res=await axios.post(signinapi,signdata,{withCredentials:true})
      console.log(res.data.access_token)
      const decode=res.data.user;
     
      login(res.data.access_token,{
        'username':decode.username,
        'userid':decode.userid,
        'mobile':decode.mobile,
        'email':decode.email,
        'superuser':false
      })

  

      // console.log(userInfo)
       navigate('/')
      }
      catch(er){
        console.error('invalid login');
        seterror('Invalid Username or Password ');
      }
      finally{
        setLoading(false)
      }
     }
     else{
       console.log('failed')
     }
   }
   const validation=()=>{
     let statement=true;
     
     if(!name || !password)
       {
        
                 seterror('Invalid Username or Password ')
                 statement=false;
             }
     
             
     
     
     return statement
   
   }
   return (
     <div className='h-fit bg-gradient-to-r from-emerald-100 to-emerald-800 mx-[.5rem] my-[4rem] rounded-xl shadow-xl py-[1.5rem] px-[.5rem] md:p-[2rem] '>
         <h2 className='text-white mx-[3rem] md:mx-[13rem] tracking-widest  text-lg md:text-3xl font-extrabold'>Sign In</h2>
         <form className='flex flex-col gap-[1.3rem] md:gap-[2rem] my-[1rem] md:mx-[3rem] p-3 md:p-6'>
            <div className='w-[20rem] md:w-[30rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
             <input value={name} onChange={(e)=>{
               setname(e.target.value);
               }} className='bg-white pl-[.5rem] outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Username'/>
             
             </div>
            
             <div className='w-[20rem] md:w-[30rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
             <input value={password} onChange={(e)=>{
               setpassword(e.target.value);
               
               
             }
               } type="password" className='bg-white pl-[.5rem] outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Password'/>
             <i className='text-red-200 ml-1.5 md:ml-6'>{error}</i>
             
             </div> 
            
              
             <button type='button' onClick={signupfunction} className='w-[98%] shadow-xl cursor-pointer mt-[7%] font-extrabold border-1 border-green-100 hover:bg-green-900 text-white rounded-lg  p-2'>Sign In</button>
 
         </form>
         <div className='w-full justify-center items-center flex'>
          <p onClick={()=>navigate('/signup')} className='text-white '>Dont have an account? <i className='text-blue-50 cursor-pointer hover:text-blue-300 '>Signup</i></p>
        {loading&&<div className='absolute left-[50%]  '>
                <LoaderCircle  className='text-yellow-600 w-[2rem] h-[2rem] animate-spin'/>
                </div>}
        </div>
        
     </div>
   )
}

export default SigninPage