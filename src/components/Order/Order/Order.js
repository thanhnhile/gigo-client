/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import className from 'classnames/bind';
import styles from './Order.module.scss';
import CartItem from '../CartItem';
import { Icon } from '@iconify/react';
import useCart from '../../../hooks/useCart';
import { formatPrice } from '~/utils/format';
import { DELIVERY_METHOD } from '../../../utils/enum';
import useOrder from '../../../hooks/useOrder';

const cx = className.bind(styles);
const cacl = (cart) => {
  return cart.reduce(
    (result, current) => (result += Number.parseInt(current.price)),
    0
  );
};
function Order(props) {
  const { cart, removeAll } = useCart();
  const { setOrderDetail } = useOrder();
  const [shipMethod, setShipMethod] = useState(DELIVERY_METHOD[0].id);
  const [sumPrice, setSumPrice] = useState(() => cacl(cart));
  useEffect(() => {
    setSumPrice(cacl(cart));
    setOrderDetail((prev) => {
      const newDetails = cart.map((item) => {
        return {
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
        };
      });
      return {
        ...prev,
        details: newDetails,
        orderType: shipMethod,
        total: sumPrice + getShipPrice(),
      };
    });
  }, [cart, shipMethod]);
  const getShipPrice = () => {
    return DELIVERY_METHOD.find((item) => item.id === shipMethod).price;
  };
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
                  setShipMethod(Number.parseInt(e.target.value));
                }}
                value={shipMethod.id}
              >
                {DELIVERY_METHOD.map((method, index) => (
                  <option
                    key={method.id}
                    value={method.id}
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
            <div className={cx('thin dense')}>
              {formatPrice(getShipPrice())}
            </div>
            {formatPrice(sumPrice + getShipPrice())}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Order;
