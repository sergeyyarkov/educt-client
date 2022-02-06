import { makeAutoObservable } from 'mobx';
import RootStore from './RootStore';

export default class OnlineStore {
  public root: RootStore;

  public online: Set<string>;

  constructor(root: RootStore) {
    this.root = root;
    this.online = new Set();

    makeAutoObservable(this);
  }

  public loadOnline(online: string[]) {
    this.online = new Set(online);
  }

  public isOnline(id: string) {
    return this.online.has(id);
  }

  public get count() {
    return this.online.size;
  }
}
