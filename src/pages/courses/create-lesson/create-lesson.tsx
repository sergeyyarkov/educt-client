import React from 'react';

import { IPageProps } from '@educt/interfaces';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';
import CreateLessonForm from '@educt/components/Forms/LessonForm/CreateLessonForm';

/**
 * Create Lesson page
 */
const CreateLessonPage: React.FC<IPageProps> = () => {
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
