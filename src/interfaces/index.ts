import type { RouteProps } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';
import { LinkType } from 'types';
import { UserRoleEnum } from '../enums';

export interface IAppConfig {
  metaData: {
    appName: string;
    appDescription: string;
  };
  links: LinkType[];
}

export interface ICourse {
  id: string;
  title: string;
  description: string;
  teacher: Pick<IUser, 'id' | 'first_name' | 'last_name' | 'email'>;
  category: ICategory;
  lessons: ILesson[];
  students: Pick<IUser, 'id' | 'first_name' | 'last_name' | 'email'>;
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
}

export interface ICategory {
  id: string;
  title: string;
  description: string;
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
  fullname: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: IUserRole[];
  contacts: IUserContacts | null;
  courses: UserCourseType[];
}

export interface IUserContacts {
  phone_number: string | null;
  twitter_id: string | null;
  telegram_id: string | null;
  vk_id: string | null;
}

export interface IUserRole {
  id: number;
  name: string;
  slug: UserRoleEnum;
}

export interface IDataResult {
  data: any;
  message: string;
  status: number;
}

export interface ILoginResult extends IDataResult {
  data: {
    token: string;
    type: string;
    expires_at: string;
  };
}

export interface IUpdatedContactsResult extends IDataResult {
  data: IUserContacts;
}

export interface IUpdatedUserEmail extends IDataResult {
  data: {
    email: IUser['email'];
  };
}

export interface ISentCodeResult extends IDataResult {
  data: {
    expired_seconds: number;
  };
}

export interface IUserResult extends IDataResult {
  data: Omit<IUser, 'fullname'>;
}

export interface IPageProps extends RouteComponentProps {
  title?: string;
  roles?: UserRoleEnum[];
}

export interface IPrivateRouteProps extends RouteProps {
  component: React.FC<IPageProps>;
  title?: string;
  roles?: UserRoleEnum[];
}

export interface IPublicRouteProps extends RouteProps {
  component: React.FC<IPageProps>;
  title?: string;
}

export interface IWindowDimensions {
  width: number;
  height: number;
}
