import * as request from '~/utils/request';

export const getVoucherByAccount = () => {
  try {
    const res = request.get(`/vouchers/account`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const getVoucherByCode = (code) => {
  try {
    const res = request.get(`/vouchers/search?code=${code}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
