import { makeAutoObservable } from 'mobx';
import { CourseStatusEnum } from '@educt/enums';
import PageStore from '../PageStore';

/**
 * Types
 */
import type { ICategory } from '@educt/interfaces';

export default class CoursesStore {
  public pageStore: PageStore;

  public selectedCategory: ICategory | null = null;

  public showedStatus: CourseStatusEnum | undefined;

  constructor(pageStore: PageStore) {
    this.pageStore = pageStore;

    makeAutoObservable(this);
  }

  public setSelectedCategory(category: ICategory | null): void {
    this.selectedCategory = category;
  }

  public setShowedStatus(newStatus: CourseStatusEnum | undefined): void {
    this.showedStatus = newStatus;
  }
}
