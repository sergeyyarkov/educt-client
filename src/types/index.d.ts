import { IconType } from 'react-icons/lib';

export type LinkType = {
  location: string;
  title: string;
  public: boolean;
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
