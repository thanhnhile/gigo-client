import React, { useRef, useState } from 'react';
import className from 'classnames/bind';
import Modal from '../../Modal';
import ReviewProduct from '~/components/ReviewProduct';
import styles from './ListOrder.module.scss';
import { formatPrice } from '~/utils/format';
import { ORDER_STATUS } from '~/utils/enum';
import { httpUpdateStatusOrder } from '~/apiServices/orderServices';

const cx = className.bind(styles);

const OrderItem = (props) => {
  const targetItem = useRef();
  const [order, setOrder] = useState(props.order);
  const [showModal, setShowModal] = useState(false);
  const handleCancel = async (id) => {
    const res = await httpUpdateStatusOrder(id, ORDER_STATUS.CANCELED.id);
    if (res.data) {
      setOrder(res.data);
    }
  };
  const handleClick = (item) => {
    setShowModal(true);
    targetItem.current = item;
  };
  return (
    <div key={order.id} className={cx('order-item')}>
      <div className={cx('header')}>
        <span>Mã đơn hàng: {order.id}</span>
        <span>
          Ngày đặt:{' '}
          {order.createdDate.slice(0, 10).split('-').reverse().join('/')}
        </span>
      </div>
      <div className={cx('content')}>
        <div className={cx('product')}>
          {order.details.map((item) => (
            <div className={cx('product-item')}>
              {showModal && (
                <Modal
                  title='Đánh giá sản phẩm'
                  size='lg'
                  handleCancel={() => setShowModal(false)}
                >
                  <ReviewProduct product={targetItem.current} />
                </Modal>
              )}
              <img alt={item.product_name} src={item.img_url}></img>
              <div className={cx('product-item-info')}>
                <span>{item.product_name}</span>
                <br />
                <span>Size: {item.size}</span>
                <br />
                <span>
                  {item.quantity ?? 1} x{' '}
                  <span className={cx('price')}>{formatPrice(item.price)}</span>
                </span>
              </div>
              <button
                onClick={() => handleClick(item)}
                disabled={order.status !== ORDER_STATUS.SUCCESS.id}
              >
                Đánh giá
              </button>
            </div>
          ))}
        </div>
        <div className={cx('total')}>
          <p className={cx('price')}>{formatPrice(order.total)}</p>
        </div>
      </div>
      <div className={cx('action')}>
        <button
          onClick={() => handleCancel(order.id)}
          disabled={order.status !== ORDER_STATUS.IN_PROGRESS.id}
        >
          Hủy
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
