import * as request from '~/utils/request';
import { handleException } from '~/utils/handleException';
import { ORDER_STATUS } from '../utils/enum';

export const httpPostOrder = async (payload) => {
  try {
    const res = await request.post('/orders', payload);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpGetOrderByAccountUsername = async () => {
  try {
    const res = await request.get(`/orders/history`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpGetOrderByStoreId = async (id) => {
  try {
    const res = await request.get(`/orders?store_id=${id}`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpGetOrderById = async (id) => {
  try {
    const res = await request.get(`/orders/${id}`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpUpdateStatusOrder = async (id, status) => {
  try {
    switch (status) {
      case ORDER_STATUS.DELIVERING.id:
        return await request.put(`/orders/update/delivering/${id}`);
      case ORDER_STATUS.SUCCESS.id:
        return await request.put(`/orders/update/success/${id}`);
      case ORDER_STATUS.CANCELED.id:
        return await request.put(`/orders/update/cancel/${id}`);
      default:
        console.log('NOT SUPPORT');
    }
  } catch (error) {
    throw handleException(error);
  }
};

export const httpGetAllOrders = async () => {
  try {
    const res = await request.get('/orders/all');
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
