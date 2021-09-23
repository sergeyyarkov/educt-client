import { UserRoleEnum } from 'enums';
import { IUser } from 'interfaces';
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

export type ConfirmEmailContainerDataType = {
  newEmail: string;
  expired_seconds: number;
};

export type ProfilePageStatusType = 'update-password' | 'update-email' | 'confirm-email' | 'default';
export type ProfilePageDataType = {
  /**
   * The field that is set when trying to change the mail address through form
   */
  confirmEmailData?: ConfirmEmailContainerDataType;
};
export type ProfilePageViewStatusContextType = {
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
   * Set deliting user state when press on delete button
   */
  deletingUser: IUser | undefined;
  setDeletingUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
};
