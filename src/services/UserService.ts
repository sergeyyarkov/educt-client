import { AxiosInstance } from 'axios';
import { IApiRespose, IMe, IUser, IUserContacts } from 'interfaces';
import * as helpers from 'helpers';

export type FetchUsersParamsType = { page?: number; limit?: number };

export default class UserService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  public async fetchMe(): Promise<IApiRespose<IMe>> {
    const result = await this.api.get('v1/me');
    return result.data;
  }

  public async fetchAll(params?: FetchUsersParamsType): Promise<IApiRespose<IUser[]>> {
    const { page, limit } = params || {};
    const result = await this.api.get('/v1/users', {
      params: {
        page,
        limit,
      },
    });
    return result.data;
  }

  public async updateContacts(data: IUserContacts): Promise<IApiRespose<IUserContacts>> {
    const result = await this.api.put('v1/me/contacts', helpers.removeEmptyValues(data));
    return result.data;
  }

  public async updatePassword(oldPassword: string, newPassword: string): Promise<IApiRespose<any>> {
    const result = await this.api.patch('v1/me/password', {
      oldPassword,
      newPassword,
    });
    return result.data;
  }

  public async updateEmail(email: string): Promise<IApiRespose<{ expired_seconds: number }>> {
    const result = await this.api.patch('v1/me/email', { email });
    return result.data;
  }

  public async updateEmailConfirm(
    email: string,
    confirmationCode: string
  ): Promise<IApiRespose<{ email: IUser['email'] }>> {
    const result = await this.api.post('v1/me/email/change/confirm', {
      email,
      confirmationCode,
    });
    return result.data;
  }
}
