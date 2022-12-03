import React from 'react';
import className from 'classnames/bind';
import styles from './Store.module.scss';
import { Icon } from '@iconify/react';
import Select from 'react-select';

const cx = className.bind(styles);

const Stores = () => {
  const district = [
    { label: 'TP HCM', value: 1 },
    { label: 'BRVT', value: 2 },
    { label: 'Tay Ninh', Value: 3 },
  ];
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
  return (
    <div className={cx('stores')}>
      <div className={cx('page-header')}>
        <h1>Hệ thống cửa hàng Gigo</h1>
      </div>
      <div className={cx('container')}>
        <div className={cx('filter-bar')}>
          <Select options={district} />
        </div>

        <div className={cx('store-cards')}>
          {storeData.map((store, index) => {
            // filter stores by state | facility
            return (
              <div className={cx('store-card')} key={index}>
                <h3>{store.name}</h3>
                <div className={cx('store-data')}>
                  <div className={cx('icon-wrapper')}>
                    <Icon icon={cx('clarity:store-solid')} />
                  </div>
                  <p>{store.address}</p>
                </div>
                <div className={cx('store-data')}>
                  <div className={cx('icon-wrapper')}>
                    <Icon icon='bx:time' />
                  </div>
                  <p>6:00 am - 6:00 pm</p>
                </div>

                <div className={cx('store-data')}>
                  <div className={cx('icon-wrapper')}>
                    <Icon icon='ant-design:wifi-outlined' />
                  </div>
                  <p>Có wifi</p>

                  <div className={cx('icon-wrapper')}>
                    <Icon icon='clarity:store-line' />
                  </div>
                  <p>Phục vụ tại chỗ</p>

                  <div className={cx('icon-wrapper')}>
                    <Icon icon='ic:outline-delivery-dining' />
                  </div>
                  <p>Giao hàng tận nơi</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stores;
