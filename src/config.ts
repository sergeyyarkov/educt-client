import { MdAccountCircle, MdBuild, MdCollectionsBookmark, MdHome, MdMessage } from 'react-icons/md';
import { IAppConfig } from './interfaces';

const config: IAppConfig = {
  metaData: {
    appName: 'Educt',
    appDescription: 'Learn management system',
  },
  links: [
    { location: '/', title: 'Home', public: true, icon: MdHome },
    { location: '/courses', title: 'Courses', public: true, icon: MdCollectionsBookmark },
    { location: '/messages', title: 'Messages', public: true, icon: MdMessage },
    { location: '/profile', title: 'Profile', public: true, icon: MdAccountCircle },
    { location: '/control', title: 'Control', public: false, icon: MdBuild },
  ],
};

export default config;
