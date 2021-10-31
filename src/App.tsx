import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { routes } from './routes.config';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Components
 */
import PrivateRoute from '@educt/components/PrivateRoute';
import PublicRoute from '@educt/components/PublicRoute';

const App = () => {
  const {
    uiStore: { history },
  } = useRootStore();

  return (
    <Router history={history}>
      <Switch>
        {routes.map((routeProps, i) => {
          const { isPrivate, ...props } = routeProps;
          return isPrivate ? <PrivateRoute key={i} {...props} /> : <PublicRoute key={i} {...props} />;
        })}
      </Switch>
    </Router>
  );
};

export default App;
