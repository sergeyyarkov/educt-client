import AuthStore from './AuthStore';

export default class RootStore {
  public authStore: AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}
