import { useToast } from '@chakra-ui/toast';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '@educt/hooks/useAsync';
import { CourseServiceInstance } from '@educt/services';

type AttachedStudentsDataType = Record<string, never>;

const useAttachStudents = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const attachStudents = async (courseId: string, ids: Array<string>) => {
    try {
      const result = await CourseServiceInstance.attachStudentsList(courseId, ids);
      toast({ title: 'Student(s) attached to the course.', status: 'info' });
      return result.data;
    } catch (error) {
      handleError(error);
      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<AttachedStudentsDataType, Parameters<typeof attachStudents>>(attachStudents);

  return { attachStudents: execute, ...state };
};

export { useAttachStudents };
