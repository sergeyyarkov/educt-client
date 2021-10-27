import { CourseStatusEnum, UserRoleEnum } from '@educt/enums';
import { ICategory, ICourse, IUser } from '@educt/interfaces';
import React from 'react';
import { IconType } from 'react-icons/lib';

export type LinkType = {
  location: string;
  title: string;
  public: boolean;
  /**
   * Render link if user roles includes roles
   * in config
   */
  roles?: UserRoleEnum[];
  icon: IconType;
};

export type AttachmentFileType = {
  url?: string;
  size: number;
  name: string;
  mimeType: string;
  extname: string;
};

export type ConfirmEmailContainerDataType = {
  newEmail: string;
  expired_seconds: number;
};

export type OptionType = {
  value: string;
  label: string;
};

export type ProfilePageStatusType = 'update-password' | 'update-email' | 'confirm-email' | 'default';
export type ProfilePageDataType = {
  /**
   * The field that is set when trying to change the mail address through form
   */
  confirmEmailData?: ConfirmEmailContainerDataType;
};
export type ProfilePageContextType = {
  /**
   * Render current container by status
   */
  statusPageView: ProfilePageStatusType;
  setStatusPageView: React.Dispatch<React.SetStateAction<ProfilePageStatusType>>;

  /**
   * Some data for other components
   */
  pageData: ProfilePageDataType;
  setPageData: React.Dispatch<React.SetStateAction<ProfilePageDataType>>;
};

export type SearchingRoleStateType = UserRoleEnum | 'any' | undefined;
export type UsersPageContextType = {
  /**
   * Search users by user role
   */
  searchingRole: SearchingRoleStateType;
  setSearchingRole: React.Dispatch<React.SetStateAction<SearchingRoleStateType>>;

  /**
   * Set loading state while loading users
   */
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Serach user by fullname or email
   */
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;

  /**
   * Set editing user state when press on edit button
   */
  editingUser: IUser | undefined;
  setEditingUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;

  /**
   * Set deleting user state when press on delete button
   */
  deletingUser: IUser | undefined;
  setDeletingUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
};

export type CoursesPageContextType = {
  /**
   * Filter courses by caterory
   */
  selectedCategory: ICategory | undefined;
  setSelectedCategory: React.Dispatch<React.SetStateAction<ICategory | undefined>>;

  /**
   * Filter courses by status
   */
  courseStatus: CourseStatusEnum | undefined;
  setCourseStatus: React.Dispatch<React.SetStateAction<CourseStatusEnum | undefined>>;

  /**
   * Set deleting course state when press on delete button
   */
  deletingCourse: Pick<ICourse, 'id' | 'title'> | undefined;
  setDeletingCourse: React.Dispatch<React.SetStateAction<Pick<ICourse, 'id' | 'title'> | undefined>>;
};
export type FetchCoursesParams = {
  /**
   * Get courses by status
   */
  status?: CourseStatusEnum;

  /**
   * Get courses with category by id
   */
  category_id?: string;
};
export type FetchUsersParamsType = {
  page?: number;
  limit?: number;
  role?: UserRoleEnum | 'any';
  search?: string;
};
export type CreateUserParamsType = {
  first_name: string;
  last_name: string;
  login: string;
  email: string;
  role: UserRoleEnum;
  password: string;
};
export type UpdateUserParamsType = { first_name?: string; last_name?: string; email?: string };

export type CreateCourseParamsType = {
  title: string;
  description: string;
  teacher_id: string;
  category_id: string;
  image: File | undefined;
  status: CourseStatusEnum;
};
