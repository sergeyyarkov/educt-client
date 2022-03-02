import { makeAutoObservable } from 'mobx';

/**
 * Stores
 */
import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';
import CategoryStore from './CategoryStore';
import CourseStore from './CourseStore';
import PageStore from './PageStore';
import OnlineStore from './OnlineStore';

export default class RootStore {
  public pageStore: PageStore;

  public courseStore: CourseStore;

  public categoryStore: CategoryStore;

  public uiStore: UIStore;

  public authStore: AuthStore;

  public userStore: UserStore;

  public onlineStore: OnlineStore;

  constructor() {
    /**
     * Stores
     */
    this.authStore = new AuthStore(this);
    this.categoryStore = new CategoryStore(this);
    this.courseStore = new CourseStore(this);
    this.pageStore = new PageStore(this);
    this.uiStore = new UIStore(this);
    this.userStore = new UserStore(this);
    this.onlineStore = new OnlineStore(this);

    makeAutoObservable(this);
  }
}
