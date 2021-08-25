import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import RootStore from 'stores/RootStore';

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
          this.root.userStore.me = null;
          this.root.authStore.setIsLoggedIn(false);
          Cookies.remove('logged_in');
        }
      }
      return Promise.reject(error);
    });
  }
}
