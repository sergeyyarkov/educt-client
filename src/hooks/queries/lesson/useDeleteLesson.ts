import { useToast } from '@chakra-ui/toast';
import { ILesson } from '@educt/interfaces';
import { LessonServiceInstance } from '@educt/services';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '../../useAsync';

type CreatedLessonDataType = ILesson;

const useDeleteLesson = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const deleteLesson = async (id: string) => {
    try {
      const result = await LessonServiceInstance.deleteLesson(id);
      toast({ title: 'Lesson deleted.', status: 'info' });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error: ', error);
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<CreatedLessonDataType, Parameters<typeof deleteLesson>>(deleteLesson);

  return { deleteLesson: execute, ...state };
};

export { useDeleteLesson };
