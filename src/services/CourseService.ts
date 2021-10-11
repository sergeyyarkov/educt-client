import { AxiosInstance } from 'axios';
import { IApiRespose, ICourse } from 'interfaces';

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
  public async fetchAll(): Promise<IApiRespose<Omit<ICourse, 'teacher' | 'students' | 'lessons'>[]>> {
    const result = await this.api.get('/v1/courses');
    return result.data;
  }
}
