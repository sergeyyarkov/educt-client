import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Types
 */
import { FetchCoursesParams } from '@educt/types';
import { ICourse } from '@educt/interfaces';

/**
 * Services
 */
import { CourseService } from '@educt/services/CourseService';

/**
 * Stores
 */
import RootStore from './RootStore';
import { CourseStatusEnum } from '@educt/enums';

export default class CourseStore {
  public root: RootStore;

  public courseService: CourseService;

  public courses: Omit<ICourse, 'teacher' | 'students' | 'lessons'>[] | null = null;

  public isLoading: boolean = false;

  constructor(root: RootStore, api: AxiosInstance) {
    this.root = root;
    this.courseService = new CourseService(api);
    makeAutoObservable(this);
  }

  public setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  public async loadCourses(params?: FetchCoursesParams) {
    try {
      this.setLoading(true);
      const result = await this.courseService.fetchAll(params);

      /**
       * Load courses in store
       */
      runInAction(() => {
        this.courses = result.data;
      });

      return result;
    } catch (error: any) {
      throw error;
    } finally {
      this.setLoading(false);
    }
  }

  public async deleteCourse(id: string) {
    try {
      const result = await this.courseService.delete(id);

      /**
       * Remove deleted course form store
       */
      runInAction(() => {
        if (this.courses !== null) {
          this.courses = this.courses.filter(course => course.id !== id);
        }
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  public async setCourseStatus(id: string, status: CourseStatusEnum) {
    try {
      const result = await this.courseService.setStatus(id, status);

      /**
       * Update status in store
       */
      runInAction(() => {
        if (this.courses !== null) {
          const courseIndex = this.courses.findIndex(course => course.id === id);

          if (courseIndex !== -1) {
            this.courses[courseIndex].status = status;
          }
        }
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }
}
