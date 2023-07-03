import * as request from '~/utils/request';
import { handleException } from '~/utils/handleException';

export const httpGetAllAccount = async () => {
  try {
    const res = await request.get(`/accounts/`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
export const httpGetAvailableAccount = () => {
  try {
    const res = request.get(`/accounts/available`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpForgotPassword = (email) => {
  const res = request.post(`/accounts/forgot_password/${email}`);
  return res;
};
export const httpResetPassword = (token, payload) => {
  const res = request.put(`/accounts/reset_password/${token}`, payload);
  return res;
};

export const httpGetAllCustomerInfo = async () => {
  try {
    const res = await request.get('/accounts/customers');
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpGetCustomerInfoDefault = async () => {
  try {
    const res = await request.get('/accounts/customers/default');
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpPutSetCustomerInfoDefault = async (id) => {
  try {
    const res = await request.put(`/accounts/customers/default/${id}`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};

export const httpGetProductLiked = async () => {
  try {
    const res = await request.get('/accounts/productsLiked');
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
