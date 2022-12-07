import * as request from '../utils/request';
export const httpGetAllStore = () => {
    try {
        const res = request.get(`/stores/`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};