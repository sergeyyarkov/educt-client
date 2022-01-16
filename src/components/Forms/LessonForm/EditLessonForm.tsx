import React from 'react';
import * as helpers from '@educt/helpers';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { InputFields } from './LessonForm';
import { LessonForm } from '.';

/**
 * Validator
 */
import { EditLessonFormSchema } from './LessonForm.validator';

/**
 * Hooks
 */
import { useHistory, useParams } from 'react-router-dom';
import { ILesson } from '@educt/interfaces';

type EditLessonFormPropsType = {
  lesson: ILesson;
};

const EditLessonForm: React.FC<EditLessonFormPropsType> = ({ lesson }) => {
  const form = useForm<InputFields>({
    resolver: yupResolver(EditLessonFormSchema),
    defaultValues: {
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      video: undefined,
      materials: undefined,
    },
  });
  const { id: lesson_id } = useParams<{ id: string }>();
  const history = useHistory();

  const onSubmit: SubmitHandler<InputFields> = async data => {
    const updatedFields = helpers.getDirtyFields(form.formState.dirtyFields, data);
    console.log(updatedFields);
  };

  return (
    <LessonForm
      isLoading={false}
      reactHookForm={{ ...form }}
      onSubmit={form.handleSubmit(onSubmit)}
      buttonLabel='Save'
      preloadedVideo={lesson.video || undefined}
      preloadedMaterials={lesson.materials.map(material => {
        return {
          name: material.client_name,
          extname: material.ext,
          size: material.size,
          url: `materials/${material.name}`,
          mimeType: '',
        };
      })}
    />
  );
};

export default EditLessonForm;
