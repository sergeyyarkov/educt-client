import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import {
  IUserResult,
  IUser,
  IUserContacts,
  IUpdatedContactsResult,
  IDataResult,
  ISentCodeResult,
  IUpdatedUserEmail,
} from 'interfaces';

/**
 * Services
 */
import UserService from 'services/UserService';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class UserStore {
  public root: RootStore;

  public userService: UserService;

  public me: IUser | null = null;

  public users: IUser[] = [];

  constructor(root: RootStore, api: AxiosInstance) {
    this.root = root;
    this.userService = new UserService(api);
    makeAutoObservable(this);
  }

  public async loadCurrentUserData(): Promise<IUserResult> {
    try {
      const result = await this.userService.fetchMe();
      const {
        data: { id, first_name, last_name, email, roles, contacts },
      } = result;

      runInAction(() => {
        this.me = {
          id,
          fullname: `${first_name} ${last_name}`,
          first_name,
          last_name,
          email,
          roles,
          contacts,
        };
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateCurrentUserContacts(data: IUserContacts): Promise<IUpdatedContactsResult> {
    try {
      const result = await this.userService.updateContacts(data);

      runInAction(() => {
        if (this.me) {
          this.me.contacts = result.data;
        }
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateCurrentUserPassword(oldPassword: string, newPassword: string): Promise<IDataResult> {
    try {
      const result = await this.userService.updatePassword(oldPassword, newPassword);
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send confirmation code on update user email
   *
   * @param email New email
   * @returns Expires at code in seconds
   */
  public async updateCurrentUserEmail(email: string): Promise<ISentCodeResult> {
    try {
      const result = await this.userService.updateEmail(email);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public async updateCurrentUserEmailConfirm(email: string, confirmationCode: string): Promise<IUpdatedUserEmail> {
    try {
      const result = await this.userService.updateEmailConfirm(email, confirmationCode);
      return result;
    } catch (error) {
      throw error;
    }
  }

  public reset(): void {
    runInAction(() => {
      this.me = null;
    });
  }
}
