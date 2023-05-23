import * as request from '../utils/request';

export const httpLikeProduct = (id) => {
  try {
    const res = request.post(`/like/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
export const httpUnlikeProduct = (id) => {
  try {
    const res = request.post(`/like/unlike/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
