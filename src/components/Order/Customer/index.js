/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Customer.module.scss';
import SelectAddress from '../../SelectAddress';
import useOrder from '../../../hooks/useOrder';
import { httpGetCustomerInfoByUsername } from '~/apiServices/userServices';
import { httpGetStoreByAddress } from '~/apiServices/storeServices';

const cx = className.bind(styles);

const Customer = () => {
  const { customer, setCustomer, accountUsername, handleCheckout } = useOrder();
  const [address, setAddress] = useState(() => {
    return { provinceId: customer.provinceId, districtId: customer.districtId };
  });
  const [stores, setStores] = useState([]);
  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await httpGetCustomerInfoByUsername(accountUsername);
      console.log(res.data);
      if (res.data) {
        const customer = res.data;
        setCustomer({ ...customer, id: '' });
        setAddress({
          provinceId: customer.provinceId,
          districtId: customer.districtId,
        });
      } else setCustomer({ ...customer, provinceId: -1 });
    };
    getCustomerInfo();
  }, []);
  useEffect(() => {
    const handleAddressChange = async () => {
      const res = await httpGetStoreByAddress(
        address.provinceId,
        address.districtId
      );
      if (res.data?.length > 0) {
        setStores(res.data);
        setCustomer({
          ...customer,
          ...address,
          store_id: res.data[0].id,
        });
      } else {
        setStores([
          { id: null, storeName: 'Không có cửa hàng tại địa chỉ này' },
        ]);
      }
    };
    handleAddressChange();
  }, [address.provinceId, address.districtId, address]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };
  const handleSubmitCheckout = (e) => {
    e.preventDefault();
    handleCheckout();
  };
  return useMemo(() => {
    return (
      customer?.provinceId && (
        <div className={cx('wrapper')}>
          <h2>Thông tin khách hàng</h2>
          <div className={cx('line')}></div>
          <form className={cx('form-wrapper')} onSubmit={handleSubmitCheckout}>
            <div className={cx('form-control')}>
              <input
                value={customer.name}
                name='name'
                type='text'
                placeholder='Họ và tên'
                onChange={handleChange}
              />
              <input
                value={customer.phone}
                name='phone'
                type='phone'
                placeholder='Số điện thoại'
                onChange={handleChange}
              />
            </div>
            <div className={cx('form-control')}>
              <input
                value={customer.address}
                name='address'
                type='text'
                placeholder='Địa chỉ chi tiết'
                onChange={handleChange}
              />
            </div>
            <div className={cx('form-control')}>
              <h4>Chọn địa chỉ</h4>
              <SelectAddress
                address={{
                  provinceId: customer.provinceId,
                  districtId: customer.districtId,
                }}
                setAddress={setAddress}
              />
            </div>
            <div className={cx('form-control')}>
              <h4>Chọn quán gần nhất</h4>
              <select
                className={cx('select-store')}
                name='store_id'
                value={customer.store_id}
                onChange={handleChange}
              >
                {stores?.map((store) => (
                  <option key={store.id} value={Number.parseInt(store.id)}>
                    {store.storeName}, {store.address}
                  </option>
                ))}
              </select>
            </div>
            <button className={cx('pay-btn')}>
              <Icon icon='carbon:wireless-checkout' />
              Thanh toán
            </button>
          </form>
        </div>
      )
    );
  }, [address, customer.address, customer.name, customer.phone, handleChange]);
};

export default Customer;
