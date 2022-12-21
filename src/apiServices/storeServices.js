import * as request from '../utils/request';
export const httpGetAllStore = () => {
  try {
    const res = request.get(`/stores/`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetStoreByAddress = (provinceId, districtId) => {
  const res = request.get(`/stores/address/${provinceId}/${districtId}`);
  return res;
};

export const httpGetStoreById = (id) => {
  try {
    const res = request.get(`/stores/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpPostStore = (payload) => {
  try {
    const res = request.post('/stores', payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpPutStore = (id,name,status) => {
  const data ={name,status};
  try {
      const res = request.put(`/stores/${id}`, data);
      return res;
  } catch (error) {
      console.log(error.response.data.errMsg);
  }
};