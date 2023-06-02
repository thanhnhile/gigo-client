import React from 'react';
import className from 'classnames/bind';
import styles from './ListOrder.module.scss';
import OrderItem from './OrderItem';

const cx = className.bind(styles);

const ListOrder = ({ orders }) => {
  return orders.length > 0 ? (
    <ul className={cx('wrapper')}>
      {orders.map((item) => (
        <li key={item.id}>
          <OrderItem order={item} />
        </li>
      ))}
    </ul>
  ) : (
    <p>Không có đơn hàng nào</p>
  );
};

export default ListOrder;
