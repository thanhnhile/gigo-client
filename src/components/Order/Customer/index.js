import React, { useState } from 'react';
import className from 'classnames/bind';
import styles from './Customer.module.scss';

const cx = className.bind(styles);

const Customer = (props) => {
  const { customer, setCustomer } = useState({});
  return (
    <React.Fragment>
      <br />
      <td>Chọn quận/huyện: </td>
      <td>
        <select className={cx('select-btn')}>
          {/* {storeData.map((store) => (
            <option className={cx('option')} key={store.id}>
              {store.address}
            </option>
          ))} */}
        </select>
      </td>
      <br />
      <td>Chọn quán gần nhất: </td>
      <td>
        <select className={cx('select-btn')}>
          {/* {storeData.map((store) => (
            <option className={cx('option')} key={store.id}>
              {store.address}
            </option>
          ))} */}
        </select>
      </td>
      Tên
      <input className={cx('input-field')}></input>
      Số điện thoại
      <input className={cx('input-field')}></input>
      Địa chỉ
      <input className={cx('input-field')}></input>
    </React.Fragment>
  );
};

export default Customer;
