import React, { useEffect, useState } from 'react'
import Slider from '../../components/Slider'
import Section from '../../components/Section'
import ListProduct from '../../components/Product/ListProduct';
import { httpGetAllProduct } from '../../apiService/productService';

const Home = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getAllProduct = async () => {
      const response = await httpGetAllProduct();
      console.log(response.data);
      setProduct(response.data.content);
    };
    getAllProduct();
  }, []);
  return (
    <div>
      <Slider />
      <ListProduct product={product}/>
      <Section reverse />
      <Section />
    </div>
  )
};

export default Home;
