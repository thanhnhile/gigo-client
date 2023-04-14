/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import className from 'classnames/bind';
import styles from './Order.module.scss';
import CartItem from '../CartItem';
import Voucher from '../Voucher';
import { Icon } from '@iconify/react';
import useCart from '../../../hooks/useCart';
import { formatPrice } from '~/utils/format';
import { DELIVERY_METHOD } from '../../../utils/enum';
import useOrder from '../../../hooks/useOrder';

const cx = className.bind(styles);

const cacl = (cart) => {
  return cart.reduce(
    (result, current) =>
      (result +=
        Number.parseInt(current.price) * Number.parseInt(current.quantity)),
    0
  );
};
function Order() {
  const { cart, removeAll } = useCart();
  const { orderDetail, setOrderDetail, accountUsername } = useOrder();
  const [shipMethod, setShipMethod] = useState(
    orderDetail.orderType || DELIVERY_METHOD[0].id
  );
  const [sumPrice, setSumPrice] = useState(() => cacl(cart));
  const [voucher, setVoucher] = useState({});
  const getDiscount = () => {
    const { value, minimumOrderValue, maximumDiscountAmount } = voucher || {};
    let discount = 0;
    if (sumPrice < minimumOrderValue) {
      return 0;
    }
    discount = sumPrice * value;
    discount =
      maximumDiscountAmount && discount > maximumDiscountAmount
        ? maximumDiscountAmount
        : discount;

    return discount;
  };
  useEffect(() => {
    setSumPrice(cacl(cart));
    setOrderDetail((prev) => {
      const newDetails = cart.map((item) => {
        return {
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
        };
      });
      return {
        ...prev,
        details: newDetails,
        orderType: shipMethod,
        total: cacl(cart) + getShipPrice() - getDiscount(),
        voucher_id: voucher?.id,
      };
    });
  }, [cart, shipMethod, voucher]);
  const getShipPrice = () => {
    return DELIVERY_METHOD.find((item) => item.id === shipMethod).price;
  };
  return (
    <div className={cx('container')}>
      <div className={cx('order-info')}>
        <h2>Món đã chọn</h2>
        <div className={cx('line')}></div>
        <button className={cx('btn-link')} onClick={removeAll}>
          Xóa tất cả
        </button>
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
        {accountUsername && (
          <>
            <div className={cx('line')}></div>{' '}
            <Voucher seleted={voucher} setSelected={setVoucher} />
          </>
        )}
        <div className={cx('line')}></div>
        <section>
          <h4>
            <Icon icon='solar:bill-list-outline' className={cx('icon')} />
            Chi tiết thanh toán
          </h4>
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
                  value={orderDetail.orderType}
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
              <div className={cx('thin dense')}>Giảm giá</div>
              <div className={cx('thin dense')}>Tổng thanh toán</div>
            </span>
            <span>
              <div className={cx('thin dense')}>{formatPrice(sumPrice)}</div>
              <div className={cx('thin dense')}>
                {formatPrice(getShipPrice())}
              </div>
              <div className={cx('thin dense')}>
                {formatPrice(getDiscount())}
              </div>
              <div className={cx('thin dense')}>
                <span className={cx('after-discount')}>
                  {formatPrice(sumPrice + getShipPrice() - getDiscount())}
                </span>
              </div>
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Order;
