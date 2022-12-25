import * as request from '../utils/request';
export const httpGetAllEmployee = () => {
  try {
    const res = request.get(`/employees/`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpGetEmployeeById = (id) => {
  try {
    const res = request.get(`/employees/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const httpPostEmployee = (payload) => {
  try {
    const res = request.post('/employees', payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpPutEmployee = (id, payload) => {
  try {
    const res = request.put(`/employees/${id}`, payload);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};

export const httpDeleteEmployee = (id) => {
  try {
    const res = request.deleteRequest(`/employees/${id}`);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};