import * as request from '~/utils/request';

export const httpSearchProduct = (keyword) => {
  try {
    const res = request.get(`/products/search?s=${keyword}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
