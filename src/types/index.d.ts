import React from 'react';
import { CourseStatusEnum, UserRoleEnum } from '@educt/enums';
import { ICategory } from '@educt/interfaces';
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

export type OptionType = {
  value: string;
  label: string;
};

export type ColorType = {
  id: number;
  name: string;
  hex: string;
};

export type ConfirmEmailContainerDataType = {
  newEmail: string;
  expired_seconds: number;
};

/**
 * Change email page context
 */
export type ConfirmEmailDataType = {
  newEmail: string;
  expired_seconds: number;
};
export type ChangeEmailPageContextType = {
  isCodeSent: boolean;
  setIsCodeSent: React.Dispatch<React.SetStateAction<boolean>>;

  /**
   * Set this data when confirmation code has been sent
   */
  confirmEmailData?: ConfirmEmailDataType;
  setConfirmEmailData: React.Dispatch<React.SetStateAction<ConfirmEmailDataType | undefined>>;
};

export type SearchingRoleStateType = UserRoleEnum | 'any' | undefined;
export type UsersPageContextType = {
  /**
   * Search users by user role
   */
  searchingRole: SearchingRoleStateType;
  setSearchingRole: React.Dispatch<React.SetStateAction<SearchingRoleStateType>>;

  /**
   * Serach user by fullname or email
   */
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;

  /**
   * Search users by page
   */
  searchingPage: number;
  setSearchingPage: React.Dispatch<React.SetStateAction<number>>;
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
  image?: File | undefined;
  status: CourseStatusEnum;
};

export type UpdateCourseParamsType = {
  title?: string | undefined;
  description?: string | undefined;
  teacher_id?: string | undefined;
  category_id?: string | undefined;
  image?: File | undefined;
  status?: CourseStatusEnum | undefined;
};
