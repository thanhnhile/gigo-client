import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Invoice.module.scss';
import { httpGetOrderById } from '~/apiServices/orderServices';

const cx = className.bind(styles);

const Invoice = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const getOrderById = async () => {
      const res = await httpGetOrderById(id);
      if (res.data) {
        setOrder(res.data);
      }
    };
    getOrderById();
  }, [id]);
  return (
    <div className={cx('wrapper')}>
      <h1>Chi tiết đơn hàng</h1>
      <div className={cx('first')}>
        <p>Trạng thái: </p>
        <div className={cx('customer-info')}>
          <h5>ten</h5>
          <p>sdt</p>
        </div>
      </div>
      <div className={cx('second')}>
        <p>Trạng thái: </p>
        <p>Mã đơn hàng</p>
      </div>
    </div>
  );
};

export default Invoice;
