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
  lastLogin: string;
}

export interface IAboutProps {
  about: string;
}

export { Info, Heading, Details, About };
