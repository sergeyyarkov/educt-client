import config from 'config';
import React from 'react';
import Helmet from 'react-helmet';
import { ErrorBoundary } from 'react-error-boundary';
import { Route, Redirect } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { IPageProps } from 'interfaces';
import { UserRoleEnum } from 'enums';
import { useRootStore } from 'hooks/useRootStore';
import Layout from 'components/Layout';
import ErrorFallback from 'components/ErrorFallback';

export interface IPrivateRouteProps extends RouteProps {
  component: React.FC<IPageProps>;
  title?: string;
  /**
   * This field means who can access the page
   */
  roles?: UserRoleEnum[];
}

/**
 * Checks if the user is loggedIn by reactive variable and if not,
 * then a redirect to "/auth" route.
 */
const PrivateRoute: React.FC<IPrivateRouteProps> = ({ component: Component, title, roles, ...options }) => {
  const { authStore } = useRootStore();

  return (
    <Route
      {...options}
      render={props =>
        authStore.isLoggedIn ? (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Layout roles={roles}>
              <Helmet>
                <title>
                  {title} • {config.metaData.appName}{' '}
                </title>
              </Helmet>
              <Component {...props} title={title} />
            </Layout>
          </ErrorBoundary>
        ) : (
          <Redirect to='/auth' />
        )
      }
    />
  );
};

export default PrivateRoute;
