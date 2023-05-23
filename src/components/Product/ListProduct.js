import React, { useState, useEffect, useCallback } from 'react';
import ProductItem from './ProductItem';
import className from 'classnames/bind';
import styles from './Product.module.scss';

import { useAuth } from '~/hooks';
import { httpGetProductLiked } from '../../apiServices/accountServices';

const cx = className.bind(styles);

function ListProduct(props) {
  const { auth } = useAuth();
  const [productsLiked, setProductsLiked] = useState([]);
  const getProductLiked = async () => {
    const response = await httpGetProductLiked();
    if (response?.data) {
      setProductsLiked(response.data);
    }
  };
  const checkProductIsLiked = useCallback(
    (productId) => {
      if (productsLiked?.length <= 0) return false;
      return productsLiked.filter((item) => item?.id === productId).length > 0;
    },
    [productsLiked]
  );
  useEffect(() => {
    auth?.username && getProductLiked();
  }, [auth?.username]);
  return (
    <div className={cx('wrapper', 'container')}>
      {props.title && <h2>{props.title}</h2>}
      <div className={cx('flex-box')}>
        {props.product.map((product, index) => (
          <ProductItem
            product={product}
            key={index}
            isLiked={checkProductIsLiked(product?.id)}
          ></ProductItem>
        ))}
      </div>
    </div>
  );
}

export default ListProduct;
