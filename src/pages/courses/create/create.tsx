import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/react';

/**
 * Types
 */
import { IPageProps } from '@educt/interfaces';

/**
 * Components
 */
import PrevPageButton from '@educt/components/PrevPageButton';
import { CreateCourseForm } from '@educt/components/Forms/CourseForm';
import { PageContent, PageHeading, PageWrapper } from '@educt/components/PageElements';

/**
 * Create course page
 */
const CreateCoursePage: React.FC<IPageProps> = () => {
  return (
    <PageWrapper>
      <PageHeading
        headingPrefix={<PrevPageButton prevPage='/courses' />}
        heading='Course Creation'
        description='Fill in the required fields to create a new course'
      />
      <PageContent>
        <CreateCourseForm />
      </PageContent>
    </PageWrapper>
  );
};

export default CreateCoursePage;
