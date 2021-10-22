import { AxiosRequestConfig } from 'axios';

const apiConfig: AxiosRequestConfig = {
  baseURL: '/api/',
  responseType: 'json',
  withCredentials: true,
};

export default apiConfig;
