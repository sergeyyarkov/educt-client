import { useToast } from '@chakra-ui/toast';
import { useErrorHandler } from 'react-error-boundary';
import { CourseServiceInstance } from '@educt/services';
import { UpdateCourseParamsType } from '@educt/types';
import useAsync from '../../useAsync';
import { ICourse } from '@educt/interfaces';

type UpdatedCourseDataType = Omit<ICourse, 'students_count' | 'likes_count' | 'lessons_count'> | undefined;

const useUpdateCourse = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const updateCourse = async (id: string, data: UpdateCourseParamsType) => {
    try {
      const result = await CourseServiceInstance.update(id, {
        title: data.title,
        description: data.description,
        teacher_id: data.teacher_id,
        category_id: data.category_id,
        image: data.image,
      });
      toast({ title: `Course updated.`, status: 'info' });
      return result.data;
    } catch (error: any) {
      if (error.response) {
        toast({ title: `${error.message}`, status: 'error' });
      } else {
        handleError(error);
      }

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<UpdatedCourseDataType, Parameters<typeof updateCourse>>(updateCourse);

  return { updateCourse: execute, ...state };
};

export { useUpdateCourse };
