import { AxiosInstance } from 'axios';
import { IDataResult, IUpdatedContactsResult, IUpdatedEmailResult, IUserContacts, IUserResult } from 'interfaces';
import * as helpers from 'helpers';

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

  /**
   * Update authorized user contacts data
   *
   * @param data User contacts
   * @returns Updated user contacts data
   */
  public async updateContacts(data: IUserContacts): Promise<IUpdatedContactsResult> {
    const result = await this.api.put('v1/me/contacts', helpers.removeEmptyValues(data));
    return result.data;
  }

  /**
   * Update password of authorized user
   *
   * @param oldPassword string
   * @param newPassword string
   * @returns Result data
   */
  public async updatePassword(oldPassword: string, newPassword: string): Promise<IDataResult> {
    const result = await this.api.patch('v1/me/password', {
      oldPassword,
      newPassword,
    });
    return result.data;
  }

  public async updateEmail(email: string): Promise<IUpdatedEmailResult> {
    const result = await this.api.patch('v1/me/email', { email });
    return result.data;
  }

  public async updateEmailConfirm(email: string, confirmationCode: number): Promise<IDataResult> {
    const result = await this.api.post('v1/me/email/change/confirm', {
      email,
      confirmationCode,
    });
    return result.data;
  }
}
