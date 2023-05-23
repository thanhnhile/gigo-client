import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Product.module.scss';

import { formatPrice } from '~/utils/format';
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
              <div className={cx('point-rating')}>
                <div className={cx('ribbon-head')}>
                  <h3>
                    {product.avgPoint}
                    <Icon icon={cx('ic:baseline-star-rate')} />
                  </h3>
                </div>
                <div className={cx('ribbon-tail')}>
                  <div className={cx('left')}></div>
                  <div className={cx('right')}></div>
                </div>
              </div>
            )}
            <div className={cx('img')}>
              <img
                className={cx('product__img')}
                src={product.img_url}
                alt={product.name}
              />
              <div className={cx('voucher-ticket')}>
                <div className={cx('voucher')}>
                  <div className={cx('voucher-body')}>
                    <div className={cx('voucher-text')}>
                      <h5>PrintingLab.MY</h5>
                      <p style={{ lineHeight: 1 }}>
                        <strong style={{ fontSize: '1.25rem' }}>RM 10</strong>
                        <br />
                        Voucher
                      </p>
                    </div>
                    <div className={cx('voucher-border-left')} />
                    <div className={cx('voucher-border-right')} />
                  </div>
                  <div className={cx('voucher-footer')}>
                    <div className={cx('voucher-details')}>
                      <div className={cx('details-icon')}>
                        <Icon icon={cx('ic:round-access-time')} />
                      </div>
                      <div className={cx('details-text')}>
                        <div className={cx('text-title')}>Valid till</div>
                        <div className={cx('text-description')}>
                          12 Jun 2019
                        </div>
                      </div>
                    </div>
                    <div className={cx('voucher-details')}>
                      <div className={cx('details-icon')}>
                        <Icon icon={cx('icon-park-solid:ticket')} />
                      </div>
                      <div className={cx('details-text')}>
                        <div className={cx('text-title')} style={{ width: 90 }}>
                          Minimum spend
                        </div>
                        <div className={cx('text-description')}>none</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span className={cx('product__name')}>{product.name}</span>
            <span className={cx('product__price')}>
              {formatPrice(product.price)}
            </span>
          </Link>
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
                color='#7c7b7b'
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
