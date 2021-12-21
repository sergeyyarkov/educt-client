import { ILesson } from '@educt/interfaces';
import { LessonServiceInstance } from '@educt/services';
import useAsync from '@educt/hooks/useAsync';
import { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';
import { useErrorHandler } from 'react-error-boundary';

const useFetchLesson = (id: string) => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const fetch = async (id: string) => {
    try {
      const { data } = await LessonServiceInstance.fetchLessonById(id);
      return data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 403) {
          toast({ title: 'You are not able to view this lesson.', status: 'warning' });
        }
      } else {
        handleError(error);
      }
      return Promise.reject(error);
    }
  };

  const { execute: fetchLessonById, ...state } = useAsync<ILesson, Parameters<typeof fetch>>(fetch);

  useEffect(() => {
    fetchLessonById(id);
  }, [id]);

  return { ...state };
};

export { useFetchLesson };
