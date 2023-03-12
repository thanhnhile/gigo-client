/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Customer.module.scss';
import SelectAddress from '../../SelectAddress';
import Modal from '~/components/Modal';
import ListAddress from '~/components/Personal/CustomerListAddress';
import useOrder from '~/hooks/useOrder';
import { httpGetStoreByAddress } from '~/apiServices/storeServices';
import { httpGetCustomerInfoDefault } from '~/apiServices/accountServices';
const cx = className.bind(styles);

const Customer = () => {
  const { customer, setCustomer, accountUsername, handleCheckout } = useOrder();
  const [address, setAddress] = useState(() => {
    return { provinceId: customer.provinceId, districtId: customer.districtId };
  });
  const [stores, setStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const getCustomerInfo = async () => {
      const res = await httpGetCustomerInfoDefault();
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
      let res = [];
      if (accountUsername) {
        res = await httpGetStoreByAddress(
          customer.provinceId,
          customer.districtId
        );
      } else {
        res = await httpGetStoreByAddress(
          address.provinceId,
          address.districtId
        );
      }
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
  }, [
    address.provinceId,
    address.districtId,
    address,
    customer.districtId,
    customer.provinceId,
  ]);
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
          {/* Modal */}
          {showModal && (
            <Modal
              title='Sổ địa chỉ'
              size='lg'
              handleCancel={() => setShowModal(false)}
            >
              <ListAddress selected={customer} setSelected={setCustomer} />
            </Modal>
          )}
          {/* Modal */}
          <h2>Thông tin khách hàng</h2>
          <div className={cx('line')}></div>
          <form className={cx('form-wrapper')} onSubmit={handleSubmitCheckout}>
            {accountUsername ? (
              <div className={cx('form-control')}>
                <h4>Địa chỉ nhận hàng</h4>
                <div className={cx('customer-info')}>
                  <button
                    type='button'
                    onClick={() => setShowModal(true)}
                    className={cx('list-customer')}
                  >
                    <Icon icon='mdi:address-marker-outline' />
                  </button>
                  <div className={cx('customer-info_first')}>
                    {customer.name ? (
                      <>
                        <h4>{customer.name}</h4>
                        <h5>{customer.phone || ''}</h5>
                      </>
                    ) : (
                      <p>Không có thông tin nào được lưu</p>
                    )}
                  </div>
                  <p className={cx('customer-info_last')}>{customer.address}</p>
                </div>
              </div>
            ) : (
              <>
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
                  <h4>Địa chỉ </h4>
                  <SelectAddress
                    address={{
                      provinceId: customer.provinceId,
                      districtId: customer.districtId,
                    }}
                    setAddress={setAddress}
                  />
                </div>
              </>
            )}
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
