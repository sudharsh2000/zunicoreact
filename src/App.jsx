import { createContext, useEffect, useRef, useState } from 'react'

import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage'

import SignupPage from './Pages/Signup'
import { BrowserRouter,Routes,Route, useNavigate, Navigate } from 'react-router-dom'
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
  const interceptorSetup = useRef(false)
  
const {userInfo}=useAuth()
const { login,logout, setLoading } = useAuth();

useEffect(() => {
  const load = async () => {
    try {
      logout()
      setFlash(true);

      const res = await axios.post(refreshapi, {}, { withCredentials: true });

      const decode = res.data.user;
      console.log('res',res.data.access_token )
login(res.data.access_token, {
            username: decode.username,
            userid: decode.userid,
            email: decode.email,
            mobile: decode.mobile,
            superuser: decode.is_superuser,
          })
          console.log('User logged in from refresh token');
      
    } catch (e) {
      console.error(e);
    } finally {
      setFlash(false);
      setLoading(false); // ✅ VERY IMPORTANT
    }
  };

  load();
},[])
// App.jsx
useEffect(() => {
 if (!interceptorSetup.current) {
    setupInterceptors(auth)
    interceptorSetup.current = true
  }
}, []) // 👈 EMPTY dependency

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
     <Route
        path="/admin"
        element={<Navigate to="/admin/dashboard" replace />}
      />
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
