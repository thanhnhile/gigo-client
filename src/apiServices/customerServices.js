import * as request from '~/utils/request';

export const httpEditCustomer = (id, payload) => {
  const res = request.put(`/customers/${id}`, payload);
  return res;
};
