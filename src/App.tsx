import React from 'react';
import { Router, Switch } from 'react-router-dom';

/**
 * Types
 */
import { UserRoleEnum } from '@educt/enums';

/**
 * Hooks
 */
import { useRootStore } from '@educt/hooks/useRootStore';

/**
 * Components
 */
import PrivateRoute from '@educt/components/PrivateRoute';
import PublicRoute from '@educt/components/PublicRoute';

/**
 * Pages
 */
import AuthPage from '@educt/pages/auth';
import NotFoundPage from '@educt/pages/404';
const CoursesPage = React.lazy(() => import('@educt/pages/courses'));
const MainPage = React.lazy(() => import('@educt/pages/main'));
const MessagesPage = React.lazy(() => import('@educt/pages/messages'));
const ProfilePage = React.lazy(() => import('@educt/pages/profile'));
const UsersPage = React.lazy(() => import('@educt/pages/users'));

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
