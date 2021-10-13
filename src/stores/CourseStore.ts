import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Types
 */
import { FetchCoursesParams } from 'types';
import { ICourse } from 'interfaces';

/**
 * Services
 */
import { CourseService } from 'services/CourseService';

/**
 * Stores
 */
import RootStore from './RootStore';

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
      console.log(`[${this.constructor.name}]: ${result.message}`, result);

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
      console.log(`[${this.constructor.name}]: ${result.message}`, result);

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
}
