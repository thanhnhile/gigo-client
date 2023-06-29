import axios from 'axios';
import { LOCAL_STORAGE_KEY } from './enum';
//import MyFallbackComponent from '../components/ErrorHandler';

const refreshToken = async () => {
  try {
    const res = await axios.get('http://localhost:8089/refresh', {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const request = axios.create({
  baseURL: 'http://localhost:8089/',
  withCredentials: true,
});
//config Authorization
request.interceptors.request.use(function (config) {
  const auth = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const token = auth.accessToken;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

//handle response
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (err) => {
    console.log(err);
    const originalConfig = err.config;
    if (err.response.status === 403 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const rs = await refreshToken();
        const { accessToken } = rs.data;
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(accessToken));
        originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;
        return request({
          ...originalConfig,
          ...{
            headers: originalConfig.headers.toJSON(),
          },
        });
      } catch (_error) {
        if (_error.response && _error.response.data) {
          return Promise.reject(_error.response.data);
        }

        return Promise.reject(_error);
      }
    }
    if (err.response.status === 401) {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  }
);

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response.data;
};

export const post = async (path, payload) => {
  const response = await request.post(path, payload);
  return response.data;
};

export const deleteRequest = async (path) => {
  const response = await request.delete(path);
  return response.data;
};

export const put = async (path, payload) => {
  const response = await request.put(path, payload);
  return response.data;
};

export default request;
