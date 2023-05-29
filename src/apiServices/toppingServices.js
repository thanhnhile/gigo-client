import * as request from '~/utils/request';

export const httpGetAllTopping = () => {
  try {
    const res = request.get('/toppings');
    return res;
  } catch (error) {
    console.log(error.response.data);
  }
};
