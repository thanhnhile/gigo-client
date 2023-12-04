import axios from 'axios';
import { LOCAL_STORAGE_KEY } from './enum';
const LOGIN_PATH = '/auth';
const ACCESS_DENIED_MSG = 'Access denied';

const refreshToken = async () => {
  try {
    const res = await axios.get('http://localhost:8089/refresh', {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    throw error;
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
let isRefreshing = false;
let refreshSubscribers = [];
//handle response
request.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 403 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Wait for the new access token
        return new Promise((resolve) => {
          refreshSubscribers.push((accessToken) => {
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            resolve(axios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await refreshToken();
        const { accessToken } = response.data;
        // Update the original request headers with the new access token
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
        //Update auth storage in local
        const auth = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        const newAuth = { ...auth, accessToken };
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newAuth));
        // Retry the original request with the new access token
        return axios({
          ...originalRequest,
          ...{
            headers: originalRequest.headers.toJSON(),
          },
        });
      } catch (refreshError) {
        redirectToSameOriginPage(LOGIN_PATH);
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      } finally {
        isRefreshing = false;
        refreshSubscribers.forEach((subscriber) => subscriber());
        refreshSubscribers = [];
      }
    } else if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.errMsg === ACCESS_DENIED_MSG
    ) {
      redirectToSameOriginPage(LOGIN_PATH);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    return Promise.reject(error);
  }
);

export const get = async (path, options = {}) => {
  const response = await request.get(path, options);
  return response?.data;
};

export const post = async (path, payload) => {
  const response = await request.post(path, payload);
  return response?.data;
};

export const deleteRequest = async (path) => {
  const response = await request.delete(path);
  return response?.data;
};

export const put = async (path, payload) => {
  const response = await request.put(path, payload);
  return response?.data;
};

export function redirectToSameOriginPage(pathname) {
  window.location.href = pathname;
  // const hostname = window.location.host;
  // // Replace the pathname portion of the URL with the desired path
  // const newUrl = `${hostname}${pathname}`;
  // // Redirect to the new URL
  // window.location.href = newUrl;
}
export default request;
