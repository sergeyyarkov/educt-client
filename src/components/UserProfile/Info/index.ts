import { IUser } from '@educt/interfaces';
import { Info } from './Info';
import { Heading } from './Heading';
import { Details } from './Details';
import { About } from './About';

export interface IHeadingProps {
  fullname: string;
  roles: IUser['roles'];
}

export interface IDetailsProps {
  registered: string;
  lastLogin: IUser['last_login'];
}

export interface IAboutProps {
  about: IUser['about'];
}

export { Info, Heading, Details, About };
