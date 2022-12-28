import { get } from '../utils/request';

export const getAdminStatistics = () => {
  try {
    const res = get('/statistics/admin');
    return res;
  } catch (err) {
    console.log(err.response.data);
  }
};
