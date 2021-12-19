import useAsync from '@educt/hooks/useAsync';
import { ILesson } from '@educt/interfaces';
import { LessonServiceInstance } from '@educt/services';
import { useEffect } from 'react';

const useFetchLesson = (id: string) => {
  const fetch = async (id: string) => {
    const { data } = await LessonServiceInstance.fetchLessonById(id);
    return data;
  };

  const { execute: fetchLessonById, ...state } = useAsync<ILesson, Parameters<typeof fetch>>(fetch);

  useEffect(() => {
    fetchLessonById(id);
  }, [id]);

  return { ...state };
};

export { useFetchLesson };
