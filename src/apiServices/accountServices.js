import * as request from '../utils/request';
export const httpGetAllAccount = () => {
    try {
        const res = request.get(`/accounts/`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};