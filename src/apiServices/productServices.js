import * as request from '~/utils/request';

export const httpSearchProduct = (keyword) => {
  try {
    const res = request.get(`/products/search?s=${keyword}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpGetAllProduct = () => {
  try {
      const res = request.get(`/products`);
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
export const httpGetProductByCateId = (id) => {
  try {
      const res = request.get(`/products/category/${id}`);
      return res;
  } catch (error) {
      console.log(error.response.data);
  }
};
