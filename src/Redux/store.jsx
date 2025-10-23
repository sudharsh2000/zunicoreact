import { configureStore } from "@reduxjs/toolkit";
import UserSlice from './UserSlice'
const store=configureStore({
    reducer:{
       counter: UserSlice
    }
})

export default store