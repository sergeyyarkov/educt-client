import { AxiosInstance } from 'axios';
import { CourseStatusEnum } from 'enums';
import { IApiRespose, ICourse } from 'interfaces';

export type FetchCoursesParams = {
  /**
   * Get courses by status
   */
  status?: CourseStatusEnum;

  /**
   * Get courses with category by id
   */
  category_id?: string;
};

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
}
