import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout/Layout';
import { Route, Redirect } from 'react-router-dom';
import { IPrivateRouteProps } from '../../interfaces';
import { useRootStore } from '../../hooks/useRootStore';
import { observer } from 'mobx-react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../ErrorFallback';

/**
 * Checks if the user is loggedIn by reactive variable and if not,
 * then a redirect to "/auth" route.
 */
const PrivateRoute: React.FC<IPrivateRouteProps> = ({ component: Component, title, ...options }) => {
  const { authStore } = useRootStore();

  return (
    <Route
      {...options}
      render={props =>
        authStore.isLoggedIn ? (
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Layout>
              <Helmet>
                <title>{title} • App </title>
              </Helmet>
              <Component {...props} title={title} />
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
