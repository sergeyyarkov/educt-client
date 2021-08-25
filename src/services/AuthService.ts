import { IDataResult, ILoginResult } from 'interfaces';
import { AxiosInstance, AxiosResponse } from 'axios';

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
    const result: AxiosResponse<any> = await this.api.post('v1/auth/login', {
      login,
      password,
    });
    return result.data;
  }

  /**
   * Revoke token
   *
   * @returns Data result
   */
  public async requestLogout(): Promise<IDataResult> {
    const result: AxiosResponse<any> = await this.api.post('v1/auth/logout');
    return result.data;
  }
}
