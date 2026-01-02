import { CartApi, CartItemApi } from "../Redux/api"

import api from "../Redux/Interceptor"

export const addTocart=async(cartdata,apitype,id)=>{
        
    try{
        let res='';
        let retundata=''
       console.log(apitype)
        if(apitype==='post'){
            console.log(cartdata)
         res=await api.post(CartApi,cartdata,{withCredentials:true})
         console.log(res)
         retundata=res.status
        }
        if(apitype==='get'){
             res=await api.get(`${CartApi}?user=${id}`) 
             retundata=res.data
        }
        if(apitype==='delete'){
            console.log('delete call')
            res=await api.delete(`${CartItemApi}${id}/`) 
             retundata=res.status
        }
   
        return retundata

    }
    catch(er){
        console.error(er)
        return er
    }
}