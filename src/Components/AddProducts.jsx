
import React from 'react'

function AddProducts() {
  return (
     <div className='w-[100%] h-[100%] flex justify-center flex-col items-center'>
                            <div className='w-[50%] gap-3 flex flex-col md:gap-[1rem] p-5' >
                                <div className='w-full gap-5'>
                                    <input value={products.name} onChange={(e) => setProducts({ ...products, name: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' placeholder='Product Name' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <select value={products.category || ''} onChange={(e) => setProducts({ ...products, category: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] '>
                                        <option value={''}>-- Select Category --</option>
                                        {
                                            categoryItems &&
                                            categoryItems.map((item) => {
                                                return <option value={item.id} key={item.id}>{item.name}</option>
                                            })
                                        }

                                    </select>
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input value={products.price} onChange={(e) => setProducts({ ...products, price: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' type="number" Placeholder='Product Price' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input value={products.cost} onChange={(e) => setProducts({ ...products, cost: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' type="number" Placeholder='Product Cost' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input value={products.description} onChange={(e) => setProducts({ ...products, description: e.target.value })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product Description' />
                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input type="number" value={products.discount} onChange={(e) => setProducts({ ...products, discount: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product discount' />

                                    <p></p>
                                </div>
                                <div className='w-full gap-5'>
                                    <input type="number" value={products.stock} onChange={(e) => setProducts({ ...products, stock: e.target.value ? parseFloat(e.target.value) : '' })} className='w-full shadow-2xl border-gray-500 border-1 rounded-md pl-3 h-[2rem] md:h-[2.5rem] ' Placeholder='Product Stock' />
                                    <p></p>
                                </div>
                                <div className='w-full  gap-5'>
                                    <FileUploader fileref={fileref} resettrigger={resetTrigger} onFileselect={(file) => {
                                        console.log(file); setImages(file); setProducts({ ...products, image: file[0] })
                                    }} />
                                </div>
                                <div className='flex justify-around mt-[2rem] '>
                                    <button onClick={saveProducts} className='w-[10rem] bg-green-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-green-800'> Add Product</button>
                                    <button onClick={() => clearfunction('products')} className='w-[10rem] bg-red-600 p-2 text-white font-extrabold rounded-lg cursor-pointer hover:bg-red-800'>Clear</button>
                                </div>

                            </div>
                        </div>
  )
}

export default AddProducts