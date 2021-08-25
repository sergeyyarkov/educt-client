import { makeAutoObservable } from 'mobx';
import { createBrowserHistory } from 'history';
import RootStore from './RootStore';

export default class UIStore {
  public root: RootStore;

  public location: string = document.location.pathname;

  public history: ReturnType<typeof createBrowserHistory>;

  constructor(root: RootStore) {
    this.root = root;
    this.history = createBrowserHistory();
    makeAutoObservable(this);

    this.history.listen(({ pathname }) => {
      console.log('path chaged');

      this.location = pathname;
    });
  }

  public setLocation(location: string) {
    this.location = location;
  }
}
