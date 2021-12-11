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
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { useCreateCourse } from '@educt/hooks/queries';

/**
 * Schema
 */
import CourseFormSchema from './CourseForm.validator';

const CreateFormCourse: React.FC = () => {
  const form = useForm<InputFields>({ resolver: yupResolver(CourseFormSchema) });
  const { createCourse, isLoading } = useCreateCourse();
  const history = useHistory();

  /**
   * Submit handler
   */
  const onSubmit: SubmitHandler<InputFields> = async data => {
    try {
      const course = await createCourse({
        title: data.title,
        description: data.description,
        teacher_id: data.teacher_id,
        category_id: data.category_id,
        image: data.image,
        status: CourseStatusEnum.DRAFT,
      });

      history.push(`/courses/edit/${course.id}`);
    } catch (error) {
      console.error(error);
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
