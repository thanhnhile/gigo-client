import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import className from 'classnames/bind';
import styles from './Invoice.module.scss';
import {
  httpGetOrderById,
  httpUpdateStatusOrder,
} from '~/apiServices/orderServices';
import getStatusComponent from '~/components/Status';
import CustomDataTable from '~/components/CustomDataTable';
import Clickable from '~/components/Clickable';
import { formatPrice } from '~/utils/format';

import { DELIVERY_METHOD, ORDER_STATUS, PERMISSION } from '~/utils/enum';

const cx = className.bind(styles);
const columns = [
  {
    name: 'STT',
    width: '50px',
    selector: (row, index) => index + 1,
  },
  {
    name: 'Sản phẩm',
    selector: (row) => row.product_name,
  },
  {
    name: 'Kích cỡ',
    width: '100px',
    selector: (row) => row.size,
  },
  {
    name: 'Lượng đường',
    width: '150px',
    selector: (row) => row.sugar,
  },
  {
    name: 'Lượng đá',
    width: '100px',
    selector: (row) => row.iced,
  },
  {
    name: 'Giá',
    width: '150px',
    selector: (row) => formatPrice(row.price),
  },
  {
    name: 'Kèm theo',
    selector: (row) => {
      return row.toppings.map((item) => (
        <div className={cx('topping-name')}>- {item.name}</div>
      ));
    },
  },
];
const Invoice = ({ permission }) => {
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
  const discount = useMemo(() => {
    if (!order?.voucher) return 0;
    const { value, maximumDiscountAmount } = order?.voucher || {};
    return value === 1
      ? maximumDiscountAmount
      : ((order?.total - DELIVERY_METHOD[order?.orderType]?.price) * value) /
          (1 - value);
  }, [order, order?.voucher]);

  const handleClick = useMemo(
    () => async (status) => {
      const res = await httpUpdateStatusOrder(id, status);
      if (res.data) {
        setOrder(res.data);
      }
    },
    [id]
  );

  console.log(order?.details);
  return order?.details?.length > 0 ? (
    <div className={cx('wrapper', 'container')}>
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
        <CustomDataTable columns={columns} data={order?.details} />
      </div>
      <div className={cx('row', 'order-info')}>
        <div className={cx('info')}>
          <h4>phương thức</h4>
          <p>{DELIVERY_METHOD[order?.orderType].name}</p>
        </div>
        <div className={cx('info')}>
          <h4>Phí giao hàng</h4>
          <p>{formatPrice(DELIVERY_METHOD[order?.orderType].price)}</p>
        </div>
        <div className={cx('info')}>
          <h4>Giảm giá</h4>
          <p>{formatPrice(discount)}</p>
        </div>
        <div className={cx('info')}>
          <h4>Tổng đơn</h4>
          <p className={cx('price')}>{formatPrice(order?.total)}</p>
        </div>
      </div>
      <div className={cx('row')}>
        <Clickable
          onClick={() => handleClick(1)}
          text='Xác nhận'
          disable={
            order?.status !== ORDER_STATUS.IN_PROGRESS.id ||
            !permission?.includes(PERMISSION.DELIVERY)
          }
          primary
        />
        <Clickable
          onClick={() => handleClick(2)}
          text='Giao hàng'
          outline
          disable={
            order?.status !== ORDER_STATUS.DELIVERING.id ||
            !permission?.includes(PERMISSION.SUCCESS)
          }
        />
        <Clickable
          onClick={() => handleClick(3)}
          text='Hủy'
          second
          disable={
            order?.status !== ORDER_STATUS.IN_PROGRESS.id ||
            !permission.includes(PERMISSION.CANCEL)
          }
        />
      </div>
    </div>
  ) : (
    <p>Không có đơn hàng</p>
  );
};

export default Invoice;
