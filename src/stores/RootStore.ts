import { makeAutoObservable } from 'mobx';
import { API_BASE_URL } from '../constants';

/**
 * Services
 */
import ApiService from 'services/ApiService';

/**
 * Stores
 */
import AuthStore from './AuthStore';
import UserStore from './UserStore';

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
