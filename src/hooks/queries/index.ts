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
import { useUpdateUserEmail } from './user/useUpdateUserEmail';

export {
  useLogin,
  useLogout,
  useCreateCourse,
  useUpdateCourse,
  useFetchCourse,
  useSetCourseStatus,
  useDeleteLesson,
  useUpdateUserEmail,
};
