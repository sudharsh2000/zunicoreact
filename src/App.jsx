import { useEffect, useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage'

import SignupPage from './Pages/Signup'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Signin from './Pages/Signin'
import AdminLogin from './Pages/AdminLogin'
import AdminHome from './Pages/AdminHome'
import {AuthProvider, useAuth} from './Redux/AuthProvider'
import api, { setupInterceptors } from './Redux/Interceptor'
import ProductDetail from './Pages/ProductDetail'
import axios from 'axios'
import { refreshapi } from './Redux/api'
import { jwtDecode } from 'jwt-decode'
import ProductList from './Pages/ProductList'
import Cart from './Pages/Cart'
import { ToastContainer } from 'react-toastify'
import AddressPage from './Pages/AddressPage'
import UserHomePage from './Pages/UserHomePage'


function App() {
  
  const auth=useAuth()
  const {login}=useAuth()
useEffect(()=>{
setupInterceptors(auth);
const load=async()=>{
try{
  const res=await axios.post(refreshapi,{},{withCredentials:true})
  console.log(res.data)
  const decode=jwtDecode(res.data.access_token)
  login(res.data.access_token, {
            'username':decode.username,
        'userid':decode.user_id,
        'superuser':decode.is_superuser
            
          });

}
catch(e){
console.error(e)
}
}
load();
},[])
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000} // closes after 3 seconds
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={ <Homepage/>} />
      <Route path="/signup" element={ <SignupPage/>} />
      <Route path="/signin" element={ <Signin/>} />
      <Route path="/admin/signin" element={ <AdminLogin/>} />
      <Route path="/admin/dashboard" element={<AdminHome/>}/>
      <Route path='/detail/:id' element={<ProductDetail/>} />
      <Route path='/list' element={<ProductList/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/address' element={<AddressPage/>} />
      <Route path='/profile' element={<UserHomePage/>} />
    </Routes>
  
    </BrowserRouter>
     
    </>
  )
}

export default App
