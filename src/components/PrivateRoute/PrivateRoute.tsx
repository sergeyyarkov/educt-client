import React from 'react';
import Helmet from 'react-helmet';
import Layout from '../Layout/Layout';
import { Route, Redirect } from 'react-router-dom';
import { IPrivateRouteProps } from '../../interfaces';
import { useRootStore } from '../../hooks/useRootStore';
import { observer } from 'mobx-react';

/**
 * Checks if the user is loggedIn by reactive variable and if not,
 * then a redirect to "/auth" route.
 */
const PrivateRoute: React.FC<IPrivateRouteProps> = ({ children, component: Component, title, ...options }) => {
  const { authStore } = useRootStore();
  const isLoggedIn = authStore.isLoggedIn;

  return (
    <Route
      {...options}
      render={props =>
        isLoggedIn ? (
          <Layout>
            <Helmet>
              <title>{title} • App </title>
            </Helmet>
            <Component {...props} title={title} />
          </Layout>
        ) : (
          <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default observer(PrivateRoute);
