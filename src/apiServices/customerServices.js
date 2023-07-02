import * as request from '~/utils/request';
import { handleException } from '~/utils/handleException';

export const httpGetCustomerById = async (id) => {
  try {
    const res = await request.get(`/customers/${id}`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
export const httpEditCustomer = async (id, payload) => {
  try {
    const res = await request.put(`/customers/${id}`, payload);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
export const httpPostCustomer = async (payload) => {
  try {
    const res = await request.post(`/customers`, payload);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpDeleteCustomer = async (id) => {
  try {
    const res = await request.deleteRequest(`/customers/${id}`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
