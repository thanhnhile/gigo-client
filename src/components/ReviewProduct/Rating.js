import React from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewProduct.module.scss';
import Star from './Star';
const MAX_POINT = 5;

const cx = classNames.bind(styles);

export const RatingCanChange = ({ point, setPoint }) => {
  return (
    <ul className={cx('list-star')}>
      {Array.from(new Array(MAX_POINT)).map((value, index) => (
        <li
          key={index}
          onMouseEnter={() => setPoint(index + 1)}
          onClick={() => setPoint(index + 1)}
        >
          <Star isActive={index < point} />
        </li>
      ))}
    </ul>
  );
};

export const RatingJustShow = ({ point }) => {
  return (
    <ul className={cx('list-star')}>
      {Array.from(new Array(MAX_POINT)).map((value, index) => (
        <li>
          <Star isActive={index < point} />
        </li>
      ))}
    </ul>
  );
};
