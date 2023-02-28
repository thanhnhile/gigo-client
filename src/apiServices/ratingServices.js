import * as request from '../utils/request';

export const httpGetRatesByUsername = () => {
  try {
    const res = request.get('/rates/username');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpPostRating = (payload) => {
  try {
    const res = request.post('/rates', payload);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
