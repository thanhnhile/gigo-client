import * as request from '../utils/request';
export const httpGetAllEmployee = () => {
    try {
        const res = request.get(`/employees/`);
        return res;
    } catch (error) {
        console.log(error.response.data);
    }
};