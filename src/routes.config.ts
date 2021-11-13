import { lazy } from 'react';
import { IPrivateRouteProps } from './components/PrivateRoute/PrivateRoute';

/**
 * Pages
 */
import AuthPage from '@educt/pages/auth/auth';
import NotFoundPage from '@educt/pages/404/404';
import CreateCoursePage from '@educt/pages/courses/create/create';
import EditCoursePage from '@educt/pages/courses/edit/edit';
import ChangePasswordPage from '@educt/pages/profile/change-password/change-password';
import ChangeEmailPage from '@educt/pages/profile/change-email/change-email';
import { UserRoleEnum } from './enums';
const CoursesPage = lazy(() => import('@educt/pages/courses/courses'));
const LessonsPage = lazy(() => import('@educt/pages/lessons/lessons'));
const MainPage = lazy(() => import('@educt/pages/main/main'));
const MessagesPage = lazy(() => import('@educt/pages/messages/messages'));
const ProfilePage = lazy(() => import('@educt/pages/profile/profile'));
const UsersPage = lazy(() => import('@educt/pages/users/users'));

interface IRouteOption extends IPrivateRouteProps {
  isPrivate: boolean;
}

export const routes: IRouteOption[] = [
  {
    path: '/',
    title: 'Main',
    component: MainPage,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/courses',
    title: 'Courses',
    component: CoursesPage,
    exact: true,
    isPrivate: true,
  },
  {
    path: '/courses/create',
    title: 'Create new course',
    component: CreateCoursePage,
    isPrivate: true,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER],
  },
  {
    path: '/courses/edit/:id',
    title: 'Course editor',
    component: EditCoursePage,
    isPrivate: true,
    exact: true,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER],
  },
  {
    path: '/lessons',
    title: 'Lessons',
    component: LessonsPage,
    isPrivate: true,
    exact: true,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER],
  },
  {
    path: '/messages',
    title: 'Messages',
    component: MessagesPage,
    isPrivate: true,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: ProfilePage,
    isPrivate: true,
    exact: true,
  },
  {
    path: '/profile/change-password',
    title: 'Change password',
    component: ChangePasswordPage,
    isPrivate: true,
  },
  {
    path: '/profile/change-email',
    title: 'Change email',
    component: ChangeEmailPage,
    isPrivate: true,
  },
  {
    path: '/users',
    title: 'Users management',
    component: UsersPage,
    isPrivate: true,
    roles: [UserRoleEnum.ADMIN, UserRoleEnum.TEACHER],
  },
  {
    path: '/auth',
    title: 'Auth',
    component: AuthPage,
    isPrivate: false,
  },
  {
    title: 'Page not found',
    component: NotFoundPage,
    isPrivate: false,
  },
];
