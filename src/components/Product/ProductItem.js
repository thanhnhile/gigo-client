import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Product.module.scss';

import { formatPrice, formatPercent } from '~/utils/format';
import { httpLikeProduct, httpUnlikeProduct } from '~/apiServices/likeServices';
const cx = className.bind(styles);
const Product = (props) => {
  const { product, isLiked = false } = props;
  const [liked, setLiked] = useState(isLiked);

  const handleLike = async () => {
    const res = await httpLikeProduct(product.id);
    if (res?.errMsg === null) {
      setLiked(true);
    }
  };
  const handleUnlike = async () => {
    const res = await httpUnlikeProduct(product.id);
    if (res?.errMsg === null) {
      setLiked(false);
    }
  };
  return (
    product.status && (
      <div className={cx('product')}>
        <div className={cx('product__item')}>
          <Link to={'/products/' + product.id}>
            {!!product?.avgPoint && (
              <div className={cx('circle')}>
                <h3>
                  {product.avgPoint}
                  <Icon icon={cx('material-symbols:star')} color='yellow' />
                </h3>
              </div>
            )}
            <div className={cx('img')}>
              <img
                className={cx('product__img')}
                src={product.img_url}
                alt={product.name}
              />
            </div>
            <span className={cx('product__name')}>{product.name}</span>
            <span className={cx('product__price')}>
              <span className={cx('discount')}>{formatPrice(product.price / (1 - product.discount))}</span>
              {formatPrice(product.price)}
            </span>
          </Link>
          <span className={cx('discount-ticket')}>
            <h3>
              - {formatPercent(product.discount)}
            </h3></span>
          <span className={cx('heart')}>
            {liked ? (
              <Icon
                icon='mdi:cards-heart'
                color={'red'}
                onClick={handleUnlike}
              />
            ) : (
              <Icon
                icon='mdi:cards-heart'
                color='#e6e6e6'
                onClick={handleLike}
              />
            )}
          </span>
        </div>
      </div>
    )
  );
};

export default Product;
