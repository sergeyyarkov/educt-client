import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import type { InputFields } from './LessonForm';
import { ILesson } from '@educt/interfaces';
import { LessonForm } from '.';

/**
 * Validator
 */
import { EditLessonFormSchema } from './LessonForm.validator';

/**
 * Hooks
 */
import { useHistory, useParams } from 'react-router-dom';
import { useUpdateLesson } from '@educt/hooks/queries';

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
      linked_video_url: lesson.linked_video_url || undefined,
      video: undefined,
      materials: undefined,
    },
  });
  const { updateLesson, isLoading } = useUpdateLesson();
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const onSubmit: SubmitHandler<InputFields> = async data => {
    await updateLesson(id, {
      title: data.title,
      description: data.description,
      video: data.video,
      duration: data.duration,
      linked_video_url: data.linked_video_url,
      materials: data.materials?.length !== 0 ? Array.from(data.materials || []) : null,
    });

    history.push(`/lesson/${id}`);
  };

  return (
    <LessonForm
      isLoading={isLoading}
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
