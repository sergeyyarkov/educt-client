import { API_BASE_URL } from '../constants';
import AuthStore from './AuthStore';

import ApiService from '../services/ApiService';
import UserStore from './UserStore';
import { makeAutoObservable } from 'mobx';

export default class RootStore {
  public authStore: AuthStore;

  public userStore: UserStore;

  public apiService: ApiService;

  constructor() {
    /**
     * Api service
     */
    this.apiService = new ApiService(this, {
      baseURL: API_BASE_URL,
      responseType: 'json',
      withCredentials: true,
    });

    /**
     * Stores
     */
    this.authStore = new AuthStore(this, this.apiService.api);
    this.userStore = new UserStore(this, this.apiService.api);

    makeAutoObservable(this);
  }
}
