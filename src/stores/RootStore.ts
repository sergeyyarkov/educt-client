import { API_BASE_URL } from '../constants';
import AuthStore from './AuthStore';

import ApiService from '../services/ApiService';
import AuthService from '../services/AuthService';
import UserStore from './UserStore';
import { makeAutoObservable } from 'mobx';

export default class RootStore {
  public networkApiError: any;

  public authStore: AuthStore;

  public userStore: UserStore;

  public apiService: ApiService;

  public authService: AuthService;

  constructor() {
    /**
     * Stores
     */
    this.authStore = new AuthStore(this);
    this.userStore = new UserStore(this);

    /**
     * Services
     */
    this.apiService = new ApiService(this, {
      baseURL: API_BASE_URL,
      responseType: 'json',
      withCredentials: true,
    });
    this.authService = new AuthService(this.apiService.api);
    makeAutoObservable(this);
  }

  public setNetworkApiError(error: any) {
    this.networkApiError = error;
  }
}
