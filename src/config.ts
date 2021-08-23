import { MdAccountCircle, MdCollectionsBookmark, MdHome, MdMessage } from 'react-icons/md';
import { IAppConfig } from './interfaces';

const config: IAppConfig = {
  links: [
    { location: '/', title: 'Home', icon: MdHome },
    { location: '/courses', title: 'Courses', icon: MdCollectionsBookmark },
    { location: '/messages', title: 'Messages', icon: MdMessage },
    { location: '/profile', title: 'Profile', icon: MdAccountCircle },
  ],
};

export default config;
