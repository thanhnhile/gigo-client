import * as request from '../utils/request';
import { handleException } from '~/utils/handleException';

export const httpLikeProduct = async (id) => {
  try {
    const res = await request.post(`/like/${id}`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
export const httpUnlikeProduct = async (id) => {
  try {
    const res = await request.post(`/like/unlike/${id}`);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
