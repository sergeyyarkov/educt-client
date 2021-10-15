import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { IPageProps } from '@educt/interfaces';
import ErrorFallback from '@educt/components/ErrorFallback';

export interface IPublicRouteProps extends RouteProps {
  component: React.FC<IPageProps>;
  title?: string;
}

/**
 * Render public page
 */
const PublicRoute: React.FC<IPublicRouteProps> = ({ component: Component, title, ...options }) => {
  return (
    <Route
      {...options}
      render={props => (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <Component {...props} title={title} />
        </ErrorBoundary>
      )}
    />
  );
};

export default PublicRoute;
