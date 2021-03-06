import { makeAutoObservable, runInAction } from 'mobx';

/**
 * Types
 */
import { FetchCoursesParams } from '@educt/types';
import { ICourse } from '@educt/interfaces';
import { CourseStatusEnum } from '@educt/enums';

/**
 * Services
 */
import { CourseServiceInstance } from '@educt/services';

/**
 * Stores
 */
import RootStore from './RootStore';

export default class CourseStore {
  public root: RootStore;

  public courses: Omit<ICourse, 'teacher' | 'students' | 'lessons'>[] | null = null;

  public isLoading = false;

  constructor(root: RootStore) {
    this.root = root;
    makeAutoObservable(this);
  }

  public setLoading(loading: boolean) {
    this.isLoading = loading;
  }

  public async loadCourses(params?: FetchCoursesParams) {
    try {
      this.setLoading(true);
      const result = await CourseServiceInstance.fetchAll(params);

      /**
       * Load courses in store
       */
      runInAction(() => {
        this.courses = result.data;
      });

      return result;
    } finally {
      this.setLoading(false);
    }
  }

  public async deleteCourse(id: string) {
    const result = await CourseServiceInstance.delete(id);

    /**
     * Remove deleted course form store
     */
    runInAction(() => {
      if (this.courses !== null) {
        this.courses = this.courses.filter(course => course.id !== id);
      }
    });

    return result;
  }

  public async setCourseStatus(id: string, status: CourseStatusEnum) {
    const course = this.courses?.find(course => course.id === id);

    /**
     * Save previous course status before sending request
     */
    const { status: prevCourseStatus } = course ?? {};

    try {
      /**
       * Update status in store
       */
      runInAction(() => {
        if (this.courses !== null && course !== undefined) {
          course.status = status;
        }
      });

      /**
       * Make request on update course status
       */
      const result = await CourseServiceInstance.setStatus(id, status);
      return result;
    } catch (error) {
      /**
       * Resume status if there was an error on request
       */
      runInAction(() => {
        if (this.courses !== null && course !== undefined && prevCourseStatus !== undefined) {
          course.status = prevCourseStatus;
        }
      });
      throw error;
    }
  }
}
