import * as request from '~/utils/request';

export const httpGetCustomerInfoByUsername = (username) => {
  const res = request.get(`/accounts/customer/${username}`);
  return res;
};


