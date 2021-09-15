import { makeAutoObservable } from 'mobx';
import { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

/**
 * Services
 */
import AuthService from 'services/AuthService';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class AuthStore {
  public root: RootStore;

  public authService: AuthService;

  public isLoggedIn: boolean = !!Cookies.get('logged_in');

  constructor(root: RootStore, api: AxiosInstance) {
    this.root = root;
    this.authService = new AuthService(api);
    makeAutoObservable(this);
  }

  public setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  public async login(login: string, password: string) {
    try {
      const result = await this.authService.requestLogin(login, password);

      this.setIsLoggedIn(true);
      Cookies.set('logged_in', 'true');

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async logout() {
    try {
      const result = await this.authService.requestLogout();

      this.setIsLoggedIn(false);
      this.root.userStore.reset();
      Cookies.remove('logged_in');
      return result;
    } catch (error) {
      throw error;
    }
  }
}
