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

export const httpPutEmployee = (id, name, store, account) => {
  const data = { name, store, account };
  try {
    const res = request.put(`/employees/${id}`, data);
    return res;
  } catch (error) {
    console.log(error.response.data.errMsg);
  }
};
