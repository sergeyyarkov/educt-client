import React from 'react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import PrevPageButton from '@educt/components/PrevPageButton';
import { CreateCourseForm } from '@educt/components/Forms/CourseForm';
import { Page } from '@educt/components/PageElements';

/**
 * Create course page
 */
const CreateCoursePage: React.FC<IPageProps> = () => {
  return (
    <Page>
      <Page.Heading
        headingPrefix={<PrevPageButton prevPage='/courses' />}
        heading='Course Creation'
        description='Fill in the required fields to create a new course'
      />
      <Page.Content>
        <CreateCourseForm />
      </Page.Content>
    </Page>
  );
};

export default CreateCoursePage;
