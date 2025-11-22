import { User2Icon } from 'lucide-react'
import React from 'react'

function AdminProfile({profile,setProfile}) {
      const updateUser=async()=>{
        
       try{ const res=await api.patch(`${usersapi}${profile.id}/`,profile)
        console.log(res.data)
        toast.success('Updated')
       }
       catch (er){
        console.error(er)
        toast.error('Updation Failed')
       }
        
    }
  return (
    <div className='w-[100%] h-[100%] gap-3 md:gap-[3rem] flex justify-center  flex-col items-center '>
                        <User2Icon className='h-[15%] w-[15%]' />
                        <h2 className='text-lg md:text-2xl'>Welcome Admin</h2>
                        <div className='w-[90%] md:w-[60%] flex flex-col  gap-3 md:gap-9'>
                            <div className='flex flex-row justify-around gap-5'>
                                <p className='text-lg font-extrabold w-[35%] '>Admin </p>
                                <p> :</p>
                                <input value={profile.username || ''} onChange={(e) => setProfile({ ...profile, username: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1    rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>
                            <div className='flex flex-row justify-around gap-5'>
                                <p className='text-lg font-extrabold w-[35%] '>E-Mail </p>
                                <p> :</p>
                                <input value={profile.email || ''} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>
                            <div className='flex flex-row justify-around gap-5'>
                                <p className='text-lg font-extrabold w-[35%] '>Mobile Number </p>
                                <p> :</p>
                                <input value={profile.mobile || ''} onChange={(e) => setProfile({ ...profile, mobile: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' />
                            </div>


                            <div className='w-full flex justify-around gap-5 md:gap-2  mt-[2%]'>
                                <button onClick={updateUser} className='w-[10rem] text-sm md:text-lg bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'>Update</button>
                                <button className='w-[10rem] text-sm md:text-lg bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>

                            </div>
                        </div>

                    </div> 
  )
}

export default AdminProfile