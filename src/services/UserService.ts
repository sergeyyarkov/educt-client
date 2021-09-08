import { AxiosInstance } from 'axios';
import {
  IDataResult,
  ISentCodeResult,
  IUpdatedContactsResult,
  IUpdatedUserEmail,
  IUserContacts,
  IUserResult,
} from 'interfaces';
import * as helpers from 'helpers';

export default class UserService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  public async fetchMe(): Promise<IUserResult> {
    const result = await this.api.get('v1/me');
    return result.data;
  }

  public async updateContacts(data: IUserContacts): Promise<IUpdatedContactsResult> {
    const result = await this.api.put('v1/me/contacts', helpers.removeEmptyValues(data));
    return result.data;
  }

  public async updatePassword(oldPassword: string, newPassword: string): Promise<IDataResult> {
    const result = await this.api.patch('v1/me/password', {
      oldPassword,
      newPassword,
    });
    return result.data;
  }

  public async updateEmail(email: string): Promise<ISentCodeResult> {
    const result = await this.api.patch('v1/me/email', { email });
    return result.data;
  }

  public async updateEmailConfirm(email: string, confirmationCode: string): Promise<IUpdatedUserEmail> {
    const result = await this.api.post('v1/me/email/change/confirm', {
      email,
      confirmationCode,
    });
    return result.data;
  }
}
