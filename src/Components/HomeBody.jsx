import React from 'react'
import Categories from './Categories'
import Carousel from './Carousel'
import demo from '../assets/demo.jpg'
import Rowitems from './Rowitems'
function HomeBody() {
  return (
    <div className='mx-2 md:mx-10  '>
      <Categories/>
      <Carousel/>
      <Rowitems ali_type={'row'} Title={'Best Deals'} />
      <Rowitems ali_type={'col'} Title={'Top Categories'}/>
      
    </div>
  )
}

export default HomeBody