import { UserRoleEnum } from '@educt/enums';
import { MdAccountCircle, MdCollectionsBookmark, MdGroup, MdHome, MdMessage } from 'react-icons/md';
import { IAppConfig } from './interfaces';

const config: IAppConfig = {
  /**
   * Some info about application
   */
  metaData: {
    appName: 'Educt',
    appDescription: 'Learn management system',
  },
  /**
   * Links that are rendered in the navigation
   */
  links: [
    { location: '/', title: 'Main', public: true, icon: MdHome },
    { location: '/courses', title: 'Courses', public: true, icon: MdCollectionsBookmark },
    { location: '/messages', title: 'Messages', public: true, icon: MdMessage },
    { location: '/profile', title: 'Profile', public: true, icon: MdAccountCircle },
    {
      location: '/users',
      title: 'Users',
      public: false,
      roles: [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER],
      icon: MdGroup,
    },
  ],
};

export default config;
