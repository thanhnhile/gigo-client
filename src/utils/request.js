import axios from 'axios';
import { LOCAL_STORAGE_KEY } from './enum';
//import ErrorHandler from '../components/ErrorHandler';
const EMPTY_REPONSE = {
  data: {
    data: null,
  },
};

const request = axios.create({
  baseURL: 'http://localhost:8089/',
});

const handleApiError = (errorResponse) => {
  const code = errorResponse?.errCode || '400';
  // const message =
  //   errorResponse?.errMsg ||
  //   'oppps! something went wrong while setting up request';
  switch (code) {
    case '401':
      window.location.href = '/unauthorized';
      break;
    case '403':
      window.location.href = '/auth';
      break;
    default:
      window.location.href = '/error';
  }
};

//config Authorization
request.interceptors.request.use(function (config) {
  const auth = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  const token = auth.accessToken;
  config.headers.Authorization = token ? `Bearer ${token}` : '';

  return config;
});

// //response handler
// request.interceptors.response.use((response) => {
//   if (response?.data?.errCode === '200') return response;
//   //handleApiError(response?.data);
//   return EMPTY_REPONSE;
// });

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
