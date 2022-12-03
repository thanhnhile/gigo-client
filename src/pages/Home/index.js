import React from 'react';
import Slider from '../../components/Slider';
import Section from '../../components/Section';
import ListProduct from '../../components/Product/ListProduct';

function Home() {
  return (
    <div>
      <Slider />
      <ListProduct />
      <Section reverse />
      <Section />
    </div>
  );
}

export default Home;
