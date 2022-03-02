/**
 * Types
 */
import { ICourse } from '@educt/interfaces';
import { CourseServiceInstance } from '@educt/services';

/**
 * Hooks
 */
import { useEffect } from 'react';
import useAsync from '../../useAsync';

const useFetchCourse = (id: string) => {
  const fetch = async (id: string) => {
    const { data } = await CourseServiceInstance.fetchById(id);
    return data;
  };

  const { execute: fetchCourseById, ...state } = useAsync<ICourse, Parameters<typeof fetch>>(fetch);

  useEffect(() => {
    fetchCourseById(id);
  }, [id]);

  return { ...state };
};

export { useFetchCourse };
