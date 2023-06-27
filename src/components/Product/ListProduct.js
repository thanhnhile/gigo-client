import React from 'react';
import ProductItem from './ProductItem';
import className from 'classnames/bind';
import styles from './Product.module.scss';

import { useAuth } from '~/hooks';

const cx = className.bind(styles);

function ListProduct(props) {
  const { productsLiked } = useAuth();
  const checkProductIsLiked = (productId) => {
    if (productsLiked?.length <= 0) return false;
    return productsLiked.filter((item) => item === productId).length > 0;
  };
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
