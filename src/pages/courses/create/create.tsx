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

/**
 * Create course page
 */
const CreateCoursePage: React.FC<IPageProps> = () => {
  return (
    <Box>
      <Box>
        <Flex alignItems='center'>
          <PrevPageButton prevPage='/courses' />
          <Heading as='h1'>Course creation</Heading>
        </Flex>
        <Text mt='3'>Fill in the required fields to create a course</Text>
      </Box>
      <Box mt='5'>
        <CreateCourseForm />
      </Box>
    </Box>
  );
};

export default CreateCoursePage;
