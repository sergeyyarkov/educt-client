import axios from 'axios';
import { ILesson } from '@educt/interfaces';
import { LessonServiceInstance } from '@educt/services';
import type { CreateLessonParamsType } from '@educt/types';
import useAsync from '@educt/hooks/useAsync';
import { useErrorHandler } from 'react-error-boundary';
import { useToast } from '@chakra-ui/react';

const useCreateLesson = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const createLesson = async (data: CreateLessonParamsType) => {
    try {
      const result = await LessonServiceInstance.create(data);
      toast({ title: `Lesson successfully created.`, status: 'success' });
      return result.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          switch (error.response.status) {
            case 422:
              toast({ title: `${error.response.data.errors[0].message}`, status: 'error' });
              break;
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

  const { execute, ...state } = useAsync<ILesson, Parameters<typeof createLesson>>(createLesson);

  return { createLesson: execute, ...state };
};

export { useCreateLesson };
