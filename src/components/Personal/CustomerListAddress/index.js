import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './CustomerListAddress.module.scss';
import { FORM_ACTION } from '~/utils/enum';
import { httpGetAllCustomerInfo } from '~/apiServices/accountServices';

const cx = className.bind(styles);

const ListAddress = ({ selected, setSelected }) => {
  const [listAddress, setListAddress] = useState([]);
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/customer-info`, {
      state: { customerId: id, action: FORM_ACTION.EDIT },
    });
  };
  useEffect(() => {
    const getListCustomerInfoOfAccount = async () => {
      const res = await httpGetAllCustomerInfo();
      if (res.data) {
        setListAddress(res.data);
        const defaultItem = res?.data.find((item) => item.isDefault);
        defaultItem && setSelected((prev) => ({ ...prev, ...defaultItem }));
      }
    };
    getListCustomerInfoOfAccount();
  }, []);
  return (
    <div className={cx('wrapper')}>
      <form>
        {listAddress.map((item) => {
          return (
            <div className={cx('address-item')} key={item.id}>
              <label className={cx('radio-label')} for={item.id}>
                <input
                  id={item.id}
                  type='radio'
                  name='address'
                  hidden
                  checked={item.id === selected.id}
                  onChange={() => setSelected((prev) => ({ ...prev, ...item }))}
                />
                <div className={cx('radio-button')}></div>
              </label>
              <div className={cx('customer-info')}>
                <div className={cx('customer-info_first')}>
                  <h4>{item.name}</h4>
                  <h5>{item.phone}</h5>
                </div>
                <p className={cx('customer-info_last')}>{item.address}</p>
              </div>
              <div className={cx('customer-action')}>
                <button type='button' onClick={(e) => handleEdit(item.id)}>
                  Sửa
                </button>
              </div>
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default ListAddress;
