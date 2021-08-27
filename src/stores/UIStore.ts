import { makeAutoObservable, observable } from 'mobx';
import { createBrowserHistory } from 'history';
import RootStore from './RootStore';
import { IWindowDimensions } from 'interfaces';

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

    this.history.listen(({ pathname }) => {
      console.log(`[history]: pathname changed to "${pathname}"`);
      this.location = pathname;
    });

    window.onresize = () => {
      this.windowDimensions = this.getWindowDimensions();
    };
  }

  public setLocation(location: string): void {
    this.location = location;
  }

  private getWindowDimensions(): IWindowDimensions {
    return { width: window.innerWidth, height: window.innerHeight };
  }

  get isDesktop() {
    return this.windowDimensions.width > 768;
  }

  get isTablet() {
    return this.windowDimensions.width < 768;
  }

  get isMobile() {
    return this.windowDimensions.width < 568;
  }
}
