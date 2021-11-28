/**
 * Types
 */
import { ICourse } from '@educt/interfaces';
import { useEffect } from 'react';

/**
 * Hooks
 */
import useAsync from './useAsync';
import { useRootStore } from './useRootStore';

type QueryResponseDataType = Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'> | undefined;

const useFetchCourseQuery = (id: string) => {
  const {
    courseStore: { courseService },
  } = useRootStore();

  const fetch = async (id: string) => {
    const result = await courseService.fetchById(id);
    return result.data;
  };

  const { execute: fetchCourseById, ...state } = useAsync<QueryResponseDataType, Parameters<typeof fetch>>(fetch);

  useEffect(() => {
    fetchCourseById(id);
  }, [id]);

  return { ...state };
};

export default useFetchCourseQuery;
