import { AxiosInstance } from 'axios';
import { ICourse } from 'interfaces';
import { makeAutoObservable, runInAction } from 'mobx';
import { CourseService, FetchCoursesParams } from 'services/CourseService';
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
}
