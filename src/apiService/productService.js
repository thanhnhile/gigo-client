import * as request from '../utils/request';
export const httpGetAllProduct = (size = 12, page = 1) => {
    try {
        const res = request.get(`/products`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};
export const httpGetProductById = (id) => {
    try {
        const res = request.get(`/products/${id}`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};
