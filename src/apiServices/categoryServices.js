import * as request from '../utils/request';
export const httpGetAllCategory = () => {
    try {
        const res = request.get(`/categories`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};