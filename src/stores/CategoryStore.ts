import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Types
 */
import { ICategory } from '@educt/interfaces';

/**
 * Services
 */
import { CategoryServiceInstance } from '@educt/services';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class CategoryStore {
  public root: RootStore;

  public categories: ICategory[] | null = null;

  public isLoading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  public setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  public async loadCategories() {
    try {
      this.setLoading(true);
      const result = await CategoryServiceInstance.fetchAll();

      runInAction(() => {
        this.categories = result.data;
      });

      return result;
    } finally {
      this.setLoading(false);
    }
  }
}
