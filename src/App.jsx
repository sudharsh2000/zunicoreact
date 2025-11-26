import { createContext, useEffect, useState } from 'react'

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
import CheckoutPage from './Pages/CheckoutPage'
import OrderPage from './Pages/OrderPage'
import FlashScreen from './Components/FlashScreen'
import SearchSuggestion from './Components/SearchSuggestion'
import Wishlist from './Pages/Wishlist'
import WishlistPage from './Pages/Wishlist'

export const Flashcontext=createContext(null)
function App() {
    const [flash,setFlash]=useState(false)
  const auth=useAuth()
  const {login,logout}=useAuth()
useEffect(()=>{
setupInterceptors(auth);
const load=async()=>{
try{
  const res=await axios.post(refreshapi,{},{withCredentials:true})

  const decode=jwtDecode(res.data.access_token)
  console.log(decode.superuser)
  login(res.data.access_token, {
            'username':decode.username,
        'userid':decode.user_id,
        'superuser':decode.superuser
            
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
         <Flashcontext.Provider value={{setFlash,flash}}> 
         
          {flash && <FlashScreen />}
    <BrowserRouter>
    
    <Routes>
    
          
       
      <Route path="/" element={ <Homepage/>} />
       <Route path="/searchsuggest" element={ <SearchSuggestion/>} />
      <Route path="/signup" element={ <SignupPage/>} />
      <Route path="/signin" element={ <Signin/>} />
      <Route path="/admin/signin" element={ <AdminLogin/>} />

      <Route path="/admin/dashboard" element={<AdminHome/>}/>

      <Route path='/detail/:id' element={<ProductDetail/>} />
      
      <Route path='/list' element={<ProductList/>} />

      <Route path='/cart' element={<Cart/>} />
      <Route path='/address' element={<AddressPage/>} />
      <Route path='/profile' element={<UserHomePage/>} />
      <Route path='/checkout' element={<CheckoutPage/>} />
      <Route path='/orders' element={<OrderPage/>} />
      <Route path='/wishlist' element={<WishlistPage/>} />

    </Routes>
  
    </BrowserRouter>
           </Flashcontext.Provider>
     
    </>
  )
}

export default App
