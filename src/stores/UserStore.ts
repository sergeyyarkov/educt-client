import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { IUserResult, IUser, IUserContacts, IUpdatedContactsResult } from 'interfaces';

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

      runInAction(() => {
        this.me = result.data;
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

  public reset(): void {
    runInAction(() => {
      this.me = null;
    });
  }
}
