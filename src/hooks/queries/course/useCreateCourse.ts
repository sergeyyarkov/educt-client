import { useToast } from '@chakra-ui/toast';
import { CourseStatusEnum } from '@educt/enums';
import { ICourse } from '@educt/interfaces';
import { CourseServiceInstance } from '@educt/services';
import { CreateCourseParamsType } from '@educt/types';
import { useErrorHandler } from 'react-error-boundary';
import useAsync from '../../useAsync';

type CreatedCourseDataType = Pick<ICourse, 'id' | 'title' | 'description' | 'status' | 'created_at' | 'updated_at'>;

const useCreateCourse = () => {
  const toast = useToast();
  const handleError = useErrorHandler();

  const createCourse = async (data: CreateCourseParamsType) => {
    try {
      const result = await CourseServiceInstance.create({
        title: data.title,
        description: data.description,
        education_description: data.education_description,
        teacher_id: data.teacher_id,
        category_id: data.category_id,
        image: data.image,
        status: CourseStatusEnum.DRAFT,
      });
      toast({ title: `Course successfully created.`, status: 'success' });
      return result.data;
    } catch (error: any) {
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

      return Promise.reject(error);
    }
  };

  const { execute, ...state } = useAsync<CreatedCourseDataType, Parameters<typeof createCourse>>(createCourse);

  return { createCourse: execute, ...state };
};

export { useCreateCourse };
