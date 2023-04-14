import React, { useState, createContext, useRef, useEffect } from 'react';
import className from 'classnames/bind';
import styles from './HistoryOrder.module.scss';
import ListOrder from '~/components/Order/ListOrder/ListOrder';
import { useAuth } from '~/hooks';
import { ORDER_STATUS } from '~/utils/enum';
import { httpGetRatesByUsername } from '~/apiServices/ratingServices';
import { httpGetOrderByAccountUsername } from '~/apiServices/orderServices';

export const historyOrderContext = createContext();
const cx = className.bind(styles);

const HistoryOrder = () => {
  const { auth } = useAuth();
  const [tab, setTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const productsRated = useRef([]);
  const getHistoryOrders = async () => {
    const res = await httpGetOrderByAccountUsername(auth.username);

    if (res.data) {
      setOrders(res.data);
    }
  };
  const getProductsRated = async () => {
    const res = await httpGetRatesByUsername();
    if (res.data) {
      productsRated.current = res.data;
    }
  };
  useEffect(() => {
    getProductsRated();
  }, []);
  useEffect(() => {
    getHistoryOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);
  return (
    <div className={cx('order-info')}>
      <h4>Lịch sử đơn hàng</h4>
      <ul className={cx('tab')}>
        {Object.values(ORDER_STATUS).map((item) => (
          <li
            className={cx('tab-item', { active: item.id === tab })}
            onClick={() => setTab(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <div className={cx('list-order')}>
        <historyOrderContext.Provider
          value={{
            productsRated: productsRated.current,
            tab,
            setTab: setTab,
          }}
        >
          <ListOrder
            orders={
              orders?.length > 0 && orders.filter((item) => item.status === tab)
            }
          />
        </historyOrderContext.Provider>
      </div>
    </div>
  );
};

export default HistoryOrder;
