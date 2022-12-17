import React, { createContext, useMemo, useState } from 'react';
import useAuth from '~/hooks/useAuth';
import { httpPostOrder } from '../apiServices/orderServices';

export const OrderContext = createContext({});

const OrderProvider = ({ children }) => {
  const { auth } = useAuth();
  const initValue = {
    orderType: null,
    total: null,
    details: [],
    customer: {},
    store_id: null,
    employee_id: null,
    account_username: auth?.username ? auth.username : null,
  };
  const [order, setOrder] = useState(initValue);
  const [orderDetail, setOrderDetail] = useState({
    orderType: null,
    total: null,
    details: [],
  });
  const [customer, setCustomer] = useState({
    id: null,
    name: null,
    phone: null,
    address: null,
    provinceId: null,
    districtId: null,
    accountUsername: null,
    store_id: null,
  });
  useMemo(() => {
    const {
      id,
      name,
      phone,
      address,
      provinceId,
      districtId,
      accountUsername,
    } = customer;
    setOrder({
      ...order,
      ...orderDetail,
      customer: {
        id,
        name,
        phone,
        address,
        provinceId,
        districtId,
        accountUsername,
      },
      store_id: customer.store_id,
    });
  }, [orderDetail, customer]);
  const handleCheckout = async () => {
    const res = await httpPostOrder(order);
    if (res.data) {
      console.log(res.data);
    } else console.log(res.errMsg);
  };
  return (
    <OrderContext.Provider
      value={{
        order,
        setOrder,
        orderDetail,
        setOrderDetail,
        customer,
        setCustomer,
        handleCheckout,
        accountUsername: auth?.username ? auth.username : null,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
