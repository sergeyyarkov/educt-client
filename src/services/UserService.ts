import { AxiosInstance } from 'axios';
import { IApiRespose, IMe, IUser, IUserContacts } from 'interfaces';
import * as helpers from 'helpers';
import { CreateUserParamsType, FetchUsersParamsType, UpdateUserParamsType } from 'types';

export default class UserService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Fetch authorized user
   *
   * @returns Authorized user data
   */
  public async fetchMe(): Promise<IApiRespose<IMe>> {
    const result = await this.api.get('v1/me');
    return result.data;
  }

  /**
   * Fetch all users
   *
   * @param params Fetch users params
   * @returns Array of users
   */
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

  /**
   * Create new user
   *
   * @param data Data for creating user
   * @returns Created user
   */
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

  /**
   * Delete user by id
   *
   * @param id User id
   * @returns Deleted user
   */
  public async delete(id: string): Promise<IApiRespose<IUser>> {
    const result = await this.api.delete(`v1/users/${id}`);
    return result.data;
  }

  /**
   * Update user by id
   *
   * @param id User id
   * @param data Data to update
   * @returns Updated user
   */
  public async update(id: string, data: UpdateUserParamsType): Promise<IApiRespose<IUser>> {
    const result = await this.api.patch(`v1/users/${id}`, data);
    return result.data;
  }

  /**
   * Update contacts of authorized user
   *
   * @param data New values for contacts
   * @returns Updated contacts
   */
  public async updateContacts(data: IUserContacts): Promise<IApiRespose<IUserContacts>> {
    const result = await this.api.put('v1/me/contacts', helpers.removeEmptyValues(data));
    return result.data;
  }

  /**
   * Update password of authorized user
   *
   * @param oldPassword Old password
   * @param newPassword New password
   * @returns Empty object
   */
  public async updatePassword(oldPassword: string, newPassword: string): Promise<IApiRespose<{}>> {
    const result = await this.api.patch('v1/me/password', {
      oldPassword,
      newPassword,
    });
    return result.data;
  }

  /**
   * Request on update email of authorized user
   *
   * @param email New email
   * @returns Expiration in seconds for confirmation code
   */
  public async updateEmail(email: string): Promise<IApiRespose<{ expired_seconds: number }>> {
    const result = await this.api.patch('v1/me/email', { email });
    return result.data;
  }

  /**
   * Confirm updating email of authorized user
   *
   * @param email New email
   * @param confirmationCode Code for confirmation
   * @returns Updated email
   */
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
