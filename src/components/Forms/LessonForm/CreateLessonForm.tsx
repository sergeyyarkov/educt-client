import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LessonForm } from '.';
import { InputFields } from './LessonForm';
import LessonFormSchema from './LessonForm.validator';

const CreateLessonForm: React.FC = () => {
  const form = useForm<InputFields>({ resolver: yupResolver(LessonFormSchema) });

  const onSubmit: SubmitHandler<InputFields> = async data => {
    console.log('creating...');
  };

  return (
    <LessonForm
      isLoading={false}
      reactHookForm={{ ...form }}
      onSubmit={form.handleSubmit(onSubmit)}
      buttonLabel='Create'
    />
  );
};

export default CreateLessonForm;
