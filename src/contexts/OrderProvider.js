/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '~/hooks/useAuth';
import useCart from '~/hooks/useCart';
import { httpPostOrder } from '../apiServices/orderServices';
import { toast } from 'react-toastify';

export const OrderContext = createContext({});

const OrderProvider = ({ children }) => {
  const { auth } = useAuth();
  const { removeAll } = useCart();
  const navigate = useNavigate();
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
  const handleCheckout = async (setSubmitting) => {
    console.log(order);
    setSubmitting(true);
    const res = await httpPostOrder(order);
    console.log(res.data);
    if (res.data) {
      removeAll();
      setSubmitting(false);
      toast.success('Đặt hàng thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/personal');
      }, 2000);
    } else
      toast.error(res.errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
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
