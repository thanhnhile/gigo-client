import axios from "axios";

const request = axios.create({
    baseURL: 'http://localhost:5000/',
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, payload) => {
    const response = await request.post(path, payload);
    return response.data;
}

export const deleteRequest = async (path) => {
    const response = await request.delete(path);
    return response.data;
}

export const put = async (path, payload) => {
    const response = await request.put(path, payload);
    return response.data;
}

export default request;