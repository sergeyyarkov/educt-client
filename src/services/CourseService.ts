import { AxiosInstance } from 'axios';
import { IApiRespose, ICourse } from 'interfaces';
import { FetchCoursesParams } from 'types';

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
