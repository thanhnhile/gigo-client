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
