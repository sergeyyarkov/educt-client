import { IApiRespose, IToken } from 'interfaces';
import { AxiosInstance } from 'axios';

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
   * @returns Login result data
   */
  public async requestLogin(login: string, password: string): Promise<IApiRespose<IToken>> {
    const result = await this.api.post('v1/auth/login', {
      login,
      password,
    });
    return result.data;
  }

  /**
   * Revoke token
   *
   * @returns Any
   */
  public async requestLogout(): Promise<IApiRespose<any>> {
    const result = await this.api.post('v1/auth/logout');
    return result.data;
  }
}
