import React from 'react';
import { Box } from '@chakra-ui/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form';

/**
 * Types
 */
import { InputFields } from './CourseForm';
import { CourseStatusEnum } from '@educt/enums';

/**
 * Components
 */
import CourseForm from './CourseForm';

/**
 * Hooks
 */
import { useState } from 'react';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { useToast } from '@chakra-ui/toast';
import { useRootStore } from '@educt/hooks/useRootStore';
import useIsMountedRef from '@educt/hooks/useIsMountedRef';
import { useErrorHandler } from 'react-error-boundary';

/**
 * Schema
 */
import CourseFormSchema from './CourseForm.validator';

type CreateFormCoursePropsType = {};

const CreateFormCourse: React.FC<CreateFormCoursePropsType> = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    courseStore: { courseService },
  } = useRootStore();
  const form = useForm<InputFields>({ resolver: yupResolver(CourseFormSchema) });
  const isMountedRef = useIsMountedRef();
  const history = useHistory();
  const toast = useToast();
  const handleError = useErrorHandler();

  /**
   * Submit handler
   */
  const onSubmit: SubmitHandler<InputFields> = async data => {
    try {
      setIsLoading(true);
      const course = await courseService.create({
        title: data.title,
        description: data.description,
        teacher_id: data.teacher_id,
        category_id: data.category_id,
        image: data.image,
        status: CourseStatusEnum.DRAFT,
      });
      toast({ title: `Course successfully created.`, status: 'success' });
      history.push(`/courses/edit/${course.data.id}`);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 422) {
          toast({ title: `${error.response.data.errors[0].message}`, status: 'error' });
        } else {
          toast({ title: `${error.message}`, status: 'error' });
        }
      } else {
        handleError(error);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  };

  return (
    <Box>
      <CourseForm
        reactHookForm={{ ...form }}
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isLoading}
        buttonLabel='Create'
      />
    </Box>
  );
};

export default CreateFormCourse;
