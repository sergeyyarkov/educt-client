import React from 'react';

import { IPageProps } from '@educt/interfaces';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import CreateLessonForm from '@educt/components/Forms/LessonForm/CreateLessonForm';
import { Redirect, useParams } from 'react-router-dom';
import { useFetchCourse } from '@educt/hooks/queries';
import LoadingPage from '@educt/components/LoadingPage';

/**
 * Create Lesson page
 */
const CreateLessonPage: React.FC<IPageProps> = () => {
  const params = useParams<{ id: string }>();
  const { error, data: course, isLoading } = useFetchCourse(params.id);

  if (error?.response?.status === 404) {
    return <Redirect to='/404' />;
  }

  if (!course || isLoading) return <LoadingPage />;

  return (
    <PageWrapper>
      <PageHeading heading='Lesson Creation' description='Create new lesson ' />
      <PageContent>
        <CreateLessonForm />
      </PageContent>
    </PageWrapper>
  );
};

export default CreateLessonPage;
