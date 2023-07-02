import * as request from '~/utils/request';
import { handleException } from '~/utils/handleException';

export const httpRegister = async (payload) => {
  try {
    const res = await request.post('/register', payload);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw handleException(error);
  }
};

export const httpAuth = async (payload) => {
  try {
    const res = await request.post('/auth', payload);
    return res;
  } catch (error) {
    throw handleException(error);
  }
};
