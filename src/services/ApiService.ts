import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import RootStore from '../stores/RootStore';

export default class ApiService {
  public root: RootStore;

  public api: AxiosInstance;

  constructor(root: RootStore, config?: AxiosRequestConfig | undefined) {
    this.root = root;
    this.api = axios.create(config);
    this.setupInterceptors();
  }

  private setupInterceptors() {
    /**
     * Response
     */
    this.api.interceptors.response.use(undefined, (error) => {
      /**
       * Unauthorized
       */
      if (
        error.response.status === 401 ||
        error.response.data.message === '401 Unauthorized'
      ) {
        this.root.authStore.setIsLoggedIn(false);
      }
      return Promise.reject(error);
    });
  }

  get config(): AxiosRequestConfig | undefined {
    return this.config;
  }
}
