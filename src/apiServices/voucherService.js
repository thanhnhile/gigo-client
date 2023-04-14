import * as request from '../utils/request';
export const httpGetAllVoucher = () => {
    try {
        const res = request.get(`/vouchers/`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};

export const httpGetVoucherById = (id) => {
    try {
        const res = request.get(`/vouchers/${id}`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};

export const httpSearchVoucher = (code) => {
    try {
        const res = request.get(`/vouchers/search?code=${code}`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};

export const httpPostVoucher = (payload) => {
    try {
        const res = request.post('/vouchers', payload);
        return res;
    } catch (error) {
        console.log(error.response.data.errMsg);
    }
};

export const httpPutVoucher = (id, payload) => {
    try {
        const res = request.put(`/vouchers/${id}`, payload);
        return res;
    } catch (error) {
        console.log(error.response.data.errMsg);
    }
};

export const httpDeleteVoucher = (id, payload) => {
    try {
        const res = request.deleteRequest(`/vouchers/${id}`, payload);
        return res;
    } catch (error) {
        console.log(error.response.data.errMsg);
    }
};

export const httpGetVoucherByAccount = () => {
    try {
      const res = request.get('/vouchers/account');
      return res;
    } catch (error) {
      console.log(error.response.data);
    }
  };