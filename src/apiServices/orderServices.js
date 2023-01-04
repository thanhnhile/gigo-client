import * as request from '~/utils/request';

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
    const res = request.get(`/orders/account/${username}`);
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
      case 1:
        return request.put(`/orders/update/delivering/${id}`);
      case 2:
        return request.put(`/orders/update/success/${id}`);
      case 3:
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