import * as request from '../utils/request';
export const httpGetAllCategories = () => {
  try {
    const res = request.get(`/categories`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpGetCategoryById = (id) => {
  try {
    const res = request.get(`/categories/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpPostCategory = (payload) => {
  try {
    const res = request.post('/categories/add', payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpPutCategory = (id, payload) => {
  try {
    const res = request.put(`/categories/update/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpDeleteCategory = (id) => {
  try {
    const res = request.put(`/categories/update/category/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};