import * as request from '~/utils/request';

export const httpEditCustomer = (id, payload) => {
  const res = request.put(`/customers/${id}`, payload);
  return res;
};

export const httpPostCustomer = (payload) => {
  try {
    const res = request.post(`/customers`, payload);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
