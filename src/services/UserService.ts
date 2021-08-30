import { AxiosInstance } from 'axios';
import { IUpdatedContactsResult, IUserContacts, IUserResult } from 'interfaces';
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
}
