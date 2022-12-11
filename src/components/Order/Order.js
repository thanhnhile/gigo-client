import React, { useMemo, useState } from 'react';
import Select from 'react-select';
import className from 'classnames/bind';
import styles from './Order.module.scss';
import CartItem from './CartItem';
import Customer from './Customer';
import { Icon } from '@iconify/react';

import useCart from '../../hooks/useCart';
import { formatPrice } from '~/utils/format';
import { DELIVERY_METHOD } from '~/utils/enum';

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
  const storeData = [
    {
      id: 1,
      districtId: 1,
      name: 'HCM Hoàng Việt',
      address: '17 Út tịch, Q. Tân Bình, Hồ Chí Minh',
    },
    {
      id: 2,
      districtId: 1,
      name: 'HCM Ấp Bắc',
      address: '4 - 6 Ấp Bắc, Q. Tân Bình, Hồ Chí Minh',
    },
    {
      id: 3,
      districtId: 1,
      name: 'HCM Tỉnh Lộ 10',
      address: '516 Tỉnh Lộ 10, Bình Trị Đông, Bình Tân, Hồ Chí Minh',
    },
  ];
  return (
    <div className={cx('container')}>
      <div className={cx('window')} scroll='no'>
        <div className={cx('order-info')}>
          <div className={cx('order-info-content')}>
            <h2>Món đã chọn</h2>
            <button onClick={removeAll}>Xóa tất cả</button>
            <div className={cx('line')}></div>
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
            <div className={cx('line')}></div>
            <div className={cx('total')}>
              <span style={{ float: 'left' }}>
                <div className={cx('thin dense')}>Thành tiền</div>
                <div className={cx('thin dense')}>Phí giao hàng</div>
                TỔNG CỘNG
              </span>
              <span style={{ float: 'right', textAlign: 'right' }}>
                <div className={cx('thin dense')}>{formatPrice(sumPrice)}</div>
                <div className={cx('thin dense')}>{formatPrice(shipPrice)}</div>
                {formatPrice(sumPrice + shipPrice)}
              </span>
            </div>
          </div>
        </div>
        <div className={cx('customer-info')}>
          <h2>Thông tin khách hàng</h2>
          <div className={cx('customer-info-content')}>
            <table className={cx('half-input-table')}>
              <tbody>
                <tr>
                  <td>Phương thức đặt hàng: </td>
                  <td>
                    <select
                      className={cx('select-btn')}
                      defaultValue={0}
                      onChange={(e) =>
                        setShipPrice(Number.parseInt(e.target.value))
                      }
                    >
                      {DELIVERY_METHOD.map((method) => (
                        <option
                          className={cx('option')}
                          key={method.id}
                          value={method.price}
                        >
                          {method.name}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              </tbody>
            </table>
            {/*Form customer */}
            <Customer />
            {/*Form customer */}
          </div>
          <button className={cx('pay-btn')}>
            <Icon icon='carbon:wireless-checkout' />
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

export default Order;
