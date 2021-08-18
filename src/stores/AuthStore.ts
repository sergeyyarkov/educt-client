import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import AuthService from '../services/AuthService';
import RootStore from './RootStore';

export default class AuthStore {
  public root: RootStore;

  public token: string | null = null;

  public isLoggedIn: boolean = !!Cookies.get('logged_in');

  public authService: AuthService;

  constructor(root: RootStore) {
    this.root = root;
    this.authService = new AuthService();
    makeAutoObservable(this);
  }

  get getToken(): string | null {
    return this.token;
  }

  public setIsLoggedIn(value: boolean) {
    this.isLoggedIn = value;
  }

  public setToken(token: string) {
    Cookies.set('logged_in', 'true');
    this.token = token;
  }

  public async login(login: string, password: string) {
    const result = await this.authService.requestLogin(login, password);

    this.setIsLoggedIn(true);
    this.setToken(result.data.token);
  }

  public logout() {}
}
