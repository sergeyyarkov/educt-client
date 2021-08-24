import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Route } from 'react-router-dom';
import { IPublicRouteProps } from '../../interfaces';
import ErrorFallback from '../ErrorFallback';

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
