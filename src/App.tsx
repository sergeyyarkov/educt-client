import React from 'react';
import { Router, Switch } from 'react-router-dom';

/**
 * Components
 */
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import PublicRoute from 'components/PublicRoute/PublicRoute';

/**
 * Pages
 */
import MainPage from 'pages/main';
import CoursesPage from 'pages/courses';
import MessagesPage from 'pages/messages';
import ProfilePage from 'pages/profile';
import ControlPage from 'pages/control';
import AuthPage from 'pages/auth';
import NotFoundPage from 'pages/404';
import { UserRoleEnum } from 'enums';
import { useRootStore } from 'hooks/useRootStore';

const App = () => {
  const { uiStore } = useRootStore();
  return (
    <Router history={uiStore.history}>
      <Switch>
        <PrivateRoute exact path='/' component={MainPage} title='Home' />
        <PrivateRoute path='/courses' component={CoursesPage} title='Courses' />
        <PrivateRoute path='/messages' component={MessagesPage} title='Messages' />
        <PrivateRoute path='/profile' component={ProfilePage} title='Profile' />
        <PrivateRoute path='/control' component={ControlPage} title='Control' roles={[UserRoleEnum.ADMIN]} />
        <PublicRoute path='/auth' component={AuthPage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
