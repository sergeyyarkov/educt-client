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
    this.api.interceptors.response.use(undefined, (error) => {
      if (error.response) {
        /**
         * Internal Server Error 500
         */
        if (error.response.status === 500) {
        }

        /**
         * Unauthorized Error 401
         */
        if (error.response.status === 401) {
          if (this.root.authStore.isLoggedIn) {
            this.root.authStore.setIsLoggedIn(false);
          }
        }

        /* Clear error state from root */
        if (this.root.networkApiError !== undefined) {
          this.root.setNetworkApiError(undefined);
        }
      } else {
        this.root.setNetworkApiError(error);
      }
      return Promise.reject(error);
    });
  }
}
