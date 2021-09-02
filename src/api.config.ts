import { AxiosRequestConfig } from 'axios';
import { API_BASE_URL } from './constants';

const apiConfig: AxiosRequestConfig = {
  baseURL: API_BASE_URL,
  responseType: 'json',
  withCredentials: true,
};

export default apiConfig;
