import ApiService from './ApiService';
import { IDataResult } from '../interfaces';

interface ILoginResult extends IDataResult {
  data: {
    token: string;
    type: string;
    expires_at: string;
  };
}

export default class AuthService {
  public apiService: ApiService;

  constructor(apiService: ApiService) {
    this.apiService = apiService;
  }

  public async requestLogin(
    login: string,
    password: string
  ): Promise<ILoginResult> {
    const result = await this.apiService.api.post('v1/auth/login', {
      login,
      password,
    });

    return result.data;
  }
}
