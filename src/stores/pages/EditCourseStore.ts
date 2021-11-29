import * as helpers from '@educt/helpers';
import { ICourse, ILesson } from '@educt/interfaces';
import { CourseService } from '@educt/services/CourseService';
import LessonService from '@educt/services/LessonService';
import { AxiosInstance } from 'axios';
import { makeAutoObservable, runInAction } from 'mobx';
import PageStore from '../PageStore';

export default class EditCourseStore {
  public pageStore: PageStore;

  public course: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'> | undefined;

  public deletingLesson: ILesson | undefined;

  private courseService: CourseService;

  constructor(pageStore: PageStore, api: AxiosInstance) {
    this.pageStore = pageStore;
    this.courseService = new CourseService(api);

    makeAutoObservable(this);
  }

  /**
   * Load course by id into store
   *
   * @param id Course id
   * @returns Course response
   */
  public async loadCourseById(id: string) {
    try {
      const result = await this.courseService.fetchById(id);

      runInAction(() => {
        this.course = result.data;
      });

      return result;
    } catch (error: any) {
      throw error;
    }
  }

  /**
   * Remove lesson from store
   *
   * @param id Lesson id
   * @returns Deleted lesson response
   */
  public async deleteLessonById(id: string) {
    try {
      const result = await this.pageStore.root.lessonService.deleteLesson(id);

      runInAction(() => {
        if (this.course) {
          this.course.lessons = this.course.lessons.filter(lesson => lesson.id !== result.data.id);
        }
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Reorder lessons in store list on drag
   *
   * @param oldIndex
   * @param newIndex
   */
  public reorderLessons(oldIndex: number, newIndex: number): void {
    if (this.course) {
      this.course.lessons = helpers.arrayMove(this.course.lessons, oldIndex, newIndex);
    }
  }

  setDeletingLesson(lesson: ILesson) {
    this.deletingLesson = lesson;
  }
}
