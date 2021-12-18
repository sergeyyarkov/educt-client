import React from 'react';
import { Box } from '@chakra-ui/layout';
import { yupResolver } from '@hookform/resolvers/yup';

/**
 * Types
 */
import { InputFields } from './CourseForm';
import { SubmitHandler } from 'react-hook-form';

/**
 * Components
 */
import CourseForm from './CourseForm';

/**
 * Hooks
 */
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';

/**
 * Schema
 */
import CourseFormSchema from './CourseForm.validator';
import { useUpdateCourse } from '@educt/hooks/queries';

type EditFormCoursePropsType = {
  defaultValues?:
    | {
        title?: string | undefined;
        image?: File | undefined;
        category_id?: string | undefined;
        description?: string | undefined;
        education_description?: string | null | undefined;
        teacher_id?: string | undefined;
      }
    | undefined;
};

const EditFormCourse: React.FC<EditFormCoursePropsType> = ({ defaultValues }) => {
  const form = useForm<InputFields>({
    resolver: yupResolver(CourseFormSchema),
    defaultValues: {
      title: defaultValues?.title || '',
      description: defaultValues?.description || '',
      education_description: defaultValues?.education_description || '',
      category_id: defaultValues?.category_id || '',
      teacher_id: defaultValues?.teacher_id || '',
      image: undefined,
    },
  });
  const { updateCourse, isLoading } = useUpdateCourse();
  const { id } = useParams<{ id: string }>();

  /**
   *  Submit handler
   */
  const onSubmit: SubmitHandler<InputFields> = async data => {
    try {
      const updatedCourse = await updateCourse(id, data);

      /**
       * Update fields with new values
       */
      form.reset({
        title: updatedCourse.title,
        description: updatedCourse.description,
        education_description: updatedCourse.education_description,
        teacher_id: updatedCourse.teacher.id,
        category_id: updatedCourse.category.id,
        image: undefined,
      });
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
        buttonLabel='Save'
      />
    </Box>
  );
};

export default EditFormCourse;
