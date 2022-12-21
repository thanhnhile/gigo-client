import React from 'react';
import className from 'classnames/bind';
import styles from './ManageOrders.module.scss';
import { ORDER_STATUS } from '~/utils/enum';
import Clickable from '~/components/Clickable';
import TableOrder from './TableOrder';

const cx = className.bind(styles);

const ManageOrders = () => {
  return (
    <div className={cx('wrapper')}>
      <h1>Quản lý đơn hàng</h1>
      <div className={cx('filter')}>
        <div className={cx('filter-item')}>
          <input type='phone' placeholder='Tìm bằng số điện thoại' />
        </div>
        <div className={cx('filter-item')}>
          <select name='order-status'>
            {ORDER_STATUS.map((item) => (
              <option key={item.id} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className={cx('filter-item')}>
          <Clickable primary text='Downloads' />
        </div>
      </div>
      <TableOrder />
    </div>
  );
};

export default ManageOrders;
