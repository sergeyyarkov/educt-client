import { AxiosInstance } from 'axios';
import { ICategory } from 'interfaces';
import { makeAutoObservable, runInAction } from 'mobx';
import CategoryService from 'services/CategoryService';
import RootStore from './RootStore';

export default class CategoryStore {
  public root: RootStore;

  public categoryService: CategoryService;

  public categories: ICategory[] | null = null;

  public isLoading: boolean = false;

  constructor(root: RootStore, api: AxiosInstance) {
    this.root = root;
    this.categoryService = new CategoryService(api);
    makeAutoObservable(this);
  }

  public setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  public async loadCategories() {
    try {
      this.setLoading(true);
      const result = await this.categoryService.fetchAll();
      console.log(`[${this.constructor.name}]: ${result.message}`, result);

      runInAction(() => {
        this.categories = result.data;
      });

      return result;
    } catch (error: any) {
      throw error;
    } finally {
      this.setLoading(false);
    }
  }
}
