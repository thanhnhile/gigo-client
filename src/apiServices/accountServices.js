import * as request from '~/utils/request';
export const httpGetAllAccount = () => {
  try {
    const res = request.get(`/accounts/`);
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

export const httpGetAllCustomerInfo = () => {
  try {
    const res = request.get('/accounts/customers');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetCustomerInfoDefault = () => {
  try {
    const res = request.get('/accounts/customers/default');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpPutSetCustomerInfoDefault = (id) => {
  try {
    const res = request.put(`/accounts/customers/default/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetProductLiked = () => {
  try {
    const res = request.get('/accounts/productsLiked');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetProductIdsLiked = () => {
  try {
    const res = request.get('/accounts/productsLiked/id');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
