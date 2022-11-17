import React from 'react'
import Slider from '../../components/Slider'
import Section from '../../components/Section'
import ListProduct from '../../layouts/components/Product/ListProduct';

function Home() {
  return (
    <div>
      <Slider />
      <Section reverse />
      <ListProduct />
      <Section />
    </div>
  )
}

export default Home
