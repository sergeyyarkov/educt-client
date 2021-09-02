import apiConfig from 'api.config';
import { makeAutoObservable } from 'mobx';

/**
 * Services
 */
import ApiService from 'services/ApiService';

/**
 * Stores
 */
import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';

export default class RootStore {
  public uiStore: UIStore;

  public authStore: AuthStore;

  public userStore: UserStore;

  public apiService: ApiService;

  constructor() {
    /**
     * Api service
     */
    this.apiService = new ApiService(this, apiConfig);

    /**
     * Stores
     */
    this.uiStore = new UIStore(this);
    this.authStore = new AuthStore(this, this.apiService.api);
    this.userStore = new UserStore(this, this.apiService.api);

    makeAutoObservable(this);
  }
}
