import React from 'react';
import { Router, Switch } from 'react-router-dom';
import { routes } from './routes.config';

/**
 * Hooks
 */
import { useContext } from 'react';
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Components
 */
import PrivateRoute from '@educt/components/PrivateRoute';
import PublicRoute from '@educt/components/PublicRoute';
import { useSocketEvent } from './hooks/useSocketEvent';
import { SocketContext } from './contexts';
import { HistoryMessageType, UserOnlineListType, UserSeesionType } from './types';
import { useToast } from '@chakra-ui/react';

const App = () => {
  const {
    uiStore: { history },
    onlineStore,
  } = useRootStore();
  const { socket } = useContext(SocketContext);
  const toast = useToast();

  useSocketEvent('connect', () => console.info('[WebSocket]: Connected.'));
  useSocketEvent('disconnect', () => console.info('[WebSocket]: Disconnected.'));
  useSocketEvent('connect_error', err => console.error(err));
  useSocketEvent<UserSeesionType>('user:session', data => {
    if (socket) {
      const { sessionId } = data;
      if (sessionId) {
        socket.auth = { sessionId };
        window.localStorage.setItem('sessionId', sessionId);
      }
    }
  });
  useSocketEvent<HistoryMessageType>('chat:message', data => {
    const chatId = new URLSearchParams(location.search).get('chat_id');
    const user = onlineStore.getUser(data.from);

    if (user && data.from !== chatId) {
      if (data.to === data.from) return;

      /**
       * Notify user about new message
       */
      toast({
        title: `${user.userName}`,
        description: data.content,
        variant: 'left-accent',
        position: 'bottom-right',
        status: 'info',
        duration: 5000,
      });
    }
  });
  useSocketEvent<UserOnlineListType>('user:online', online => onlineStore.loadOnline(online));

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
