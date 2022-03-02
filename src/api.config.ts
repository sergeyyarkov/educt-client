import { AxiosRequestConfig } from 'axios';
import * as constants from '../constants';

const apiConfig: AxiosRequestConfig = {
  baseURL: `${constants.BACKEND_URL}/api/`,
  responseType: 'json',
  withCredentials: true,
};

export default apiConfig;
