import { AxiosInstance } from 'axios';
import { IApiRespose, ICategory } from '@educt/interfaces';
import { ApiServiceInstance } from '.';

class CategoryService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Feach all categories
   *
   * @returns Array of categories
   */
  public async fetchAll(): Promise<IApiRespose<ICategory[]>> {
    const result = await this.api.get('/v1/categories');
    return result.data;
  }
}

export const CategoryServiceInstance = new CategoryService(ApiServiceInstance.api);
