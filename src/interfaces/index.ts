import { IconType } from 'react-icons/lib';
import type { RouteProps } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';

export type LinkType = {
  location: string;
  title: string;
  icon: IconType;
};

export interface IAppConfig {
  links: LinkType[];
}

export interface IDataResult {
  data: any;
  message: string;
  status: number;
}

export interface IPageProps extends RouteComponentProps {
  title?: string;
}

export interface IPrivateRouteProps extends RouteProps {
  component: React.FC<any>;
  title?: string;
}
