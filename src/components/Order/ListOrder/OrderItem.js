import React, { useRef, useState, useContext } from 'react';
import className from 'classnames/bind';
import Modal from '~/components/Modal';
import ReviewProduct from '~/components/ReviewProduct';
import styles from './ListOrder.module.scss';
import { formatPrice } from '~/utils/format';
import { formatDate } from '~/utils/dateFormat';
import { ORDER_STATUS } from '~/utils/enum';
import { historyOrderContext } from '~/components/Personal/HistoryOrder';
import Clickable from '../../Clickable';
import { useNavigate } from 'react-router-dom';
const cx = className.bind(styles);

const OrderItem = ({ order }) => {
  const navigate = useNavigate();
  const targetItem = useRef();
  const [showModal, setShowModal] = useState(false);
  const { tab, productsRated } = useContext(historyOrderContext);
  const checkIsProductRatedByLoggedUser = (productId) => {
    if (productsRated?.length <= 0) {
      return false;
    }
    return productsRated.filter((item) => item === productId).length > 0;
  };

  const handleClick = (item) => {
    setShowModal(true);
    targetItem.current = item;
  };
  return (
    <div key={order.id} className={cx('order-item')}>
      <div className={cx('header')}>
        <span>Mã đơn hàng: {order.id}</span>
        <span>Ngày đặt: {formatDate(order.createdDate)}</span>
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
                disabled={
                  tab !== ORDER_STATUS.SUCCESS.id ||
                  checkIsProductRatedByLoggedUser(
                    Number.parseInt(item.product_id)
                  )
                }
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
        <Clickable
          text='Chi tiết'
          outline
          onClick={() => navigate(`/orders/${order?.id}`)}
        />
      </div>
    </div>
  );
};

export default OrderItem;
