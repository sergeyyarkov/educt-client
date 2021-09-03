import { IconType } from 'react-icons/lib';

export type LinkType = {
  location: string;
  title: string;
  public: boolean;
  icon: IconType;
};

export type ProfilePageStatusType = 'update-password' | 'update-email' | undefined;
export type ProfilePageViewStatusContextType = {
  statusPageView: ProfilePageStatusType;
  setStatusPageView: React.Dispatch<React.SetStateAction<ProfilePageStatusType>>;
};
