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

