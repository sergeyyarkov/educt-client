import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LessonForm } from '.';
import type { InputFields } from './LessonForm';
import LessonFormSchema from './LessonForm.validator';
import { useCreateLesson } from '@educt/hooks/queries';
import { useHistory, useParams } from 'react-router-dom';

const CreateLessonForm: React.FC = () => {
  const form = useForm<InputFields>({ resolver: yupResolver(LessonFormSchema) });
  const { createLesson, isLoading } = useCreateLesson();
  const { id: course_id } = useParams<{ id: string }>();
  const history = useHistory();

  const onSubmit: SubmitHandler<InputFields> = async data => {
    const lesson = await createLesson({
      title: data.title,
      description: data.description,
      duration: data.duration,
      video: data.video,
      materials: Array.from(data.materials || []),
      course_id,
    });
    console.log(`created: ${lesson}`);
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
