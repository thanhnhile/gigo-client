import * as request from '~/utils/request';

export const httpPostOrder = (payload) => {
  try {
    const res = request.post('/orders', payload);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
