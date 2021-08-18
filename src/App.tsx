import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { ChakraProvider, theme } from '@chakra-ui/react';

/**
 * Pages
 */
import MainPage from './pages/main';
import AuthPage from './pages/auth';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={MainPage} title='Main' />
        <Route path='/auth' component={AuthPage} />
      </Switch>
    </Router>
  </ChakraProvider>
);
