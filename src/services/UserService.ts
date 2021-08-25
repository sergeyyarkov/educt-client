import { AxiosInstance } from 'axios';
import { IUserResult } from 'interfaces';

export default class UserService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Fetch authorized user data
   *
   * @returns User data
   */
  public async fetchMe(): Promise<IUserResult> {
    const result = await this.api.get('v1/me');
    return result.data;
  }
}
