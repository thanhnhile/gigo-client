import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { httpGetProductById } from '../../apiService/productService';
import Detail from '../../components/Product/Detail';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  useEffect(() => {
    const getProductById = async () => {
      const response = await httpGetProductById(id);
      console.log(response.data);
      setProduct(response.data);
    };
    getProductById();
  }, [id]);
  return (
    <>
      <Detail product={product}/>
    </>
  )
}

export default ProductDetail;
