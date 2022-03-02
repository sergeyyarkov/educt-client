import { useToast } from '@chakra-ui/toast';
import { ICourse } from '@educt/interfaces';
import { useErrorHandler } from 'react-error-boundary';
import { useRootStore } from '@educt/hooks/useRootStore';
import useAsync from '@educt/hooks/useAsync';

type DeletedCourseDataType = Omit<ICourse, 'teacher' | 'students' | 'lessons'>;

const useDeleteCourse = () => {
  const { courseStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const deleteCourse = async (id: string) => {
    try {
      const result = await courseStore.deleteCourse(id);
      toast({ title: 'Course deleted.', status: 'info' });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        toast({ title: error.message, status: 'error' });
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<DeletedCourseDataType, Parameters<typeof deleteCourse>>(deleteCourse);

  return { deleteCourse: execute, ...state };
};

export { useDeleteCourse };
