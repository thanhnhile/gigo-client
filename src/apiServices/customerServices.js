import * as request from '~/utils/request';

export const httpGetCustomerById = (id) => {
  try {
    const res = request.get(`/customers/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpEditCustomer = (id, payload) => {
  try {
    const res = request.put(`/customers/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpPostCustomer = (payload) => {
  try {
    const res = request.post(`/customers`, payload);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
