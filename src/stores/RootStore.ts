// import axios, { AxiosInstance } from 'axios';
// import { API_BASE_URL } from '../constants';
import AuthStore from './AuthStore';

export default class RootStore {
  // public api: AxiosInstance;

  public authStore: AuthStore;

  constructor() {
    /**
     * Api root instance
     */
    // this.api = axios.create({
    //   baseURL: API_BASE_URL,
    //   responseType: 'json',
    // });

    /**
     * Auth store
     */
    this.authStore = new AuthStore(this);
  }
}
