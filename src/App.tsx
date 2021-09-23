import React from 'react';
import { Router, Switch } from 'react-router-dom';

/**
 * Types
 */
import { UserRoleEnum } from 'enums';

/**
 * Hooks
 */
import { useRootStore } from 'hooks/useRootStore';

/**
 * Components
 */
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

/**
 * Pages
 */
import MainPage from 'pages/main';
import CoursesPage from 'pages/courses';
import MessagesPage from 'pages/messages';
import ProfilePage from 'pages/profile';
import UsersPage from 'pages/users';
import AuthPage from 'pages/auth';
import NotFoundPage from 'pages/404';

const App = () => {
  const {
    uiStore: { history },
  } = useRootStore();

  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute exact path='/' component={MainPage} title='Home' />
        <PrivateRoute path='/courses' component={CoursesPage} title='Courses' />
        <PrivateRoute path='/messages' component={MessagesPage} title='Messages' />
        <PrivateRoute path='/profile' component={ProfilePage} title='Profile' />
        <PrivateRoute
          path='/users'
          component={UsersPage}
          title='Users Management'
          roles={[UserRoleEnum.ADMIN, UserRoleEnum.TEACHER]}
        />
        <PublicRoute path='/auth' component={AuthPage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
