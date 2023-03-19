import React from 'react';
import { useLocation } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './ListCustomerInfo.module.scss';
import Customerinfo from '~/components/Personal/CustomerInfo';
import ListCustomerAddress from '~/components/Personal/ListCustomerAddress';
import { FORM_ACTION } from '~/utils/enum';

const cx = className.bind(styles);

const ListCustomerInfo = () => {
  const location = useLocation();
  const { customerId, action } = location.state;

  if (action === FORM_ACTION.VIEW) {
    return (
      <div className='min-container'>
        <h2>Sổ địa chỉ</h2>
        <div className={cx('wrapper')}>
          <ListCustomerAddress />
        </div>
      </div>
    );
  }
  return (
    <div className='min-container'>
      <h2>Thông tin giao hàng</h2>
      <Customerinfo customerId={customerId} action={action} />
    </div>
  );
};

export default ListCustomerInfo;
