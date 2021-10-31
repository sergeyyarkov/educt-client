import { makeAutoObservable } from 'mobx';
import { createBrowserHistory } from 'history';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class UIStore {
  public root: RootStore;

  public location: string = document.location.pathname;

  public history: ReturnType<typeof createBrowserHistory>;

  constructor(root: RootStore) {
    this.root = root;
    this.history = createBrowserHistory();

    makeAutoObservable(this);

    this.setupListeners();
  }

  /**
   * Initialize some listeners
   */
  private setupListeners(): void {
    /**
     * Pathname changed
     */
    this.history.listen(({ pathname }) => {
      this.setLocation(pathname);
    });
  }

  public setLocation(location: string): void {
    console.log(`[history]: location changed to "${location}"`);
    this.location = location;
  }
}
