import { useToast } from '@chakra-ui/react';
import useAsync from '@educt/hooks/useAsync';
import { ILesson } from '@educt/interfaces';
import { LessonServiceInstance } from '@educt/services';
import { UpdateLessonParamsType } from '@educt/types';
import axios from 'axios';
import { useErrorHandler } from 'react-error-boundary';

const useUpdateLesson = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const updateLesson = async (id: string, data: UpdateLessonParamsType) => {
    try {
      const result = await LessonServiceInstance.update(id, data);
      toast({ title: 'Lesson updated', status: 'info' });
      return result.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            default:
              toast({ title: `${error.message}`, status: 'error' });
              break;
          }
        } else {
          handleError(error);
        }
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<ILesson, Parameters<typeof updateLesson>>(updateLesson);

  return { updateLesson: execute, ...state };
};

export { useUpdateLesson };
