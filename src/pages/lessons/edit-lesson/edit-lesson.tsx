import React from 'react';
import { IPageProps } from '@educt/interfaces';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import { Redirect, useParams } from 'react-router-dom';
import LoadingPage from '@educt/components/LoadingPage';
import { useFetchLesson } from '@educt/hooks/queries/lesson/useFetchLesson';
import EditLessonForm from '@educt/components/Forms/LessonForm/EditLessonForm';

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
    <PageWrapper>
      <PageHeading heading='Lesson Editor' description={lesson.description} />
      <PageContent>
        <EditLessonForm lesson={lesson} />
      </PageContent>
    </PageWrapper>
  );
};

export default EditLessonPage;
