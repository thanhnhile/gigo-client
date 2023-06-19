import * as request from '../utils/request';
export const httpGetAllToppings = () => {
  try {
    const res = request.get(`/toppings`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpGetAvailableToppings = () => {
  try {
    const res = request.get(`/toppings/available`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpGetToppingById = (id) => {
  try {
    const res = request.get(`/toppings/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpPostTopping = (payload) => {
  try {
    const res = request.post('/toppings/add', payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpPutTopping = (id, payload) => {
  try {
    const res = request.put(`/toppings/update/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpDeleteTopping = (id) => {
  try {
    const res = request.put(`/toppings/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};
