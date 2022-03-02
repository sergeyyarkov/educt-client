import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import apiConfig from '@educt/api.config';

class ApiService {
  public api: AxiosInstance;

  public config: AxiosRequestConfig | undefined;

  constructor(config?: AxiosRequestConfig | undefined) {
    this.config = config;
    this.api = axios.create(this.config);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    /**
     * Response
     */
    this.api.interceptors.response.use(undefined, error => {
      return Promise.reject(error);
    });
  }
}

export const ApiServiceInstance = new ApiService(apiConfig);
