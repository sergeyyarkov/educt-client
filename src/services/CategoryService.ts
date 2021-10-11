import { AxiosInstance } from 'axios';
import { IApiRespose, ICategory } from 'interfaces';

export default class CategoryService {
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
