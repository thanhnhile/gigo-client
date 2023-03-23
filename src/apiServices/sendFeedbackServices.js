import * as request from '~/utils/request';

export const httpSendFeedback = (payload) => {
  try {
    const res = request.post('/sendFeedback', payload);
    return res;
  } catch (error) {
    console.log(error);
  }
};
