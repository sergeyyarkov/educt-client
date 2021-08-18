import type { RouteProps } from 'react-router-dom';
import type { RouteComponentProps } from 'react-router-dom';

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
