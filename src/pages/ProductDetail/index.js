import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { httpGetProductById } from '../../apiServices/productServices';
import Detail from '../../components/Product/Detail';

function ProductDetail() {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    const getProductById = async () => {
      const response = await httpGetProductById(id);
      setProductDetail(response.data);
    };
    getProductById();
  }, [id]);
  return (
    <>
      <Detail product={productDetail?.product} rates={productDetail?.rates} />
    </>
  );
}

export default ProductDetail;
