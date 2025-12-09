import React, { useState } from 'react'
import Categories from './Categories'
import Carousel from './Carousel'
import demo from '../assets/demo.jpg'
import Rowitems from './Rowitems'
import Searchbar from './Searchbar'

function HomeBody() {

  return (
   
     <div className='mx-2 md:mx-10 min-h-[100vh] pb-[5rem] md:pb-0 '>
      <Searchbar/>
      <Categories  />
      <Carousel/>
      <Rowitems  ali_type={'row'} Title={'Best Deals'} />
      <Rowitems  ali_type={'col'} Title={'Top Categories'}/>
      
    </div>
    
    
    
  )
}

export default HomeBody