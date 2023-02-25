import React from 'react';
import classNames from 'classnames/bind';
import styles from './ReviewProduct.module.scss';
import { RatingJustShow } from './Rating';

const cx = classNames.bind(styles);

const ListRating = ({ list }) => {
  return (
    <div className={cx('list-rating')}>
      <h3>Đánh giá ({list.length})</h3>
      {list.length > 0 ? (
        <ul>
          {list.map((item, index) => (
            <li key={item.id} className={cx('rating-item')}>
              <div>
                <RatingJustShow point={index + 1} />
                <div className={cx('rating-item__user')}>
                  <h5>0975802554</h5>
                  <span>2 giờ trước</span>
                </div>
                <p>Món này rất ngon, vị thơm chua nhẹ!</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        'Không có đánh giá nào'
      )}
    </div>
  );
};

export default ListRating;
