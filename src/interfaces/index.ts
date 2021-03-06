import type { RouteComponentProps } from 'react-router-dom';
import {
  AttachmentFileType,
  ColorType,
  LessonProgress,
  LessonVideoType,
  LinkType,
  NotificationType,
} from '@educt/types';
import { CourseStatusEnum, UserRoleEnum } from '../enums';

export interface IAppConfig {
  metaData: {
    appName: string;
    appDescription: string;
    appVersion: string;
    appGithubLink: string;
  };
  links: LinkType[];
}

export interface IToken {
  userId: string;
  token: string;
  type: string;
  expires_at: string;
}

export interface ICourse {
  id: string;
  image: AttachmentFileType | null;
  title: string;
  description: string;
  education_description: string | null;
  status: CourseStatusEnum;
  teacher: Pick<IUser, 'id' | 'first_name' | 'fullname' | 'last_name' | 'email' | 'created_at' | 'updated_at'>;
  category: ICategory;
  lessons: Omit<ILesson, 'materials' | 'content' | 'progress'>[];
  students: IUser[];
  color: ColorType | null;
  students_count: string;
  likes_count: string;
  lessons_count: string;
  created_at: string;
  updated_at: string;
}

export interface ILesson {
  id: string;
  course_id: string;
  title: string;
  description: string;
  duration: string;
  color?: ColorType | undefined | null;
  materials_count?: string | undefined;
  materials: Array<ILessonMaterial>;
  progress: LessonProgress;
  content: ILessonContent;
  video?: LessonVideoType | undefined | null;
  linked_video_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface ILessonMaterial {
  id: number;
  lesson_id: string;
  name: string;
  client_name: string;
  size: number;
  ext: string;
  created_at: string;
  updated_at: string;
}

export interface ILessonContent {
  id: number;
  lesson_id: string;
  body: string;
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
  color?: ColorType | undefined | null;
  created_at: string;
  updated_at: string;
}

/**
 * Pagination meta data that returns from server
 */
export interface IPaginationMeta {
  current_page: number;
  first_page: number;
  first_page_url: string;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  per_page: number;
  previous_page_url: string | null;
  total: number;
}

/**
 * User with available course
 */
export type UserCourseType = Pick<
  ICourse,
  | 'id'
  | 'title'
  | 'description'
  | 'category'
  | 'students_count'
  | 'likes_count'
  | 'lessons_count'
  | 'created_at'
  | 'updated_at'
>;

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  fullname: string;
  about: string | null;
  last_login: string | null;
  email: string;
  roles: IUserRole[];
  contacts: IUserContacts | null;
  created_at: string;
  updated_at: string;
}

/**
 * Current authenticated user data
 */
export interface IMe extends IUser {
  /**
   * The field can be undefined if the user
   * does not have the STUDENT role
   */
  courses?: UserCourseType[];
  likes: Array<Pick<ICourse, 'id'>>;
  notifications: Array<NotificationType>;
}

export interface IUserContacts {
  phone_number: string | null;
  twitter_id: string | null;
  telegram_id: string | null;
  vk_id: string | null;
}

export interface IUserInfo extends IUserContacts {
  about: string | null;
}

export interface IUserRole {
  id: number;
  name: string;
  slug: UserRoleEnum;
}

export interface IApiRespose<T> {
  data: T;
  meta?: {
    /**
     * The server can return the pagination meta data
     */
    pagination?: IPaginationMeta;
  };
  message: string;
  status: number;
}

export interface IPageProps extends RouteComponentProps {
  title: string;
}
