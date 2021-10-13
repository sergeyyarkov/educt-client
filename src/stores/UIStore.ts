import { makeAutoObservable, observable } from 'mobx';
import { createBrowserHistory } from 'history';

/**
 * Types
 */
import { IWindowDimensions } from 'interfaces';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class UIStore {
  public root: RootStore;

  public location: string = document.location.pathname;

  public history: ReturnType<typeof createBrowserHistory>;

  public windowDimensions: IWindowDimensions = { width: window.innerWidth, height: window.innerHeight };

  constructor(root: RootStore) {
    this.root = root;
    this.history = createBrowserHistory();

    makeAutoObservable(this, {
      windowDimensions: observable.struct,
    });

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
      console.log(`[history]: pathname changed to "${pathname}"`);
      this.location = pathname;
    });

    /**
     * Window dimensions updated
     */
    window.onresize = () => this.updateWindowDimensions();
  }

  public setLocation(location: string): void {
    this.location = location;
  }

  private updateWindowDimensions(): void {
    this.windowDimensions = { width: window.innerWidth, height: window.innerHeight };
  }

  get isDesktop() {
    return this.windowDimensions.width > 991;
  }

  get isTablet() {
    return this.windowDimensions.width < 991;
  }

  get isMobile() {
    return this.windowDimensions.width < 568;
  }
}
