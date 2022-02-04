import React from 'react';
import { IPageProps } from '@educt/interfaces';
import { Page } from '@educt/components/PageElements';
import { Redirect, useParams } from 'react-router-dom';
import LoadingPage from '@educt/components/LoadingPage';
import EditLessonForm from '@educt/components/Forms/LessonForm/EditLessonForm';
import { useFetchLesson } from '@educt/hooks/queries/lesson/useFetchLesson';

/**
 * Create Lesson page
 */
const EditLessonPage: React.FC<IPageProps> = () => {
  const params = useParams<{ id: string }>();
  const { error, data: lesson, isLoading } = useFetchLesson(params.id);

  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  if (!lesson || isLoading) return <LoadingPage />;

  return (
    <Page>
      <Page.Heading heading='Lesson Editor' description={lesson.description} />
      <Page.Content>
        <EditLessonForm lesson={lesson} />
      </Page.Content>
    </Page>
  );
};

export default EditLessonPage;
