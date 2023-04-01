import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import className from 'classnames/bind';
import styles from './Customer.module.scss';
import { FORM_ACTION } from '~/utils/enum';

const cx = className.bind(styles);

const Authenticated = ({ setShowModal, customer }) => {
  const navigate = useNavigate();
  return (
    <div className={cx('form-control')}>
      <div className={cx('customer-address')}>
        <h4>Địa chỉ nhận hàng</h4>
        <button
          type='button'
          onClick={() =>
            navigate(`/customer-info`, {
              state: { action: FORM_ACTION.ADD },
            })
          }
        >
          <Icon onClick={() => {}} icon='material-symbols:add-circle-outline' />
        </button>
      </div>
      <div className={cx('customer-info')}>
        <button
          type='button'
          onClick={() => setShowModal(true)}
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
            <p>Không có địa chỉ nào được lưu</p>
          )}
        </div>
        <p className={cx('customer-info_last')}>{customer.address}</p>
      </div>
    </div>
  );
};

export default Authenticated;
