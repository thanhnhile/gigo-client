import * as request from '~/utils/request';

export const httpSearchProduct = (keyword) => {
  try {
    const res = request.get(`/products/search?s=${keyword}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpGetAllProduct = (limit = 6, offSet = 1) => {
  try {
    const res = request.get(`/products?limit=${limit}&offSet=${offSet}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpGetProductById = (id) => {
  try {
    const res = request.get(`/products/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpGetProductByCateId = (id, limit = 6, offSet = 1) => {
  try {
    const res = request.get(
      `/products/category/${id}?limit=${limit}&offSet=${offSet}`
    );
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpPostProduct = (payload) => {
  try {
    const res = request.post('/products', payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpPutProduct = (id, payload) => {
  try {
    const res = request.put(`/products/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};
export const httpDeleteProduct = (id) => {
  // try {
  //   const res = request.deleteRequest(`/products/${id}`);
  //   return res;
  // } catch (error) {
  //   console.log(error.response.data.errMsg);
  // }
  try {
    const res = request.put(`/products/product/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};
