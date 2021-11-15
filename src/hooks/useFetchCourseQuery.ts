/**
 * Types
 */
import { ICourse } from '@educt/interfaces';

/**
 * Hooks
 */
import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import useIsMountedRef from './useIsMountedRef';
import { useRootStore } from './useRootStore';

type CourseStateType = {
  data: Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'> | null;
  error: any;
  loading: boolean;
  fetched: boolean;
};

const useFetchCourseQuery = (id: string) => {
  const {
    courseStore: { courseService },
  } = useRootStore();
  const [state, setState] = useState<CourseStateType>({ data: null, error: null, loading: false, fetched: false });
  const isMountedRef = useIsMountedRef();
  const handleError = useErrorHandler();

  /**
   * Fetch course handler
   */
  useEffect(() => {
    setState(s => ({ ...s, loading: true }));
    courseService
      .fetchById(id)
      .then(data => {
        if (isMountedRef.current) {
          setState(s => ({ ...s, data: data.data }));
        }
      })
      .catch(error => {
        if (error.response) {
          if (isMountedRef.current) {
            setState(s => ({ ...s, error }));
          }
        } else {
          handleError(error);
        }
      })
      .finally(() => {
        if (isMountedRef.current) {
          setState(s => ({ ...s, loading: false, fetched: true }));
        }
      });
  }, [id]);

  return { ...state };
};

export default useFetchCourseQuery;
