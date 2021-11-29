import { IApiRespose, ILesson } from '@educt/interfaces';
import { AxiosInstance } from 'axios';

export default class LessonService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Delete lesson by id
   *
   * @param id Lesson id
   * @returns Deleted lesson
   */
  public async deleteLesson(id: string): Promise<IApiRespose<ILesson>> {
    const result = await this.api.delete(`/v1/lessons/${id}`);
    return result.data;
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
