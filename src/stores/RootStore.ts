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

export default class RootStore {
  public courseStore: CourseStore;

  public categoryStore: CategoryStore;

  public uiStore: UIStore;

  public authStore: AuthStore;

  public userStore: UserStore;

  public apiService: ApiService;

  constructor() {
    /**
     * Api service
     */
    this.apiService = new ApiService(this, apiConfig);

    /**
     * Stores
     */
    this.courseStore = new CourseStore(this, this.apiService.api);
    this.categoryStore = new CategoryStore(this, this.apiService.api);
    this.uiStore = new UIStore(this);
    this.authStore = new AuthStore(this, this.apiService.api);
    this.userStore = new UserStore(this, this.apiService.api);

    makeAutoObservable(this);
  }
}
