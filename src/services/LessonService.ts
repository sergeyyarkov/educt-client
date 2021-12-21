import { AxiosInstance } from 'axios';
import { IApiRespose, ILesson } from '@educt/interfaces';
import { ApiServiceInstance } from './ApiService';

class LessonService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Get lesson by id
   *
   * @param id Lesson id
   * @returns Lesson
   */
  public async fetchLessonById(id: string): Promise<IApiRespose<ILesson>> {
    const result = await this.api.get(`/v1/lessons/${id}`);
    return result.data;
  }

  /**
   * Download material file by file name
   *
   * @param fileName File name
   * @returns Blob
   */
  public async fetchMaterial(fileName: string): Promise<Blob> {
    const result = await this.api.get(`/v1/lessons/materials/${fileName}`, { responseType: 'blob' });
    return result.data;
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

export const LessonServiceInstance = new LessonService(ApiServiceInstance.api);
