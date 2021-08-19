import { API_BASE_URL } from '../constants';
import AuthStore from './AuthStore';

import ApiService from '../services/ApiService';
import AuthService from '../services/AuthService';

export default class RootStore {
  public authStore: AuthStore;

  public apiService: ApiService;

  public authService: AuthService;

  constructor() {
    /**
     * Stores
     */
    this.authStore = new AuthStore(this);

    /**
     * Services
     */
    this.apiService = new ApiService(this, {
      baseURL: API_BASE_URL,
      responseType: 'json',
    });
    this.authService = new AuthService(this.apiService);
  }
}
