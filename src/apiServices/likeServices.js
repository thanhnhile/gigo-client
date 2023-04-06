import * as request from '../utils/request';

export const httpLikeProduct = (id) => {
    const res = request.post(`/like/${id}`);
    return res;
};
export const httpUnlikeProduct = (id) => {
    const res = request.post(`/like/unlike/${id}`);
    return res;
};