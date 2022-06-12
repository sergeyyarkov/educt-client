import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { InputFields } from './LessonForm';
import { LessonForm } from '.';

/**
 * Validator
 */
import { CreateLessonFormSchema } from './LessonForm.validator';

/**
 * Hooks
 */
import { useCreateLesson } from '@educt/hooks/queries';
import { useHistory, useParams } from 'react-router-dom';

const CreateLessonForm: React.FC = () => {
  const form = useForm<InputFields>({ resolver: yupResolver(CreateLessonFormSchema) });
  const { createLesson, isLoading } = useCreateLesson();
  const { id: course_id } = useParams<{ id: string }>();
  const history = useHistory();

  const onSubmit: SubmitHandler<InputFields> = async data => {
    await createLesson({
      title: data.title,
      description: data.description,
      duration: data.duration,
      video: data.video,
      linked_video_url: data.linked_video_url,
      materials: Array.from(data.materials || []),
      course_id,
    });
    history.push(`/courses/edit/${course_id}`);
  };

  return (
    <LessonForm
      isLoading={isLoading}
      reactHookForm={{ ...form }}
      onSubmit={form.handleSubmit(onSubmit)}
      buttonLabel='Create'
    />
  );
};

export default CreateLessonForm;
