import useAsync from '@educt/hooks/useAsync';
import { ILesson } from '@educt/interfaces';
import { CourseServiceInstance } from '@educt/services';

const useFetchCourseLessons = () => {
  const fetch = async (id: string) => {
    try {
      const { data } = await CourseServiceInstance.fetchLessonsById(id);
      return data;
    } catch (error) {
      console.error(error);
      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<Array<ILesson>, Parameters<typeof fetch>>(fetch);

  return { fetchCourseLessons: execute, ...state };
};

export { useFetchCourseLessons };
