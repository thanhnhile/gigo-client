import * as request from '~/utils/request';
import { ORDER_STATUS } from '../utils/enum';

export const httpPostOrder = (payload) => {
  try {
    const res = request.post('/orders', payload);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetOrderByAccountUsername = (username) => {
  try {
    const res = request.get(`/orders/history`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetOrderByStoreId = (id) => {
  try {
    const res = request.get(`/orders?store_id=${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetOrderById = (id) => {
  try {
    const res = request.get(`/orders/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpUpdateStatusOrder = (id, status) => {
  try {
    switch (status) {
      case ORDER_STATUS.DELIVERING.id:
        return request.put(`/orders/update/delivering/${id}`);
      case ORDER_STATUS.SUCCESS.id:
        return request.put(`/orders/update/success/${id}`);
      case ORDER_STATUS.CANCELED.id:
        return request.put(`/orders/update/cancel/${id}`);
      default:
        console.log('NOT SUPPORT');
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetAllOrders = () => {
  try {
    const res = request.get('/orders/all');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
