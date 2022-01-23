/**
 * Auth
 */
import { useLogin } from './auth/useLogin';
import { useLogout } from './auth/useLogout';

/**
 * Lesson
 */
import { useCreateLesson } from './lesson/useCreateLesson';
import { useDeleteLesson } from './lesson/useDeleteLesson';
import { useUpdateLesson } from './lesson/useUpdateLesson';

/**
 * Course
 */
import { useFetchCourses } from './course/useFetchCourses';
import { useCreateCourse } from './course/useCreateCourse';
import { useUpdateCourse } from './course/useUpdateCourse';
import { useFetchCourse } from './course/useFetchCourse';
import { useSetCourseStatus } from './course/useSetCourseStatus';
import { useAttachStudents } from './course/useAttachStudents';
import { useDetachStudents } from './course/useDetachStudents';

/**
 * User
 */
import { useCreateUser } from './user/useCreateUser';
import { useDeleteUser } from './user/useDeleteUser';
import { useUpdateUser } from './user/useUpdateUser';
import { useUpdateUserEmail } from './user/useUpdateUserEmail';

/**
 * Category
 */
import { useFetchCategories } from './category/useFetchCategories';
import { useCreateCategory } from './category/useCreateCategory';
import { useDeleteCategory } from './category/useDeleteCategory';
import { useUpdateCategory } from './category/useUpdateCategory';

export {
  useLogin,
  useLogout,
  useFetchCourses,
  useCreateCourse,
  useUpdateCourse,
  useFetchCourse,
  useSetCourseStatus,
  useAttachStudents,
  useDetachStudents,
  useCreateLesson,
  useDeleteLesson,
  useUpdateLesson,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
  useUpdateUserEmail,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
  useFetchCategories,
};
