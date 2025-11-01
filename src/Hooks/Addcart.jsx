import { CartApi } from "../Redux/api"

import api from "../Redux/Interceptor"

export const addTocart=async(cartdata,apitype,id)=>{
        
    try{
        let res='';
        let retundata=''
        console.log(apitype)
        if(apitype==='post'){
            console.log(cartdata)
         res=await api.post(CartApi,cartdata)
         console.log(res)
         retundata=res.status
        }
        if(apitype==='get'){
             res=await api.get(`${CartApi}?user=${id}`) 
             retundata=res.data
        }
        if(apitype==='delete'){
            res=await api.delete(`${CartApi}${id}/`) 
             retundata=res.status
        }
        console.log(retundata)
        return retundata

    }
    catch(er){
        console.error(er)
        return er
    }
}