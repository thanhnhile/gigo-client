import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import className from 'classnames/bind';
import styles from './Order.module.scss';
import CartItem from '../CartItem';
import { Icon } from '@iconify/react';
import useCart from '../../../hooks/useCart';
import { formatPrice } from '~/utils/format';
import { DELIVERY_METHOD } from '../../../utils/enum';

const cx = className.bind(styles);
const cacl = (cart) => {
  return cart.reduce(
    (result, current) => (result += Number.parseInt(current.price)),
    0
  );
};
function Order(props) {
  const { cart, removeAll } = useCart();
  const [shipPrice, setShipPrice] = useState(0);
  const [sumPrice, setSumPrice] = useState(() => cacl(cart));
  useMemo(() => {
    setSumPrice(cacl(cart));
  }, [cart]);
  return (
    <div className={cx('container')}>
      <div className={cx('order-info')}>
        <h2>Món đã chọn</h2>
        <div className={cx('line')}></div>
        <button onClick={removeAll}>Xóa tất cả</button>
        <div className={cx('order-info-content')}>
          <div className={cx('cart')}>
            {cart.length > 0 ? (
              cart.map((product) => <CartItem data={product} />)
            ) : (
              <Icon
                icon='ic:outline-remove-shopping-cart'
                className={cx('icon')}
              />
            )}
          </div>
        </div>
        <div className={cx('line')}></div>
        <div className={cx('total')}>
          <span>
            <div className={cx('thin dense')}>Thành tiền</div>
            <div className={cx('thin dense')}>
              Chọn hình thức giao hàng:
              <select
                name='deliver-method'
                onChange={(e) => {
                  console.log(e.target.value);
                  setShipPrice(Number.parseInt(e.target.value));
                }}
              >
                {DELIVERY_METHOD.map((method) => (
                  <option
                    key={method.id}
                    value={method.price}
                    data-price={method.price}
                  >
                    {method.name}
                  </option>
                ))}
              </select>
            </div>
            TỔNG CỘNG
          </span>
          <span>
            <div className={cx('thin dense')}>{formatPrice(sumPrice)}</div>
            <div className={cx('thin dense')}>{formatPrice(shipPrice)}</div>
            {formatPrice(sumPrice + shipPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Order;
