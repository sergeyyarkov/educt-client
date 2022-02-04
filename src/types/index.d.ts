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

export type LessonProgress = {
  progress: {
    is_watched: boolean;
  } | null;
};

export type StatInfoType = {
  courses_count: string;
  lessons_count: string;
  online: number;
};

export type LessonVideoType = {
  id: number;
  client_name: string;
  ext: string;
  name: string;
  size: number;
  url: string;
  created_at: '2022-01-02T21:39:08.481+03:00';
  updated_at: string;
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
  status?: CourseStatusEnum;
  category_id?: string;
  limit?: number;
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

export type UpdateUserContactsParamsType = {
  phone_number?: string | null | undefined;
  twitter_id?: string | null | undefined;
  telegram_id?: string | null | undefined;
  vk_id?: string | null | undefined;
};

export type UpdateUserInfoParamsType = {
  about?: string | null | undefined;
} & UpdateUserContactsParamsType;

export type CreateCourseParamsType = {
  title: string;
  description: string;
  education_description: string | null;
  teacher_id: string;
  category_id: string;
  image?: File | undefined;
  status: CourseStatusEnum;
};

export type UpdateCourseParamsType = {
  title?: string | undefined;
  description?: string | undefined;
  education_description?: string | null | undefined;
  teacher_id?: string | undefined;
  category_id?: string | undefined;
  image?: File | undefined;
  status?: CourseStatusEnum | undefined;
};

export type CreateLessonParamsType = {
  title: string;
  description: string;
  duration: string;
  course_id: string;
  video: File;
  materials?: File[] | undefined;
};

export type UpdateLessonParamsType = {
  title?: string | undefined;
  description?: string | undefined;
  duration?: string | undefined;
  course_id?: string | undefined;
  video?: File | undefined;
  materials?: File[] | undefined | null;
};

export type CreateCategoryParamsType = {
  title: string;
  description?: string | undefined;
};

export type UpdateCategoryParamsType = {
  title?: string | undefined;
  description?: string | null | undefined;
};
