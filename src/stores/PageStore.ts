import { makeAutoObservable } from 'mobx';
import EditCourseStore from './pages/EditCourseStore';
import RootStore from './RootStore';

export default class PageStore {
  public root: RootStore;

  public editCourseStore: EditCourseStore;

  constructor(root: RootStore) {
    this.root = root;

    /**
     * Pages
     */
    this.editCourseStore = new EditCourseStore(this);

    makeAutoObservable(this);
  }
}
