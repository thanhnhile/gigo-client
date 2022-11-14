import React from 'react'
import Slider from '../../components/Slider'
import Section from '../../components/Section'

function Home() {
  return (
    <div>
      <Slider />
      <Section reverse />
      <Section />
    </div>
  )
}

export default Home
