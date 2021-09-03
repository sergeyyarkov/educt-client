import { AxiosRequestConfig } from 'axios';
import * as constants from './constants';

const apiConfig: AxiosRequestConfig = {
  baseURL: constants.API_BASE_URL,
  responseType: 'json',
  withCredentials: true,
};

export default apiConfig;
