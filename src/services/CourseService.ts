import { AxiosInstance } from 'axios';
import { ApiServiceInstance } from '.';
import * as helpers from '@educt/helpers';
import { IApiRespose, ICourse } from '@educt/interfaces';
import { CourseStatusEnum } from '@educt/enums';
import { CreateCourseParamsType, FetchCoursesParams, UpdateCourseParamsType } from '@educt/types';

class CourseService {
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
   * Fetch course by id param
   *
   * @param id Course id
   * @returns Course
   */
  public async fetchById(
    id: string
  ): Promise<IApiRespose<Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'>>> {
    const result = await this.api.get(`/v1/courses/${id}`);
    return result.data;
  }

  /**
   * Update status of course by id
   *
   * @param id Course id
   * @param status Course status
   * @returns Empty data
   */
  public async setStatus(id: string, status: CourseStatusEnum): Promise<IApiRespose<Record<string, never>>> {
    const result = await this.api.post(`/v1/courses/${id}/set-status`, {
      status,
    });
    return result.data;
  }

  /**
   *
   * @param data Data for creating course
   * @returns
   */
  public async create(
    data: CreateCourseParamsType
  ): Promise<IApiRespose<Pick<ICourse, 'id' | 'title' | 'description' | 'status' | 'created_at' | 'updated_at'>>> {
    const result = await this.api.post('/v1/courses', helpers.transformToFormData(data), {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return result.data;
  }

  public async update(
    id: string,
    data: UpdateCourseParamsType
  ): Promise<IApiRespose<Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'>>> {
    const result = await this.api.patch(`/v1/courses/${id}`, helpers.transformToFormData(data), {
      headers: {
        'Content-Type': 'multipart/form-data',
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

  public async attachStudentsList(courseId: string, ids: Array<string>): Promise<IApiRespose<Record<string, never>>> {
    const result = await this.api.post(
      `/v1/courses/${courseId}/attach-student-list`,
      helpers.transformToFormData({ students: ids })
    );
    return result.data;
  }
}

export const CourseServiceInstance = new CourseService(ApiServiceInstance.api);
