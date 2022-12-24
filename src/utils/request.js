import axios from 'axios';
import { LOCAL_STORAGE_KEY } from './enum';

const request = axios.create({
  baseURL: 'http://localhost:8089/',
});
//config Authorization
request.interceptors.request.use(function (config) {
  const auth = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const token = auth.accessToken;
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

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
