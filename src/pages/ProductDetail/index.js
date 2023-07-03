import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useToastError } from '~/hooks';
import { httpGetProductById } from '~/apiServices/productServices';
import Detail from '../../components/Product/Detail';

function ProductDetail() {
  const { id } = useParams();
  const { showToastError } = useToastError();
  const [productDetail, setProductDetail] = useState({});
  useEffect(() => {
    const getProductById = async () => {
      try {
        const response = await httpGetProductById(id);
        setProductDetail(response.data);
      } catch (error) {
        showToastError(error);
      }
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
