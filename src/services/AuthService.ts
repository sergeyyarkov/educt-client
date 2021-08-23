import { IDataResult } from '../interfaces';
import { AxiosInstance } from 'axios';

export interface ILoginResult extends IDataResult {
  data: {
    token: string;
    type: string;
    expires_at: string;
  };
}

export default class AuthService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Create a new token
   *
   * @param login User login
   * @param password User password
   * @returns Login result
   */
  public async requestLogin(login: string, password: string): Promise<ILoginResult> {
    const result = await this.api.post('v1/auth/login', {
      login,
      password,
    });

    return result.data;
  }

  /**
   * Revoke token
   *
   * @returns Logout result
   */
  public async requestLogout(): Promise<any> {
    const result = await this.api.post('v1/auth/logout');

    return result.data;
  }
}
