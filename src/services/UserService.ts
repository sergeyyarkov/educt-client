import { AxiosInstance } from 'axios';
import { IApiRespose, IMe, IUser, IUserContacts } from 'interfaces';
import * as helpers from 'helpers';
import { UserRoleEnum } from 'enums';

export type FetchUsersParamsType = { page?: number; limit?: number; role?: UserRoleEnum | 'any'; search?: string };
export type CreateUserParamsType = {
  first_name: string;
  last_name: string;
  login: string;
  email: string;
  role: UserRoleEnum;
  password: string;
};

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
    const { page = 1, limit = 6, role, search } = params || {};
    const result = await this.api.get('/v1/users', {
      params: {
        page,
        limit,
        role: role === 'any' ? undefined : role,
        search: search || undefined,
      },
    });
    return result.data;
  }

  public async create(data: CreateUserParamsType): Promise<IApiRespose<IUser>> {
    const result = await this.api.post('v1/users', {
      first_name: data.first_name,
      last_name: data.last_name,
      login: data.login,
      email: data.email,
      role: data.role,
      password: data.password,
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
