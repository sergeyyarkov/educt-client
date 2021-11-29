import apiConfig from '@educt/api.config';
import { makeAutoObservable } from 'mobx';

/**
 * Services
 */
import ApiService from '@educt/services/ApiService';

/**
 * Stores
 */
import AuthStore from './AuthStore';
import UserStore from './UserStore';
import UIStore from './UIStore';
import CategoryStore from './CategoryStore';
import CourseStore from './CourseStore';
import LessonService from '@educt/services/LessonService';
import PageStore from './PageStore';

export default class RootStore {
  public pageStore: PageStore;

  public courseStore: CourseStore;

  public categoryStore: CategoryStore;

  public uiStore: UIStore;

  public authStore: AuthStore;

  public userStore: UserStore;

  public apiService: ApiService;

  public lessonService: LessonService;

  constructor() {
    /**
     * Services
     */
    // TODO add other services
    this.apiService = new ApiService(this, apiConfig);
    this.lessonService = new LessonService(this.apiService.api);

    /**
     * Stores
     */
    this.pageStore = new PageStore(this, this.apiService.api);
    this.courseStore = new CourseStore(this, this.apiService.api);
    this.categoryStore = new CategoryStore(this, this.apiService.api);
    this.uiStore = new UIStore(this);
    this.authStore = new AuthStore(this, this.apiService.api);
    this.userStore = new UserStore(this, this.apiService.api);

    makeAutoObservable(this);
  }
}
