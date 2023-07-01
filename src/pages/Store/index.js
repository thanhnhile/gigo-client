import React, { useCallback, useEffect, useState } from 'react';
import className from 'classnames/bind';
import styles from './Store.module.scss';
import { Icon } from '@iconify/react';
import {
  httpGetAllStore,
  httpGetStoreByAddress,
} from '../../apiServices/storeServices';
import SelectAddress from '../../components/SelectAddress';
const cx = className.bind(styles);

const Stores = () => {
  const [store, setStore] = useState([]);
  const [address, setAddress] = useState({
    provinceId: '',
    districtId: '',
  });

  const getAllStore = useCallback(async () => {
    const response = await httpGetAllStore();
    setStore(response.data);
  }, []);

  const getStoreByAddress = useCallback(async () => {
    try {
      const res = await httpGetStoreByAddress(
        address.provinceId,
        address.districtId
      );
      if (res.data) {
        setStore(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [address.provinceId, address.districtId]);

  useEffect(() => {
    getAllStore();
  }, []);
  useEffect(() => {
    address.provinceId !== -1 ? getStoreByAddress() : getAllStore();
  }, [
    address.provinceId,
    address.districtId,
    address,
    getStoreByAddress,
    getAllStore,
  ]);
  return (
    <div className={cx('container', 'stores')}>
      <h2>Hệ thống cửa hàng Gogi</h2>
      <div className={cx('filter-bar')}>
        <SelectAddress address={address} setAddress={setAddress} />
      </div>
      <div className={cx('store-cards')}>
        {store?.length > 0 ? (
          store.map((store, index) => {
            // filter stores by state | facility
            return (
              <div className={cx('store-card')} key={index}>
                <h3>{store.storeName}</h3>
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
                </div>
                <div className={cx('store-data')}>
                  <div className={cx('icon-wrapper')}>
                    <Icon icon='ic:outline-delivery-dining' />
                  </div>
                  <p>Giao hàng tận nơi</p>
                </div>
                <div className={cx('store-data')}>
                  <div className={cx('icon-wrapper')}>
                    <Icon icon='clarity:store-line' />
                  </div>
                  <p>Phục vụ tại chỗ</p>
                </div>
              </div>
            );
          })
        ) : (
          <h3>Xin lỗi, Gogi chưa có cửa hàng tại địa chỉ này</h3>
        )}
      </div>
    </div>
  );
};

export default Stores;
