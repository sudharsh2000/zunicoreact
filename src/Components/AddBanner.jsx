import React from 'react'

function AddBanner() {
  return (
 <div className='w-[100%] h-[100%] flex justify-center flex-col items-center'>
                            <div className='w-[50%] gap-3 flex flex-col md:gap-[1rem] p-5' >
                                <div className='w-full gap-5'>
                                    <input value={banner} onChange={(e) => Setbanner( e.target.value )} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Banner Name' />
                                    <p></p>
                                </div>

                                <div className='w-full  gap-5'>

                                    <FileUploader resettrigger={resetTrigger} fileref={fileref} onFileselect={(file) => { setImages(file) }} />
                                </div>
                                <div className='flex justify-around mt-[2rem] '>
                                    <button onClick={saveBanner} className='w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Add Banner</button>
                                    <button onClick={() => clearfunction('banner')} className='w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                                </div>

                            </div>
                        </div> 
  )
}

export default AddBanner