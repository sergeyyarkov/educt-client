import { UserRoleEnum } from 'enums';
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

export type ProfilePageStatusType = {
  status: 'update-password' | 'update-email' | 'confirm-email' | 'default';
  data?: {
    /**
     * The field that is set when trying to change the mail address through form
     */
    confirmEmailData?: ConfirmEmailContainerDataType;
  };
};

export type ProfilePageViewStatusContextType = {
  statusPageView: ProfilePageStatusType['status'];
  setStatusPageView: React.Dispatch<React.SetStateAction<ProfilePageStatusType>>;
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
};
