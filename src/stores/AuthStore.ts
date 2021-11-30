import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';

/**
 * Services
 */
import { AuthServiceInstance } from '@educt/services';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class AuthStore {
  public root: RootStore;

  public isLoggedIn: boolean = !!Cookies.get('logged_in');

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  public setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  public async login(login: string, password: string) {
    try {
      const result = await AuthServiceInstance.requestLogin(login, password);

      this.setIsLoggedIn(true);
      Cookies.set('logged_in', 'true');

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async logout() {
    try {
      const result = await AuthServiceInstance.requestLogout();

      this.setIsLoggedIn(false);
      this.root.userStore.reset();
      Cookies.remove('logged_in');
      return result;
    } catch (error) {
      throw error;
    }
  }
}
