import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Invoice.module.scss';
import {
  httpGetOrderById,
  httpUpdateStatusOrder,
} from '~/apiServices/orderServices';
import getStatusComponent from '~/components/Status';
import { formatPrice } from '~/utils/format';
import Clickable from '../../../components/Clickable';
import { DELIVERY_METHOD, ORDER_STATUS } from '~/utils/enum';

const cx = className.bind(styles);
// const getStatusComponent = (status = 0) => {
//   switch (status) {
//     case 0:
//       return <Status text={ORDER_STATUS.IN_PROGRESS.name} inProgress />;
//     case 1:
//       return <Status text={ORDER_STATUS.DELIVERING.name} delivering />;
//     case 2:
//       return <Status text={ORDER_STATUS.SUCCESS.name} success />;
//     case 3:
//       return <Status text={ORDER_STATUS.CANCELED.name} canceled />;
//     default:
//       return <Status text={ORDER_STATUS.IN_PROGRESS.name} inProgress />;
//   }
// };

const Invoice = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  useEffect(() => {
    const getOrderById = async () => {
      const res = await httpGetOrderById(id);
      if (res.data) {
        setOrder(res.data);
        console.log(res.data);
      }
    };
    getOrderById();
  }, [id]);
  const handleClick = useMemo(
    () => async (status) => {
      const res = await httpUpdateStatusOrder(id, status);
      if (res.data) {
        setOrder(res.data);
      }
    },
    [id]
  );
  return order?.details?.length > 0 ? (
    <div className={cx('wrapper')}>
      <h1>Chi tiết đơn hàng</h1>
      <div className={cx('row')}>
        <div className={cx('status')}>
          <h4>Trạng thái: </h4>
          {getStatusComponent(order.status)}
        </div>
        <div className={cx('info')}>
          <h4>Từ: {order?.store?.storeName}</h4>
          <p>{order?.store?.address}</p>
        </div>
      </div>
      <div className={cx('row')}>
        <h4>
          Ngày đặt:{' '}
          {order.createdDate.slice(0, 10).split('-').reverse().join('/')}
        </h4>
        <h4>Mã đơn hàng: {order.id}</h4>
        <div className={cx('info')}>
          <h4>Đến: {order?.customer?.name}</h4>
          <p>{order?.customer?.address}</p>
        </div>
      </div>
      <div className={cx('order-details')}>
        <h4>Chi tiết</h4>
        {order?.details?.length > 0 &&
          order.details.map((item) => {
            return (
              <div className={cx('product-item')}>
                <img alt={item.productName} src={item.imgURL}></img>
                <div className={cx('product-item-info')}>
                  <span>{item.productName}</span>
                  <br />
                  <span>Size: {item.size}</span>
                  <br />
                  <span>
                    {item.quantity ?? 1} x{' '}
                    <span className={cx('price')}>
                      {formatPrice(item.price)}
                    </span>
                  </span>
                </div>
              </div>
            );
          })}
      </div>
      <div className={cx('row', 'order-info')}>
        <div className={cx('info')}>
          <h4>phương thức</h4>
          <p>{DELIVERY_METHOD[order.orderType].name}</p>
        </div>
        <div className={cx('info')}>
          <h4>Phí giao hàng</h4>
          <p>{formatPrice(DELIVERY_METHOD[order.orderType].price)}</p>
        </div>
        <div className={cx('info')}>
          <h4>Giảm giá</h4>
          <p>0%</p>
        </div>
        <div className={cx('info')}>
          <h4>Tổng đơn</h4>
          <p className={cx('price')}>{formatPrice(order.total)}</p>
        </div>
      </div>
      {/* <div className={cx('row', 'select-employee')}>
        <h4>Nhân viên</h4>
        <select>
          <option>Nhi</option>
          <option>Thanh Hai</option>
          <option>My</option>
        </select>
      </div> */}
      <div className={cx('row')}>
        <Clickable
          onClick={() => handleClick(1)}
          text='Xác nhận'
          disable={order.status !== ORDER_STATUS.IN_PROGRESS.id}
          primary
        />
        <Clickable
          onClick={() => handleClick(2)}
          text='Giao hàng'
          outline
          disable={order.status !== ORDER_STATUS.DELIVERING.id}
        />
        <Clickable
          onClick={() => handleClick(3)}
          text='Hủy'
          second
          disable={
            order.status === ORDER_STATUS.SUCCESS.id ||
            order.status === ORDER_STATUS.CANCELED.id
          }
        />
      </div>
    </div>
  ) : (
    <p>Không có đơn hàng</p>
  );
};

export default Invoice;
