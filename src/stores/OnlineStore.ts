import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

type UserType = {
  userId: string;
  userName: string;
};

export default class OnlineStore {
  public root: RootStore;

  public online: Map<string, UserType> | null = null;

  constructor(root: RootStore) {
    this.root = root;

    makeAutoObservable(this);
  }

  public loadOnline(online: [string, UserType][]) {
    this.online = new Map(online);
  }

  public isOnline(id: string) {
    return this.online && this.online.has(id);
  }

  public getUser(id: string) {
    return this.online && this.online.get(id);
  }

  public get count() {
    return this.online && this.online.size;
  }

  public get users() {
    return this.online && Array.from(this.online).map(entry => entry[1]);
  }
}
