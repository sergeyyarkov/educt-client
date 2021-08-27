import { IconType } from 'react-icons/lib';
import type { RouteProps } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';
import { UserRoleEnum } from '../enums';

export type LinkType = {
  location: string;
  title: string;
  public: boolean;
  icon: IconType;
};

export interface IAppConfig {
  metaData: {
    appName: string;
    appDescription: string;
  };
  links: LinkType[];
}

export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  roles: IUserRole[];
}

export interface IUserRole {
  id: number;
  name: string;
  slug: UserRoleEnum;
}

export interface IDataResult {
  data: any;
  message: string;
  status: number;
}

export interface ILoginResult extends IDataResult {
  data: {
    token: string;
    type: string;
    expires_at: string;
  };
}

export interface IUserResult extends IDataResult {
  data: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    roles: IUserRole[];
  };
}

export interface IPageProps extends RouteComponentProps {
  title?: string;
  roles?: UserRoleEnum[];
}

export interface IPrivateRouteProps extends RouteProps {
  component: React.FC<IPageProps>;
  title?: string;
  roles?: UserRoleEnum[];
}

export interface IPublicRouteProps extends RouteProps {
  component: React.FC<IPageProps>;
  title?: string;
}

export interface IWindowDimensions {
  width: number;
  height: number;
}
