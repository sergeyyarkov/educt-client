import React from 'react';
import { Box } from '@chakra-ui/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler } from 'react-hook-form';

/**
 * Types
 */
import { InputFields } from './CourseForm';

/**
 * Components
 */
import CourseForm from './CourseForm';

/**
 * Hooks
 */
import { useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { useRootStore } from '@educt/hooks/useRootStore';
import { useErrorHandler } from 'react-error-boundary';
import { useToast } from '@chakra-ui/toast';

/**
 * Schema
 */
import CourseFormSchema from './CourseForm.validator';

type EditFormCoursePropsType = {
  defaultValues?:
    | {
        title?: string | undefined;
        image?: File | undefined;
        category_id?: string | undefined;
        description?: string | undefined;
        teacher_id?: string | undefined;
      }
    | undefined;
};

const EditFormCourse: React.FC<EditFormCoursePropsType> = ({ defaultValues }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    courseStore: { courseService },
  } = useRootStore();
  const form = useForm<InputFields>({
    resolver: yupResolver(CourseFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      category_id: defaultValues?.category_id || '',
      teacher_id: defaultValues?.teacher_id || '',
      image: undefined,
    },
  });
  const toast = useToast();
  const handleError = useErrorHandler();
  const { id } = useParams<{ id: string }>();

  /**
   *  Submit handler
   */
  const onSubmit: SubmitHandler<InputFields> = async data => {
    try {
      setIsLoading(true);
      const course = await courseService.update(id, {
        title: data.title,
        description: data.description,
        teacher_id: data.teacher_id,
        category_id: data.category_id,
      });
      toast({ title: `Course updated.`, status: 'info' });

      /**
       * Update fields with new values
       */
      form.reset({
        title: course.data.title,
        description: course.data.description,
        teacher_id: course.data.teacher.id,
        category_id: course.data.category.id,
      });
    } catch (error: any) {
      if (error.response) {
        toast({ title: `${error.message}`, status: 'error' });
      } else {
        handleError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <CourseForm
        reactHookForm={{ ...form }}
        onSubmit={form.handleSubmit(onSubmit)}
        isLoading={isLoading}
        buttonLabel='Save'
      />
    </Box>
  );
};

export default EditFormCourse;
