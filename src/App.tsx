import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

/**
 * Components
 */
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';

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
        <PublicRoute path='/auth' component={AuthPage} />
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
