/**
 * Auth
 */
import { useLogin } from './auth/useLogin';
import { useLogout } from './auth/useLogout';

/**
 * Lesson
 */
import { useDeleteLesson } from './lesson/useDeleteLesson';

/**
 * Course
 */
import { useCreateCourse } from './course/useCreateCourse';
import { useUpdateCourse } from './course/useUpdateCourse';
import { useFetchCourse } from './course/useFetchCourse';
import { useSetCourseStatus } from './course/useSetCourseStatus';

/**
 * User
 */
import { useCreateUser } from './user/useCreateUser';
import { useDeleteUser } from './user/useDeleteUser';
import { useUpdateUser } from './user/useUpdateUser';
import { useUpdateUserEmail } from './user/useUpdateUserEmail';

export {
  useLogin,
  useLogout,
  useCreateCourse,
  useUpdateCourse,
  useFetchCourse,
  useSetCourseStatus,
  useDeleteLesson,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUpdateUserEmail,
};
