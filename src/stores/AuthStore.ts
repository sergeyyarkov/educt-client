import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import RootStore from './RootStore';

export default class AuthStore {
  public root: RootStore;

  public token: string | null = null;

  public isLoggedIn: boolean = !!Cookies.get('logged_in');

  public loading: boolean = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  public setIsLoggedIn(value: boolean) {
    Cookies.remove('logged_in');
    this.isLoggedIn = value;
  }

  public setLoading(value: boolean) {
    this.loading = value;
  }

  public setToken(token: string) {
    Cookies.set('logged_in', 'true');
    this.token = token;
  }

  public async login(login: string, password: string) {
    try {
      this.setLoading(true);
      const result = await this.root.authService.requestLogin(login, password);

      this.setIsLoggedIn(true);
      this.setToken(result.data.token);

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  public async logout() {
    try {
      this.setLoading(true);
      const result = await this.root.authService.requestLogout();

      this.setIsLoggedIn(false);
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
}
