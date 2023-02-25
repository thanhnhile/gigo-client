import React, { useState } from 'react';
import className from 'classnames/bind';
import { RatingCanChange } from './Rating';
import Clickable from '../Clickable';
import styles from './ReviewProduct.module.scss';

const cx = className.bind(styles);

const ReviewProduct = ({ product }) => {
  const [point, setPoint] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('product-info')}>
        <img src={product.imgURL} alt={product.productName} />
        <h3>{product.productName}</h3>
      </div>
      <RatingCanChange point={point} setPoint={setPoint} />
      <form>
        <textarea placeholder='Cảm nhận của bạn về sản phẩm...' required />
        <Clickable text='Gửi đánh giá' primary onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default ReviewProduct;
