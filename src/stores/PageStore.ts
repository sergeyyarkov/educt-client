import { makeAutoObservable } from 'mobx';
import CoursesStore from './pages/CoursesStore';
import RootStore from './RootStore';

export default class PageStore {
  public root: RootStore;

  public coursesStore: CoursesStore;

  constructor(root: RootStore) {
    this.root = root;

    /**
     * Pages
     */
    this.coursesStore = new CoursesStore(this);

    makeAutoObservable(this);
  }
}
