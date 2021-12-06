import { UserRoleEnum } from '@educt/enums';
import {
  MdOutlineHome,
  MdOutlineMessage,
  MdOutlineCollectionsBookmark,
  MdOutlineVideoLibrary,
  MdOutlineGroup,
  MdOutlineAccountCircle,
} from 'react-icons/md';
import { IAppConfig } from './interfaces';
import packageJson from '../package.json';

const config: IAppConfig = {
  /**
   * Some info about application
   */
  metaData: {
    appName: 'Educt',
    appDescription: 'Learning management system',
    appVersion: packageJson.version,
    appGithubLink: 'https://github.com/sergeyyarkov/educt-client',
  },
  /**
   * Links that are rendered in the navigation
   */
  links: [
    { location: '/', title: 'Main', public: true, icon: MdOutlineHome },
    { location: '/courses', title: 'Courses', public: true, icon: MdOutlineCollectionsBookmark },
    {
      location: '/lessons',
      title: 'Lessons',
      public: false,
      icon: MdOutlineVideoLibrary,
      roles: [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER],
    },
    { location: '/messages', title: 'Messages', public: true, icon: MdOutlineMessage },
    { location: '/profile', title: 'Profile', public: true, icon: MdOutlineAccountCircle },
    {
      location: '/users',
      title: 'Users',
      public: false,
      roles: [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER],
      icon: MdOutlineGroup,
    },
  ],
};

export default config;
