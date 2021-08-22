import { AxiosInstance } from 'axios';

export default class UserService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  public async fetchMe(): Promise<any> {
    const result = await this.api.get('v1/me');

    return result.data;
  }
}
