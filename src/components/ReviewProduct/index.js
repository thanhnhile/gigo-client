import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './ReviewProduct.module.scss';
import { RatingCanChange } from './Rating';
import Form from './Form';
import { httpPostRating } from '~/apiServices/ratingServices';
import { toast } from 'react-toastify';

const cx = className.bind(styles);

const ReviewProduct = ({ product }) => {
  const [point, setPoint] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e, content) => {
    e.preventDefault();
    const payload = {
      product_id: product.product_id,
      point,
      content,
    };
    const response = await httpPostRating(payload);
    if (response.data) {
      navigate(`/products/${product.product_id}`, {
        state: { from: location },
      });
    } else {
      toast.error(response.errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('product-info')}>
        <img src={product.img_url} alt={product.product_name} />
        <h3>{product.product_name}</h3>
      </div>
      <RatingCanChange point={point} setPoint={setPoint} />
      <Form handleSubmit={handleSubmit} />
    </div>
  );
};
export default ReviewProduct;
