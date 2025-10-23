import { createContext, useContext, useState } from "react";



const Authcontext=createContext()

import React from 'react'

export function AuthProvider({children}) {

const[accesstoken,setAccesstoken]=useState('')
const [userInfo,setUserInfo]=useState()

const login=(token,info)=>{
    setAccesstoken(token)
    setUserInfo(info)

}
const logout=()=>{
    setAccesstoken(null)
    setUserInfo(null)
}


  return (
    <Authcontext.Provider value={{login,logout,accesstoken,userInfo}}>
        {children}

    </Authcontext.Provider>
  )
}



export const useAuth=()=>{
    return useContext(Authcontext)
}