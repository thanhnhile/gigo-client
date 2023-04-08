/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useEffect, useState } from 'react';
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
    account_username: auth?.username ? auth.username : null,
    voucher_id: null,
  };
  const [order, setOrder] = useState(initValue);
  const [orderDetail, setOrderDetail] = useState({
    orderType: null,
    total: null,
    details: [],
    voucher_id: null,
  });
  const customer = {
    id: null,
    name: null,
    phone: null,
    address: null,
    provinceId: null,
    districtId: null,
    store_id: null,
  };
  useEffect(() => {
    setOrder({
      ...order,
      ...orderDetail,
    });
  }, [orderDetail]);
  const handleCheckout = async (customer, setSubmitting) => {
    const {
      id,
      name,
      phone,
      address,
      provinceId,
      districtId,
      store_id,
    } = customer;
    const orderPayload = {
      ...order,
      customer: {
        id,
        name,
        phone,
        address,
        provinceId,
        districtId,
      },
      store_id,
    };
    console.log(orderPayload);
    setSubmitting(true);
    const res = await httpPostOrder(orderPayload);
    console.log(res.data);
    if (res.data) {
      removeAll();
      toast.success('Đặt hàng thành công', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate('/personal');
      }, 2000);
    } else {
      toast.error(res.errMsg, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
      });
      console.log(res.errMsg);
    }
    setSubmitting(false);
  };
  return (
    <OrderContext.Provider
      value={{
        orderDetail,
        setOrderDetail,
        customer,
        handleCheckout,
        accountUsername: auth?.username ? auth.username : null,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
