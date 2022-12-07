import * as request from '../utils/request';
export const httpGetAllDistrict = () => {
    try {
        const res = request.get(`/districts/`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};