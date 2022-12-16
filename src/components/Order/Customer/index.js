import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Customer.module.scss';
import Select from 'react-select';
import SelectAddress from '../../SelectAddress';

const cx = className.bind(styles);

const storeData = [
  {
    id: 1,
    districtId: 1,
    name: 'HCM Hoàng Việt',
    address: '17 Út tịch, Q. Tân Bình, Hồ Chí Minh',
  },
  {
    id: 2,
    districtId: 1,
    name: 'HCM Ấp Bắc',
    address: '4 - 6 Ấp Bắc, Q. Tân Bình, Hồ Chí Minh',
  },
  {
    id: 3,
    districtId: 1,
    name: 'HCM Tỉnh Lộ 10',
    address: '516 Tỉnh Lộ 10, Bình Trị Đông, Bình Tân, Hồ Chí Minh',
  },
];
const options = storeData.map((store) => {
  return { label: store.name + ', ' + store.address, value: store.id };
});
const Customer = (props) => {
  const { customer, setCustomer } = useState({});
  const [address, setAddress] = useState({
    province: '',
    district: '',
  });
  return (
    <div className={cx('wrapper')}>
      <h2>Thông tin khách hàng</h2>
      <div className={cx('line')}></div>
      <form className={cx('form-wrapper')}>
        <div className={cx('form-control')}>
          <input id='name' type='text' placeholder='Họ và tên' />
          <input id='phone' type='phone' placeholder='Số điện thoại' />
        </div>
        <div className={cx('form-control')}>
          <input id='address' type='text' placeholder='Địa chỉ chi tiết' />
        </div>
        <div className={cx('form-control')}>
          <h4>Chọn địa chỉ</h4>
          <SelectAddress address={address} setAddress={setAddress} />
        </div>
        <div className={cx('form-control')}>
          <h4>Chọn quán gần nhất</h4>
          <Select defaultValue={options[0] || 'Chọn'} options={options} />
        </div>
        <button className={cx('pay-btn')}>
          <Icon icon='carbon:wireless-checkout' />
          Thanh toán
        </button>
      </form>
    </div>
  );
};

export default Customer;
