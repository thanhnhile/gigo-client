import React from 'react';
import { Link } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Product.module.scss';

import { formatPrice } from '~/utils/format';
const cx = className.bind(styles);
const Product = (props) => {
  const { product } = props;

  return (
    // <div className="listproduct-product">
    //     <a href={"/detail/" + product.id}>
    //         <img className="imgProd" src={product.image}></img>
    //         <p className="listproduct-product-name">{product.name}</p>
    //         <span className="price">{product.price}đ</span>
    //     </a>
    //     <div className="buy">
    //         <a href="/cart" onClick={() => AddToCart(product)}> Mua Ngay</a>
    //     </div>
    // </div>
    product.status && (
      <div className={cx('product')}>
        <div className={cx('product__item')}>
          <Link to={'/products/' + product.id}>
            <img
              className={cx('product__img')}
              src={product.imgURL}
              alt={product.name}
            />
            <span className={cx('product__name')}>{product.name}</span>
            <span className={cx('product__price')}>
              {formatPrice(product.price)}
            </span>
          </Link>
        </div>
      </div>
    )
  );
};

export default Product;
