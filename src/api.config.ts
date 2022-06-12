import { AxiosRequestConfig } from 'axios';
import * as constants from '@educt/constants';

const apiConfig: AxiosRequestConfig = {
  baseURL: `${constants.BACKEND_URL}/`,
  responseType: 'json',
  withCredentials: true,
};

export default apiConfig;
