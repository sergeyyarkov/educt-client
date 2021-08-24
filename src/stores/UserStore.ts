import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import { IUserResult } from '../interfaces';
import UserService from '../services/UserService';
import RootStore from './RootStore';

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

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
}
