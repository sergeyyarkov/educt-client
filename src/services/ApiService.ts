import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import RootStore from '../stores/RootStore';

export default class ApiService {
  public root: RootStore;

  public api: AxiosInstance;

  public config: AxiosRequestConfig | undefined;

  constructor(root: RootStore, config?: AxiosRequestConfig | undefined) {
    this.root = root;
    this.config = config;
    this.api = axios.create(this.config);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    /**
     * Response
     */
    this.api.interceptors.response.use(undefined, error => {
      if (error.response) {
        /**
         * Unauthorized Error 401
         */
        if (error.response.status === 401) {
          if (this.root.authStore.isLoggedIn) {
            this.root.userStore.user = null;
            this.root.authStore.setIsLoggedIn(false);
          }
        }
      }
      return Promise.reject(error);
    });
  }
}
