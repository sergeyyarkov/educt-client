import { ICourse } from '@educt/interfaces';
import { CourseServiceInstance } from '@educt/services';
import { FetchCoursesParams } from '@educt/types';
import useAsync from '@educt/hooks/useAsync';
import { useEffect } from 'react';
import { useErrorHandler } from 'react-error-boundary';

const useFetchCourses = (params?: FetchCoursesParams | undefined) => {
  const handleError = useErrorHandler();

  const fetchCourses = async (params?: FetchCoursesParams | undefined) => {
    try {
      const result = await CourseServiceInstance.fetchAll(params);
      return result.data;
    } catch (error) {
      handleError(error);
      return Promise.reject(error);
    }
  };

  const { execute: fetch, ...state } = useAsync<
    Omit<ICourse, 'teacher' | 'students' | 'lessons'>[],
    Parameters<typeof fetchCourses>
  >(fetchCourses);

  useEffect(() => {
    fetch(params);
  }, []);

  return { ...state };
};

export { useFetchCourses };
