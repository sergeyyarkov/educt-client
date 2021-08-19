import axios from 'axios';
import { API_BASE_URL } from '../constants';
import { IDataResult } from '../interfaces';

interface ILoginResult extends IDataResult {
  data: {
    token: string;
    type: string;
    expires_at: string;
  };
}

const api = axios.create({
  baseURL: API_BASE_URL,
  responseType: 'json',
});

export default class AuthService {
  public async requestLogin(
    login: string,
    password: string
  ): Promise<ILoginResult> {
    const result = await api.post('v1/auth/login', {
      login,
      password,
    });

    return result.data;
  }
}
