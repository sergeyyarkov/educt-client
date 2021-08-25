import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout/Layout';
import { Route, Redirect } from 'react-router-dom';
import { IPrivateRouteProps } from 'interfaces';
import { useRootStore } from 'hooks/useRootStore';
import { observer } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorFallback';
import config from 'config';

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
            <Layout>
              <Helmet>
                <title>
                  {title} • {config.metaData.appName}{' '}
                </title>
              </Helmet>
              <Component {...props} title={title} roles={roles} />
            </Layout>
          </ErrorBoundary>
        ) : (
          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default observer(PrivateRoute);
