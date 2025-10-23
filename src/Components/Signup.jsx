import axios from 'axios'
import React, { useState } from 'react'
import { signupapi } from '../Redux/api'
import { useNavigate } from 'react-router'

function Signup() {
  const [name,setname]=useState('')
  const [mail,setmail]=useState('')
  const [mobile,setMobile]=useState('')
  const [password,setpassword]=useState('')
  const [cpassword,setcpassword]=useState('')
  const navigate=useNavigate()
  const [error,seterror]=useState({
    name:'',
    email:'',
    mobile:'',
    password:'',
    cpassword:''
  })
  const email_expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const pass_expression=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const signupfunction= async()=>{
    const userdata={
      'username':name,
      'password':password,
      'email':mail,
      'mobile':mobile
    }
    if(validation()){
      try{
     const res=await  axios.post(signupapi,userdata,{withCredentials:true})
     console.log(res.data);
     navigate('/signin')
      }
      catch(er){
        console.error(er)
      }
    }
    else{
      console.log('failed')
    }
  }
  const validation=()=>{
    let statement=true;
    const newerror={name:'',email:'',mobile:'', password:'',cpassword:''}
    if(!name)
      {
        
                newerror.name='Please enter the name'
                statement=false;
            }
    if(!mail ){
                newerror.email='Please enter the Email Address'
         statement=false;
              }
      else if(!email_expression.test(mail)){
                newerror.email='Please enter Valid Email Address'
            statement=false;
              }
              if(!mobile){
                newerror.mobile='Please enter Valid Mobile Number'
            statement=false;
              }
              else if(mobile.length!==10){
                newerror.mobile='Please enter Valid Mobile Number'
            statement=false;
              }
                if(!password){
                newerror.password='Please enter password'
             statement=false;
              }
              else if(!password.length>=8){
            newerror.password='Password should minimum 8 characters'
          statement=false;  
          }
              else if(pass_expression.test(password)){
              newerror.password='Password contain mixture of letters ,numbers and Capital letters '
        statement=false;
              }
              if(!cpassword){
              newerror.cpassword='Password missmatch'
                statement=false;
              }
               else if(password!==cpassword){
                newerror.cpassword='Password missmatch'
                statement=false;
              }
    
    seterror(newerror)
    return statement
  
  }
  return (
    <div className='h-fit bg-gradient-to-r from-red-900 to-black mx-[.5rem] my-[4rem] rounded-xl shadow-xl py-[1.5rem] px-[.5rem] md:p-[2rem] '>
        <h2 className='text-white mx-[3rem] md:mx-[13rem] tracking-widest  text-lg md:text-3xl font-extrabold'>Signup</h2>
        <form className='flex flex-col gap-[1rem] my-[1rem] md:mx-[3rem] p-3 md:p-6'>
           <div className='w-[20rem] md:w-[30rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={name} onChange={(e)=>{
              setname(e.target.value);seterror({...error,name:''})
              }} className='bg-white pl-[.5rem] outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Username'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.name}</i>
            </div>
           <div className='w-[20rem] md:w-[30rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input type="email" value={mail} onChange={(e)=>{
              setmail(e.target.value);
              seterror({...error,email:''});
              if(!name){
                seterror({...error,name:'Please enter the username'})
              }
              }} className='bg-white pl-[.5rem]  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Email Address'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.email}</i>
            </div>
             <div className='w-[20rem] md:w-[30rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input type="tel" value={mobile} onChange={(e)=>{
              setMobile(e.target.value);
              seterror({...error,mobile:''});
              if(!mail ){
                seterror({...error,email:'Please enter the Email Address'})
              }
              else if(!email_expression.test(mail)){
                seterror({...error,email:'Please enter Valid Email Address'})
              }
              }} className='bg-white pl-[.5rem]  outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Mobile Number'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.mobile}</i>
            </div>
            <div className='w-[20rem] md:w-[30rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={password} onChange={(e)=>{
              setpassword(e.target.value);
              seterror({...error,password:''});
              if(!mobile ){
                seterror({...error,mobile:'Please enter the Mobile number'})
              }
              else if(mobile.length!=10){
                seterror({...error,mobile:'Please enter Valid mobile number'})
              }
            }
              } type="password" className='bg-white pl-[.5rem] outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Password'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.password}</i>
            </div> 
            <div className='w-[20rem] md:w-[30rem] flex flex-col justify-start items-start gap-1.5 md:gap-3.5'>
            <input value={cpassword} onChange={(e)=>{
              setcpassword(e.target.value);
              seterror({...error,cpassword:''})
              if(!password){
                seterror({...error,password:'Please enter password'})
              }
              else if(!password.length>=8){
            seterror({...error,password:'Password should minimum 8 characters'})
              }
              else if(pass_expression.test(password)){
              seterror({...error,password:'Password contain mixture of letters ,numbers and Capital letters '})

              }
              else if(!password===cpassword){
                seterror({...error,cpassword:'Password missmatch'})
              }
              
              }} type="password" className='bg-white pl-[.5rem] outline-none md:pl-[1.5rem] w-[97%] h-[2rem] rounded-lg  md:h-[2.6rem] ' placeholder='Confirm password'/>
            <i className='text-red-200 ml-1.5 md:ml-6'>{error.cpassword}</i>
            </div>

            <button type='button' onClick={signupfunction} className='w-100% cursor-pointer mt-[7%] font-extrabold bg-green-700 text-white rounded-lg hover:bg-green-900 p-2'>Sign up</button>

        </form>
        <div className='w-full justify-center items-center flex'>
          <p onClick={()=>navigate('/signin')} className='text-white '>Already have an account ? <i className='text-green-50 cursor-pointer hover:text-green-300 '>Sign In</i></p>
        </div>
    </div>
  )
}

export default Signup