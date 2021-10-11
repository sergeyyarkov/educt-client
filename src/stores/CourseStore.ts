import { AxiosInstance } from 'axios';
import { ICourse } from 'interfaces';
import { makeAutoObservable, runInAction } from 'mobx';
import { CourseService } from 'services/CourseService';
import RootStore from './RootStore';

export default class CourseStore {
  public root: RootStore;

  public courseService: CourseService;

  public courses: Omit<ICourse, 'teacher' | 'students' | 'lessons'>[] | null = null;

  constructor(root: RootStore, api: AxiosInstance) {
    this.root = root;
    this.courseService = new CourseService(api);
    makeAutoObservable(this);
  }

  public async loadCourses() {
    try {
      const result = await this.courseService.fetchAll();
      console.log(`[${this.constructor.name}]: ${result.message}`, result);

      runInAction(() => {
        this.courses = result.data;
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }
}
