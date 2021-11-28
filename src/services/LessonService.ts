import { IApiRespose } from '@educt/interfaces';
import { AxiosInstance } from 'axios';

export default class LessonService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Save order of lessons
   *
   * @param ids Ordered ids of lessons
   * @returns Empty data
   */
  public async saveOrder(ids: string[]): Promise<IApiRespose<any>> {
    const result = await this.api.post('/v1/lessons/save-order', {
      ids,
    });
    return result.data;
  }
}
