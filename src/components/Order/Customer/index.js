/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Customer.module.scss';
import Modal from '~/components/Modal';
import ListCustomerAddress from '../../Personal/ListCustomerAddress';
import FormValidation from '~/components/Form/FormValidation';
import Authenticated from './Authenticated';
import UnAuthenticated from './UnAuthenticated';
import useOrder from '~/hooks/useOrder';
import { httpGetStoreByAddress } from '~/apiServices/storeServices';
import { httpGetCustomerInfoDefault } from '~/apiServices/accountServices';

const cx = className.bind(styles);

const Customer = () => {
  const { customer: initValue, accountUsername, handleCheckout } = useOrder();
  const [customer, setCustomer] = useState(initValue);
  const [stores, setStores] = useState([]);
  const [address, setAddress] = useState({
    provinceId: customer.provinceId,
    districtId: customer.districtId,
    provinceName: '',
    districtName: '',
  });
  const [showModal, setShowModal] = useState(false);
  const getListStoreByAddress = async (provinceId, districtId) => {
    let res = [];
    res = await httpGetStoreByAddress(provinceId, districtId);
    if (res.data?.length > 0) {
      setStores(res.data);
      setCustomer((prev) => ({ ...prev, store_id: res.data[0]?.id }));
    } else {
      setStores([{ id: null, storeName: 'Không có cửa hàng tại địa chỉ này' }]);
    }
  };
  useEffect(() => {
    const getCustomerInfoDefault = async () => {
      const res = await httpGetCustomerInfoDefault();
      if (res.data) {
        let storeRes = [];
        storeRes = await httpGetStoreByAddress(
          res.data?.provinceId,
          res.data?.districtId
        );
        if (storeRes.data?.length > 0) {
          setStores(storeRes.data);
          setCustomer({
            ...res.data,
            store_id: storeRes.data[0].id,
          });
        } else {
          setStores([
            { id: null, storeName: 'Không có cửa hàng tại địa chỉ này' },
          ]);
        }
      }
    };
    accountUsername
      ? getCustomerInfoDefault()
      : setCustomer({ ...customer, provinceId: -1 });
  }, []);

  useEffect(() => {
    let provinceId, districtId;
    if (accountUsername) {
      provinceId = customer.provinceId;
      districtId = customer.districtId;
    } else {
      provinceId = address.provinceId;
      districtId = address.districtId;
      setCustomer((prev) => ({ ...prev, provinceId, districtId }));
    }
    getListStoreByAddress(provinceId, districtId);
  }, [customer.id, address.provinceId, address.districtId]);
  const handleChange = (e) => {
    setCustomer((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return useMemo(() => {
    return (
      <div className={cx('wrapper')}>
        {/* Modal */}
        {showModal && (
          <Modal
            title='Sổ địa chỉ'
            size='lg'
            handleCancel={() => setShowModal(false)}
          >
            <ListCustomerAddress
              selected={customer}
              setSelected={setCustomer}
            />
          </Modal>
        )}
        {/* Modal */}
        <h2>Thông tin khách hàng</h2>
        <div className={cx('line')}></div>
        <FormValidation>
          {({ formValidated, setValidated, setSubmitting }) => {
            const handleSubmitCheckout = (e) => {
              e.preventDefault();
              if (accountUsername && customer.id) {
                handleCheckout(customer, setSubmitting);
              } else if (formValidated) {
                if (address.provinceName && address.districtName) {
                  let fullAddress = `${customer.address}, ${address.districtName}, ${address.provinceName}`;
                  const customerInfo = {
                    ...customer,
                    address: fullAddress.toLowerCase(),
                  };
                  handleCheckout(customerInfo, setSubmitting);
                }
<<<<<<< HEAD
              };
              return (
                <form
                  className={cx('form-wrapper')}
                  onSubmit={handleSubmitCheckout}
                >
                  {accountUsername ? (
                    <Authenticated
                      setShowModal={setShowModal}
                      customer={customer}
                    />
                  ) : (
                    <UnAuthenticated
                      customer={customer}
                      setCustomer={setCustomer}
                      handleChange={handleChange}
                      setValidated={setValidated}
                    />
                  )}
                  <div className={cx('form-control')}>
                    <h4>Chọn quán gần nhất</h4>
                    <select
                      className={cx('select-store')}
                      name='store_id'
                      value={customer.store_id}
                      onChange={handleChange}
                      required='true'
                    >
                      {stores?.map((store) => (
                        <option
                          key={store.id}
                          value={Number.parseInt(store.id)}
                        >
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
              );
            }}
          </FormValidation>
        </div>
      )
=======
              }
            };
            return (
              <form
                className={cx('form-wrapper')}
                onSubmit={handleSubmitCheckout}
              >
                {accountUsername ? (
                  <Authenticated
                    setShowModal={setShowModal}
                    customer={customer}
                  />
                ) : (
                  <UnAuthenticated
                    address={address}
                    setAddress={setAddress}
                    customer={customer}
                    handleChange={handleChange}
                    setValidated={setValidated}
                  />
                )}
                <div className={cx('form-control')}>
                  <h4>Chọn quán gần nhất</h4>
                  <select
                    className={cx('select-store')}
                    name='store_id'
                    value={customer.store_id}
                    onChange={handleChange}
                    required
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
            );
          }}
        </FormValidation>
      </div>
>>>>>>> 6278a91e5e58520d782bff8d32e3acccc1d189c7
    );
  }, [customer.address, customer.name, customer.phone, handleChange]);
};

export default Customer;
