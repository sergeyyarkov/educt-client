import { LessonServiceInstance } from '@educt/services';
import type { LessonProgress } from '@educt/types';
import useAsync from '../../useAsync';

const useFetchLessonProgress = () => {
  const fetch = async (id: string) => {
    try {
      const result = await LessonServiceInstance.fetchProgress(id);
      return result.data;
    } catch (error) {
      console.error(error);

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<LessonProgress, Parameters<typeof fetch>>(fetch);

  return { fetchLessonProgress: execute, ...state };
};

export { useFetchLessonProgress };
