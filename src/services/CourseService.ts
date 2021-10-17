import { AxiosInstance } from 'axios';
import { IApiRespose, ICourse } from '@educt/interfaces';
import { FetchCoursesParams } from '@educt/types';
import { CourseStatusEnum } from '@educt/enums';

export class CourseService {
  public api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  /**
   * Fetch all courses
   *
   * @returns Array of courses
   */
  public async fetchAll(
    params?: FetchCoursesParams
  ): Promise<IApiRespose<Omit<ICourse, 'teacher' | 'students' | 'lessons'>[]>> {
    const result = await this.api.get('/v1/courses', {
      params: {
        status: params?.status,
        category_id: params?.category_id,
      },
    });
    return result.data;
  }

  /**
   * Update status of course by id
   *
   * @param id Course id
   * @param status Course status
   * @returns Empty data
   */
  public async setStatus(id: string, status: CourseStatusEnum): Promise<IApiRespose<{}>> {
    const result = await this.api.post(`/v1/courses/${id}/set-status`, {
      status,
    });
    return result.data;
  }

  /**
   * Delete course by id
   *
   * @param id Course id
   * @returns Deleted course
   */
  public async delete(id: string): Promise<IApiRespose<Omit<ICourse, 'teacher' | 'students' | 'lessons'>>> {
    const result = await this.api.delete(`/v1/courses/${id}`);
    return result.data;
  }
}
