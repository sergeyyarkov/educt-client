/**
 * Hooks
 */
import { CourseStatusEnum } from '@educt/enums';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '../../useAsync';
import { useRootStore } from '../../useRootStore';
import { useToast } from '@chakra-ui/toast';

type SetCourseStatusResultDataType = Record<string, never>;
export type SetCourseStatusFnType = (id: string, newStatus: CourseStatusEnum) => Promise<SetCourseStatusResultDataType>;

const useSetCourseStatus = () => {
  const { courseStore } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const setCourseStatus = async (id: string, newStatus: CourseStatusEnum) => {
    try {
      const result = await courseStore.setCourseStatus(id, newStatus);
      switch (newStatus) {
        case CourseStatusEnum.PUBLISHED:
          toast({ title: 'Course has been published.', status: 'success' });
          break;
        case CourseStatusEnum.DRAFT:
          toast({ title: 'Course has been marked as draft.', status: 'info' });
          break;
        default:
          break;
      }
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

  const { execute, ...state } = useAsync<SetCourseStatusResultDataType, Parameters<typeof setCourseStatus>>(
    setCourseStatus
  );

  return { setCourseStatus: execute, ...state };
};

export { useSetCourseStatus };
