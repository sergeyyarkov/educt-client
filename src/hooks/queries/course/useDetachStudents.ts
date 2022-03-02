import { useToast } from '@chakra-ui/toast';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '@educt/hooks/useAsync';
import { CourseServiceInstance } from '@educt/services';

type DetachedStudentsDataType = Record<string, never>;

const useDetachStudents = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const detachStudents = async (courseId: string, ids: Array<string>) => {
    try {
      const result = await CourseServiceInstance.detachStudentsList(courseId, ids);
      toast({ title: 'Student(s) detached from course.', status: 'info' });
      return result.data;
    } catch (error) {
      handleError(error);

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<DetachedStudentsDataType, Parameters<typeof detachStudents>>(detachStudents);

  return { detachStudents: execute, ...state };
};

export { useDetachStudents };
