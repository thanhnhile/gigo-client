import React, { useEffect, useState } from 'react';
import Slider from '../../components/Slider';
import Section from '../../components/Section';
import ListProduct from '../../components/Product/ListProduct';
import { httpGetBestSeller, httpGetCombo, httpGetProductsForYou } from '../../apiServices/productServices';

const Home = () => {
  const [productBestSeller, setProductBestSeller] = useState([]);
  const [productForYou, setProductForYou] = useState([]);
  const [combo, setCombo] = useState([]);
  useEffect(() => {
    const getBestSeller = async () => {
      const response = await httpGetBestSeller();
      if (response?.data) {
        setProductBestSeller(response.data);
      }
    };
    const getProductsForYou = async () => {
      const response = await httpGetProductsForYou();
      if (response?.data) {
        setProductForYou(response.data);
      }
    };
    const getCombo = async () => {
      const response = await httpGetCombo();
      if (response?.data) {
        setCombo(response.data);
      }
    };

    getBestSeller();
    getProductsForYou();
    getCombo();
  }, []);
  return (
    <div>
      <Slider />
      { productForYou.length > 0 
        ? <ListProduct product={productForYou} title='Dành cho bạn' /> 
        : <div></div>
      }
      
      <ListProduct product={productBestSeller} title='Bán chạy nhất' />
      <ListProduct product={combo} title='Combo siêu HOT' />
      <Section reverse />
      <Section />
    </div>
  );
};

export default Home;
