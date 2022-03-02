import { AxiosInstance } from 'axios';
import { IApiRespose, ICategory } from '@educt/interfaces';
import { ApiServiceInstance } from '.';
import { CreateCategoryParamsType, UpdateCategoryParamsType } from '@educt/types';

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

  /**
   * Create category
   *
   * @returns Created category
   */
  public async create(data: CreateCategoryParamsType): Promise<IApiRespose<ICategory>> {
    const result = await this.api.post('/v1/categories', data);
    return result.data;
  }

  /**
   * Delete category by id
   *
   * @param id Category id
   * @returns Deleted category
   */
  public async delete(id: string): Promise<IApiRespose<ICategory>> {
    const result = await this.api.delete(`/v1/categories/${id}`);
    return result.data;
  }

  /**
   * Update category by id
   *
   * @param id Category id
   * @param data Field to update
   * @returns Updated category
   */
  public async update(id: string, data: UpdateCategoryParamsType): Promise<IApiRespose<ICategory>> {
    const reuslt = await this.api.patch(`/v1/categories/${id}`, data);
    return reuslt.data;
  }
}

export const CategoryServiceInstance = new CategoryService(ApiServiceInstance.api);
