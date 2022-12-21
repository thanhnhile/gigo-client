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
    const res = request.post('/categories', payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpPutCategory = (id, name, status) => {
  const data = { name, status };
  try {
    const res = request.put(`/categories/${id}`, data);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};