import * as request from '~/utils/request';

export const httpRegister = (payload) => {
  const res = request.post('/register', payload);
  return res;
};

export const httpAuth = (payload) => {
  const res = request.post('/auth', payload);
  return res;
};