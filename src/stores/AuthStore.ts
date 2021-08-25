import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import RootStore from './RootStore';
import AuthService from 'services/AuthService';
import { AxiosInstance } from 'axios';
import { IDataResult, ILoginResult } from 'interfaces';

export default class AuthStore {
  public root: RootStore;

  public authService: AuthService;

  public isLoggedIn: boolean = !!Cookies.get('logged_in');

  public loading: boolean = false;

  constructor(root: RootStore, api: AxiosInstance) {
    this.root = root;
    this.authService = new AuthService(api);
    makeAutoObservable(this);
  }

  public setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  public setLoading(value: boolean) {
    this.loading = value;
  }

  public async login(login: string, password: string): Promise<ILoginResult> {
    try {
      this.setLoading(true);
      const result = await this.authService.requestLogin(login, password);

      this.setIsLoggedIn(true);
      Cookies.set('logged_in', 'true');

      return result;
    } catch (error) {
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  public async logout(): Promise<IDataResult> {
    try {
      this.setLoading(true);
      const result = await this.authService.requestLogout();

      this.setIsLoggedIn(false);
      Cookies.remove('logged_in');
      return result;
    } catch (error) {
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
}
