import { IApiRespose, IToken } from '@educt/interfaces';
import { AxiosInstance } from 'axios';
import { ApiServiceInstance } from '.';

export interface AuthServiceImpl {
  /**
   * Login user with login and passwors
   */
  requestLogin(login: string, password: string): Promise<IApiRespose<IToken>>;

  /**
   * Logout user
   */
  requestLogout(): Promise<IApiRespose<{}>>;
}

class AuthService implements AuthServiceImpl {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Create a new token
   *
   * @param login User login
   * @param password User password
   * @returns Token result data
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
   * @returns Empty obj
   */
  public async requestLogout(): Promise<IApiRespose<{}>> {
    const result = await this.api.post('v1/auth/logout');
    return result.data;
  }
}

export const AuthServiceInstance = new AuthService(ApiServiceInstance.api);
