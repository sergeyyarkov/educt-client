import React, { useContext } from 'react';
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
import { useSocketEvent } from './hooks/useSocketEvent';
import { SocketContext } from './contexts';

const App = () => {
  const {
    uiStore: { history },
  } = useRootStore();
  const { socket } = useContext(SocketContext);

  useSocketEvent('connect', () => console.info('[WebSocket]: Connected.'));
  useSocketEvent('disconnect', () => console.info('[WebSocket]: Disconnected.'));
  useSocketEvent('connect_error', err => console.error(err));
  useSocketEvent('user:session', data => {
    if (socket) {
      const { sessionId, userId } = data;
      socket.auth = { sessionId };
      window.localStorage.setItem('sessionId', sessionId);
      // TODO fix types
      socket.userId = userId;
    }
  });

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
