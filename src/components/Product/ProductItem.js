import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Product.module.scss';

import { useAuth, useToastError } from '~/hooks';
import { formatPrice, formatPercent } from '~/utils/format';
import { httpLikeProduct, httpUnlikeProduct } from '~/apiServices/likeServices';

const cx = className.bind(styles);

const Product = ({ product, isLiked }) => {
  const { setNeedToUpdateProductLiked } = useAuth();
  const { showToastError } = useToastError();
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await httpLikeProduct(product.id);
      setLiked(true);
      setNeedToUpdateProductLiked(true);
    } catch (error) {
      showToastError(error);
    }
  };
  const handleUnlike = async () => {
    try {
      await httpUnlikeProduct(product.id);
      setLiked(false);
      setNeedToUpdateProductLiked(true);
    } catch (error) {
      showToastError(error);
    }
  };
  useEffect(() => {
    setLiked(isLiked);
  }, [isLiked]);

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
              <span className={cx('discount')}>
                {formatPrice(product.price / (1 - product.discount))}
              </span>
              {formatPrice(product.price)}
            </span>
          </Link>
          {!!product.discount && (
            <span className={cx('discount-ticket')}>
              <h3>- {formatPercent(product.discount)}</h3>
            </span>
          )}
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
