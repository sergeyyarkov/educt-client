import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export default class UserStore {
  public root: RootStore;

  public user: IUser | null = null;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }
}
