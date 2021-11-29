import { useToast } from '@chakra-ui/toast';
import { ILesson } from '@educt/interfaces';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '../useAsync';
import { useRootStore } from '../useRootStore';

const useDeleteLesson = () => {
  const {
    pageStore: { editCourseStore },
  } = useRootStore();
  const toast = useToast();
  const handleError = useErrorHandler();

  const deleteLesson = async (id: string) => {
    try {
      const result = await editCourseStore.deleteLessonById(id);
      toast({ title: 'Lesson deleted', status: 'info' });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        console.error('Error: ', error);
      } else {
        handleError(error);
      }
    }
  };

  const { execute, ...state } = useAsync<ILesson | undefined, Parameters<typeof deleteLesson>>(deleteLesson);

  return { deleteLesson: execute, ...state };
};

export { useDeleteLesson };
