import { createSlice } from "@reduxjs/toolkit";

const Userslice=createSlice({
    name:'userslice',
    initialState:{
        username:'',
        admin:false
    },
    reducers:{
        usersave:(state,action)=>{
            state.username=action.payload.name
            state.admin=action.payload.status

        }
    }
})

export const  {usersave} =Userslice.actions
export default Userslice.reducer