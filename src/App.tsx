import React from 'react';
import { observer } from 'mobx-react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ErrorFallback from './components/ErrorFallback';

/**
 * Pages
 */
import MainPage from './pages/main';
import CoursesPage from './pages/courses';
import MessagesPage from './pages/messages';
import ProfilePage from './pages/profile';
import AuthPage from './pages/auth';
import NotFoundPage from './pages/404';

const App = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path='/' component={MainPage} title='Main' />
        <PrivateRoute path='/courses' component={CoursesPage} title='Courses' />
        <PrivateRoute path='/messages' component={MessagesPage} title='Messages' />
        <PrivateRoute path='/profile' component={ProfilePage} title='Profile' />
        <Route path='/auth' component={AuthPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default observer(App);
