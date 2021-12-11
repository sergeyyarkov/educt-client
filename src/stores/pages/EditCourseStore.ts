import { makeAutoObservable, runInAction } from 'mobx';
import * as helpers from '@educt/helpers';
import { ICourse } from '@educt/interfaces';
import PageStore from '../PageStore';

import { CourseServiceInstance, LessonServiceInstance } from '@educt/services';

export default class EditCourseStore {
  public pageStore: PageStore;

  public course: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'> | null = null;

  constructor(pageStore: PageStore) {
    this.pageStore = pageStore;

    makeAutoObservable(this);
  }

  /**
   * Load course by id into store
   *
   * @param id Course id
   * @returns Course response
   */
  public async loadCourseById(id: string) {
    const result = await CourseServiceInstance.fetchById(id);

    runInAction(() => {
      this.course = result.data;
    });

    return result;
  }

  /**
   * Remove lesson from store
   *
   * @param id Lesson id
   * @returns Deleted lesson response
   */
  public async deleteLessonById(id: string) {
    const result = await LessonServiceInstance.deleteLesson(id);

    runInAction(() => {
      if (this.course) {
        this.course.lessons = this.course.lessons.filter(lesson => lesson.id !== result.data.id);
      }
    });

    return result;
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
}
