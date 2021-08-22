import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { useRootStore } from './hooks/useRootStore';
import { observer } from 'mobx-react';

/**
 * Pages
 */
import MainPage from './pages/main';
import AuthPage from './pages/auth';
import NotFoundPage from './pages/404';
import { useToast } from '@chakra-ui/react';
import { autorun } from 'mobx';

const App = () => {
  const rootStore = useRootStore();
  const toast = useToast();

  React.useEffect(() => {
    autorun(() => {
      if (rootStore.networkApiError !== undefined) {
        toast({
          title: `Network error while connecting to the server.`,
          description: 'Try your request later.',
          status: 'error',
        });
      }
    });
  });

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={MainPage} title='Main' />
        <Route path='/auth' component={AuthPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default observer(App);
